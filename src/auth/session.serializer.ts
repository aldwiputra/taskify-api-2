import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private prisma: PrismaService) {
    super();
  }

  serializeUser(user: User, done: (error: Error, user: any) => void): any {
    done(null, user.id);
  }

  deserializeUser(userId: number, done: (error: Error, payload: any) => void) {
    const user = this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    done(null, user);
  }
}
