import { IsString, NotEquals, ValidateIf } from "class-validator";

export class CreatePlanDto {
   @IsString()
   @NotEquals( null )
   @ValidateIf( ( object, value ) => value === null )
   readonly title: string;
}
