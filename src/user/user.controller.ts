import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators/user.decorator';
import { AuthenticatedGuard } from 'src/guard/authenticated.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getUser(@CurrentUser() currentUser: Pick<User, 'id' | 'username'>) {
    return this.prisma.user.findFirst({
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
