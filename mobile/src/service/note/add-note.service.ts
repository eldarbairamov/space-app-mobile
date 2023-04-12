import { notesRequests } from "../../config";
import { useAppDispatch, useAppSelector } from "../../hook";
import { INote } from "../../interface";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { noteActions, userActions } from "../../redux/slice";
import Toast from "react-native-toast-message";

export function addNoteService() {
   const dispatch = useAppDispatch();
   const { notesCount } = useAppSelector(state => state.userReducer)

   const addNoteFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." })
         const { data } = await axiosInstance.get<INote>(notesRequests.addNote);
         dispatch(noteActions.addNote(data));
         dispatch(userActions.setNotesCount(notesCount + 1))
         Toast.hide()

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) })
      }
   };

   return { addNoteFn };
}
