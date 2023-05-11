import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchTaskInput, PutTaskInput, TaskInput } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  findAll(query: string, userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
  }

  async findById(id: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });

    if (task === null) {
      throw new NotFoundException(`Task with id: ${id} doesn't exist`);
    }

    return task;
  }

  async create(input: TaskInput) {
    try {
      return await this.prisma.task.create({
        data: input,
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `User with id: ${input.userId} doesn't exist. Add a valid userId.`,
        );
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.task.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw error;
    }
  }

  async update(id: number, input: PutTaskInput) {
    try {
      return await this.prisma.task.update({
        where: {
          id: id,
        },
        data: input,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw error;
    }
  }

  async patch(id: number, input: PatchTaskInput) {
    try {
      return await this.prisma.task.update({
        where: {
          id: id,
        },
        data: input,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(error.meta.cause);
      }
      throw error;
    }
  }
}
