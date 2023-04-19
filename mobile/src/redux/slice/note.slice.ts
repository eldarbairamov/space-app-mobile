import { INote, INotes } from "../../interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INoteInitialState {
   notes: INote[];
   activeNote: INote;
   lastNote: INote;
   searchKey: string;
   limit: number;
   total: number;
   count: number;
}

const initialState: INoteInitialState = {
   notes: [] as INote[],
   activeNote: {} as INote,
   lastNote: {} as INote,
   searchKey: "",
   limit: 30,
   total: 30,
   count: 0,
};

const noteSlice = createSlice({
   name: "note",
   initialState,
   reducers: {

      setActiveNote: (state, { payload }: PayloadAction<INote>) => {
         state.activeNote = payload;
      },

      updateNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes = state.notes.map(note => {
            if (note.id === payload.id) return payload;
            return note;
         });
         state.activeNote = state.notes.find(({ id }) => id === payload.id)!;
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
      },

      setSearchKey: (state, { payload }: PayloadAction<string>) => {
         state.searchKey = payload;
      },

      setNotes: (state, { payload }: PayloadAction<INotes>) => {
         state.notes = payload.data;
         state.count = payload.count;
      },

      addNote: (state, { payload }: PayloadAction<INote>) => {
         state.notes.push(payload);
         state.notes = state.notes.sort((a, b) => b.lastModified - a.lastModified);
      },

      deleteNote: (state, { payload }: PayloadAction<string>) => {
         const targetId = payload;
         state.notes = state.notes.filter(item => item.id !== targetId);
      },

      next: (state) => {
         if (state.total <= state.count) {
            state.total = state.total + state.limit;
         }
      },

   },

});

export const noteReducer = noteSlice.reducer;
export const noteActions = noteSlice.actions;
