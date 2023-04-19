import { IsNumber, IsOptional, IsString } from "class-validator";

export class DeleteItemDto {

   @IsNumber()
   @IsOptional()
   readonly limit: number;

   @IsString()
   @IsOptional()
   readonly searchKey: string;

}
