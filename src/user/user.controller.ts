import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
  }
}
