import * as argon from 'argon2';
import { ForbiddenException } from '@nestjs/common';
import { UserInput } from 'src/user/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(input: UserInput) {
    const hash = await argon.hash(input.password);

    try {
      return await this.prisma.user.create({
        data: {
          username: input.username,
          hash_password: hash,
        },
        select: {
          id: true,
          username: true,
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

  async validateCredentials(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return null;
    }

    return (await argon.verify(user.hash_password, password)) ? user : null;
  }
}
