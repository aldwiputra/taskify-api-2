import { IsNotEmpty, IsString, MaxLength, NotContains } from 'class-validator';

export class UserInput {
  @IsString()
  @MaxLength(65)
  @IsNotEmpty()
  @NotContains(' ', { message: 'Username should not contain empty spaces' })
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
