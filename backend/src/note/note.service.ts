import { Injectable } from "@nestjs/common";
import { NotePresenter } from "./presenter/note.presenter";
import { NoteRepository } from "./repository/note.repository";
import { UpdateNoteDto } from "./dto";
import { INoteResponse } from "./interface/note-response.interface";
import { NoteDocument } from "./model/note.model";
import { UserRepository } from "@src/user/repository/user.repository";
import { UserDocument } from "@src/user/model/user.model";

@Injectable()
export class NoteService {
   constructor(
      private userRepository: UserRepository,
      private noteRepository: NoteRepository,
      private notePresenter: NotePresenter,
   ) {
   }

   async addNote(userId: UserDocument["id"]): Promise<INoteResponse> {
      // Create note
      const note = await this.noteRepository.create({ ownerId: userId });

      // Update user
      await this.userRepository.findByIdAndUpdate(userId, { $push: { notesIds: note.id } });

      // Return presented data to client
      return this.notePresenter.single(note);
   }

   async updateNote(noteId: UserDocument["id"], dto: UpdateNoteDto): Promise<INoteResponse> {
      // Update note
      const note = await this.noteRepository.findByIdAndUpdate(noteId, dto);

      // Return presented data to client
      return this.notePresenter.single(note);
   }

   async getNotes(userId: UserDocument["id"], searchKey: string): Promise<INoteResponse[]> {
      // Find and count notes
      const notes = await this.noteRepository.find({ ownerId: userId }, searchKey)

      // Return presented data to client
      return this.notePresenter.array(notes)
   }

   async deleteNote(noteId: NoteDocument["id"], userId: UserDocument["id"]): Promise<void> {
      // Delete note
      await this.noteRepository.findByIdAndDelete(noteId);

      // Update user
      await this.userRepository.findByIdAndUpdate(userId, { $pull: { notesIds: noteId } })

   }

}
