import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
   @IsString()
   @MinLength(6)
   @MaxLength(20)
   @IsNotEmpty()
   readonly password: string;

   @IsString()
   @IsNotEmpty()
   readonly code: string;
}
