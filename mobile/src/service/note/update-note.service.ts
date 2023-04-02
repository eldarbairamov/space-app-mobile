import { notesRequests } from "../../config";
import { INote, TypedSetState } from "../../interface";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import Toast from "react-native-toast-message";

export function updateNoteService(setPrevState: TypedSetState<INote>) {

   const updateNoteFn = async (activeNote: INote) => {
      try {
         const noteToSave = {
            title: activeNote.title,
            body: activeNote.body,
         };
         await axiosInstance.put<void>(notesRequests.saveNote + activeNote.id, noteToSave);

         setPrevState(activeNote)

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   return { updateNoteFn };
}
