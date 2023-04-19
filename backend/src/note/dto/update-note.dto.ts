import { IsOptional, IsString } from "class-validator";

export class UpdateNoteDto {

   @IsString()
   @IsOptional()
   readonly title: string;

   @IsString()
   @IsOptional()
   readonly body: string;

}
