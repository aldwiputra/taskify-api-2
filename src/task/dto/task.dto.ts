import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class TaskInput {
  @IsString()
  @MinLength(5)
  @MaxLength(65)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;
}

export class PutTaskInput {
  @IsString()
  @MinLength(5)
  @MaxLength(65)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;
}
export class PatchTaskInput {
  @IsNotEmpty()
  @IsBoolean()
  done: boolean;
}
