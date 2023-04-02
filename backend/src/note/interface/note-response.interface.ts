import { NoteDocument } from "@src/note/model/note.model";

export interface INoteResponse {
   readonly id: NoteDocument["id"];
   readonly title: string;
   readonly body: string;
   readonly lastModified: number;
}
