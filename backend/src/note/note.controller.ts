import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { NoteService } from "./note.service";
import { ObjectCheckingGuard } from "./guard/object-checking.guard";
import { UpdateNoteDto } from "./dto";
import { INoteResponse, INotesResponse } from "./interface/note-response.interface";
import { AccessGuard } from "@src/auth/guard";
import { User } from "@src/common/decorator";
import { DeleteItemDto, QueryDto } from "@src/common/dto";

@Controller("notes")
export class NoteController {

   constructor(private noteService: NoteService) {
   }

   // Get all notes
   @UseGuards(AccessGuard)
   @Get()
   async getNotes(
      @Query() queryDto: QueryDto,
      @User("userId") userId: string): Promise<INotesResponse> {

      return this.noteService.getNotes(userId, queryDto);
   }

   // Add note
   @UseGuards(AccessGuard)
   @Get("add")
   async addNote(
      @User("userId") userId: string): Promise<INoteResponse> {

      return this.noteService.addNote(userId);
   }

   // Update note
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Put(":noteId")
   async updateNote(
      @Param("noteId") noteId: string,
      @Body() dto: UpdateNoteDto): Promise<INoteResponse> {

      return this.noteService.updateNote(noteId, dto);
   }

   // Send prev request params and delete note
   @HttpCode(200)
   @UseGuards(AccessGuard)
   @UseGuards(ObjectCheckingGuard)
   @Post(":noteId")
   async deleteNote(
      @User("userId") userId: string,
      @Body() dto: DeleteItemDto,
      @Param("noteId") noteId: string): Promise<INotesResponse> {

      return this.noteService.deleteNote(noteId, userId, dto.limit, dto.searchKey);
   }

}
