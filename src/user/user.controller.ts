import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { UserInput } from './dto/user.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async createUser(@Body() input: UserInput) {
    const hash = await argon.hash(input.password);

    try {
      return await this.prisma.user.create({
        data: {
          username: input.username,
          hash_password: hash,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential already taken');
        }
      }
      throw error;
    }
  }

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
