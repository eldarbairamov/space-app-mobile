import { IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
   @IsString()
   @IsOptional()
   readonly title: string;

   @IsString()
   @IsOptional()
   readonly planId: string;
}
