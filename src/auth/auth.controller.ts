import {
  Body,
  Controller,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserInput } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guard/local.guard';
import { Session as SessionType } from 'express-session';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() input: UserInput) {
    return this.authService.createUser(input);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<{ success: boolean; message: string }> {
    console.log(req.session.id);

    return {
      success: true,
      message: `Succesfully login with username: ${req.user.username}`,
    };
  }

  @Post('logout')
  logout(@Session() session: SessionType) {
    session.destroy((err: any) => {
      if (err) {
        throw new Error(err);
      }
    });

    return {
      success: true,
      message: 'Succesfully logout',
    };
  }
}
