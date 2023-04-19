import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMomentDto {
   @IsString()
   @IsOptional()
   readonly title: string;

   @IsString()
   @IsOptional()
   readonly location: string;

   @IsNumber()
   @IsOptional()
   readonly date: number;

   @IsString()
   @IsOptional()
   readonly tag: string;

}
