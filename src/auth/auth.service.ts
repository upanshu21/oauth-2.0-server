import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDocument): Promise<any> {
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userId = typeof user._id === 'string' ? user._id : user._id?.toHexString() || user._id?.toString();

    if (!userId) { throw new Error('Invalid user document, missing _id'); }
    const payload = { username: user.username, sub: userId, roles: user.roles };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
  
    await this.userService.addRefreshToken(userId, refreshToken)

    return {
      accessToken,
      refreshToken
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findById(payload.sub)

      if (!user || !user._id || !user.refreshTokens.includes(token)) {
        throw new UnauthorizedException('Invalid refresh token')
      }

      const newPayload = { username: user.username, sub: user._id.toString(), roles: user.roles };
      const newAccesstoken = this.jwtService.sign(newPayload, { expiresIn: '15m'});
      const newRefreshtoken = this.jwtService.sign(newPayload, { expiresIn: '7d'})

      await this.userService.removeRefreshToken(user._id.toString(), token);
      await this.userService.addRefreshToken(user._id.toString(), newRefreshtoken)

      return {
        access_token: newAccesstoken,
        refresh_token: newRefreshtoken
      }

    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }
  
}

