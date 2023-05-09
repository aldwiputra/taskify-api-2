import {
  Body,
  Controller,
  Delete,
  Get,
  // NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PatchTaskInput, PutTaskInput, TaskInput } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(@Query('q') query: string) {
    return this.taskService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findById(id);
  }

  @Post()
  create(@Body() input: TaskInput) {
    return this.taskService.create(input);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() input: PutTaskInput) {
    return this.taskService.update(id, input);
  }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() input: PatchTaskInput) {
    return this.taskService.patch(id, input);
  }
}
