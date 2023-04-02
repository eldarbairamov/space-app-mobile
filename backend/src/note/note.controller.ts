import { Body, Controller, Delete, Get, HttpCode, Param, Put, Query, UseGuards } from "@nestjs/common";
import { NoteService } from "./note.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { UpdateNoteDto } from "./dto";
import { INoteResponse } from "./interface/note-response.interface";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiDefaultResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { DefaultError, DeleteItemBody, NoteResponse, ObjectIdError, ObjNotExistError, SuccessResponse, UnauthorizedError } from "@src/common/swagger";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";

@ApiBearerAuth()
@ApiTags("Notes")
@Controller("notes")
export class NoteController {

   constructor(private noteService: NoteService) {
   }

   // Get all notes
   @ApiOperation({ summary: "get all notes" })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiOkResponse({ description: "Success", type: [ NoteResponse ] })
   @UseGuards(AccessGuard)
   @Get()
   async getNotes(
      @Query('searchKey') searchKey: string,
      @User("userId") userId: string): Promise<INoteResponse[]> {

      return this.noteService.getNotes(userId, searchKey);
   }

   // Add note
   @ApiOperation({ summary: "add note" })
   @ApiCreatedResponse({ description: "New note was created", type: NoteResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @UseGuards(AccessGuard)
   @Get("add")
   async addNote(
      @User("userId") userId: string): Promise<INoteResponse> {

      return this.noteService.addNote(userId);
   }

   // Update note
   @ApiOperation({ summary: "update note by id" })
   @ApiParam({ name: "noteId", description: "note id", example: "63dfe16eda233c96fc6e2604" })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Put(":noteId")
   async updateNote(
      @Param("noteId") noteId: string,
      @Body() dto: UpdateNoteDto): Promise<INoteResponse> {

      return this.noteService.updateNote(noteId, dto);
   }

   // Delete note
   @ApiOperation({ summary: "delete note by id" })
   @ApiParam({ name: "noteId", description: "note id", example: "63dfe16eda233c96fc6e2604" })
   @ApiOkResponse({ description: "Success", type: SuccessResponse })
   @ApiUnauthorizedResponse({ description: "Unauthorized", type: UnauthorizedError })
   @ApiDefaultResponse({ description: "Unexpected errors", type: DefaultError })
   @ApiBadRequestResponse({ description: "Invalid ObjectID", type: ObjectIdError })
   @ApiNotFoundResponse({ description: "Not found", type: ObjNotExistError })
   @HttpCode(200)
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Delete(":noteId")
   async deleteNote(
      @User("userId") userId: string,
      @Param("noteId") noteId: string): Promise<{ message: string }> {

      await this.noteService.deleteNote(noteId, userId)
      return { message: 'Success' };
   }

}
