import { IsString, NotEquals, ValidateIf } from "class-validator";

export class UpdateNoteDto {
   @IsString()
   @NotEquals(null)
   @ValidateIf((object, value) => value === null)
   readonly title: string;

   @IsString()
   @NotEquals(null)
   @ValidateIf((object, value) => value === null)
   readonly body: string;

}
