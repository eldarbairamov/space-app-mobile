import { useEffect } from "react";

import { notesRequests } from "../../config";
import { useAppDispatch, useAppSelector, useDebounce } from "../../hook";
import { errorCatherFn, pleaseWait } from "../../helper";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { INotes } from "../../interface";
import Toast from "react-native-toast-message";
import { delay } from "../../constant";

export function getNotesService() {
   const { searchKey, total } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const getNotesFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." });
         const { data } = await axiosInstance.get<INotes>(notesRequests.getNotes, {
            params: {
               searchKey: searchKey ? debounced : null,
               limit: total,
            },
         });
         await pleaseWait(delay);
         dispatch(noteActions.setNotes(data));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ debounced, total ]);


}
