import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";
import {User} from "../../users/users.model";

export class LoginDto {
  token: string;
  user: User
}