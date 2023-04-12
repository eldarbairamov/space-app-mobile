import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
   @ApiProperty({ example: "123456", required: true })
   @IsString()
   @MinLength(6)
   @MaxLength(20)
   @IsNotEmpty()
   readonly password: string;

   @ApiProperty({
      example: "2680E1",
      required: true,
   })
   @IsString()
   @IsNotEmpty()
   readonly code: string;
}
