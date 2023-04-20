import { notesRequests } from "../../config";
import { INote, TypedSetState } from "../../interface";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import Toast from "react-native-toast-message";

export function updateNoteService(setPrevState: TypedSetState<INote>) {

   const updateNoteFn = async (activeNote: INote) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const noteToSave = {
            title: activeNote.title,
            body: activeNote.body,
         };
         await axiosInstance.put<void>(notesRequests.saveNote + activeNote.id, noteToSave);
         setPrevState(activeNote);
         Toast.show({ type: "success", text1: "Збережено" });

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { updateNoteFn };
}
