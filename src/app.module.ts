import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [PrismaModule, TaskModule, UserModule],
  providers: [],
})
export class AppModule {}
