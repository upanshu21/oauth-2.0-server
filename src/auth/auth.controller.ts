import { Controller, Request, Post, UseGuards, Body, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('Invalid Credentials')
    } try {
      return this.authService.login(req.user);
    } catch (error) {
      throw new InternalServerErrorException('login failed')
    }
  }

  @Post('refresh')
  async refreshTokens(@Body('refresh_token') token: string) {
    if (!token) {
      throw new UnauthorizedException('Invalid or no token')
    }
    try {
      return await this.authService.refreshToken(token);
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }

  @Post('register')
  async register(@Body() user: any) {
    return this.userService.create(user);
  }
}

