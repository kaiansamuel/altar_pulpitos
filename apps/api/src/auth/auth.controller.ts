import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';

class LoginDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(8) password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @Post('login')
  async login(@Body() body: LoginDto) {
    const token = await this.auth.login(body.email, body.password);
    if (!token) throw new UnauthorizedException('E-mail ou senha inválidos.');
    return { accessToken: token };
  }
}
