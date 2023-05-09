import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserInput } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() input: UserInput) {
    return this.authService.createUser(input);
  }

  @Post('login')
  async login(@Req() req): Promise<void> {
    console.log(`User: ${req.user.username} is logging in`);
  }
}
