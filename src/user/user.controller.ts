import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guard/authenticated.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUser(@Req() req) {
    console.log(req.user);
    return this.prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }
}
