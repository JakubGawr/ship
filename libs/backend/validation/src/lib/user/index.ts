import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDTO {
  @MinLength(3)
  @IsString()
  name: string;

  @MinLength(3)
  @IsString()
  password: string;
}


export class UserRegisterDTO extends UserLoginDTO{
  @MinLength(3)
  @IsEmail()
  email: string;
}
