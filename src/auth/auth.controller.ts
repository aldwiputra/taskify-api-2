import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserInput } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guard/local.guard';
import { Session as SessionType } from 'express-session';
import { Response } from 'express';
import { UnauthenticatedGuard } from 'src/guard/unauthenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() input: UserInput) {
    return this.authService.createUser(input);
  }

  @UseGuards(UnauthenticatedGuard, LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: `Succesfully login with username: ${req.user.username}`,
    };
  }

  @Post('logout')
  logout(@Session() session: SessionType, @Res() res: Response) {
    session.destroy((err: any) => {
      if (err) {
        throw new Error(err);
      }
    });

    res.clearCookie('connect.sid');
    res.send({
      success: true,
      message: 'Succesfully logout',
    });
  }
}
