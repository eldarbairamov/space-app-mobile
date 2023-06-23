import { IsNotEmpty, IsNumber, IsString, NotEquals } from "class-validator";

export class UpdateMomentDto {
   @IsNotEmpty()
   @IsString()
   @NotEquals( null )
   readonly title: string;

   @IsNotEmpty()
   @IsString()
   @NotEquals( null )
   readonly location: string;

   @IsNumber()
   @IsNotEmpty()
   @NotEquals( null )
   readonly date: number;

   @IsNotEmpty()
   @IsString()
   @NotEquals( null )
   readonly tag: string;

}
