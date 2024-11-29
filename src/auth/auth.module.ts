import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt';
import { LocalStrategy } from './local.strategy';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // In a real app, use an environment variable
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

