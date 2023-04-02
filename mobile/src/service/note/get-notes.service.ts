import { useEffect } from "react";
import { notesRequests } from "../../config";
import { useAppDispatch, useAppSelector, useDebounce } from "../../hook";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { INote } from "../../interface";
import Toast from "react-native-toast-message";

export function getNotesService() {
   const { searchKey } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const getNotesFn = async () => {
      try {
         Toast.show({ type: 'info', text1: 'Лоудінг..' })
         const { data } = await axiosInstance.get<INote[]>(notesRequests.getNotes, { params: { searchKey: searchKey ? debounced : null, } });
         dispatch(noteActions.setNotes(data));
         Toast.hide()

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ debounced ]);

}
