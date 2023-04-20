import { notesRequests } from "../../config";
import { useAppDispatch, useAppSelector } from "../../hook";
import { INote, INotes } from "../../interface";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { noteActions, userActions } from "../../redux/slice";
import Toast from "react-native-toast-message";

export function deleteNoteService() {
   const dispatch = useAppDispatch();

   const { notesCount } = useAppSelector(state => state.userReducer);

   const deleteNoteFn = async (noteId: INote["id"], total = 30, searchKey = "") => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const { data } = await axiosInstance.post<INotes>(notesRequests.deleteNote + noteId, {
            limit: total,
            searchKey: searchKey ? searchKey : null,
         });
         dispatch(noteActions.deleteNote(noteId));
         dispatch(userActions.setNotesCount(notesCount - 1));
         dispatch(noteActions.setNotes(data));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { deleteNoteFn };
}
