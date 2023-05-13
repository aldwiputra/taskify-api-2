import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlteredUser } from 'src/types/global.type';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  async getUser(@CurrentUser() currentUser: AlteredUser) {
    return await this.prisma.user.findFirst({
      where: {
        id: currentUser.id,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }

  @Get()
  greetStranger() {
    return {
      message: 'Hello, Stranger!',
    };
  }
}
