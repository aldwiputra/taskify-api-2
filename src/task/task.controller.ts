import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PatchTaskInput, PutTaskInput, TaskInput } from './dto/task.dto';
import { TaskService } from './task.service';
import { AuthenticatedGuard } from 'src/guard/authenticated.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { AlteredUser } from 'src/types/global.type';

@UseGuards(AuthenticatedGuard)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(@Query('q') query: string, @CurrentUser() user: AlteredUser) {
    return this.taskService.findAll(query, user.id);
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AlteredUser,
  ) {
    return this.taskService.findById(id, user.id);
  }

  @Post()
  create(@Body() input: TaskInput, @CurrentUser() user: AlteredUser) {
    return this.taskService.create(input, user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AlteredUser,
  ) {
    return this.taskService.remove(id, user.id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: PutTaskInput,
    @CurrentUser() user: AlteredUser,
  ) {
    return this.taskService.update(id, input, user.id);
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: PatchTaskInput,
    @CurrentUser() user: AlteredUser,
  ) {
    return this.taskService.patch(id, input, user.id);
  }
}
