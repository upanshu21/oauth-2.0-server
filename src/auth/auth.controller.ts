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
      return this.authService.login(req);
    } catch (error) {
      throw new InternalServerErrorException('login failed')
    }
  }

  @Post('register')
  async register(@Body() user: any) {
    return this.userService.create(user);
  }
}

