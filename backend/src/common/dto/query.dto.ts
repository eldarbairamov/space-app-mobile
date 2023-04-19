import { IsOptional } from "class-validator";

export class QueryDto {

   @IsOptional()
   readonly searchKey: string;

   @IsOptional()
   readonly limit: number;

}
