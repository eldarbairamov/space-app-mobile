import { useEffect, useState } from "react";
import { notesRequests } from "../../config";
import { useAppDispatch, useAppSelector, useDebounce } from "../../hook";
import { errorCatherFn, pleaseWait } from "../../helper";
import { axiosInstance } from "../axios.service";
import { noteActions } from "../../redux/slice";
import { INote } from "../../interface";
import Toast from "react-native-toast-message";

export function getNotesService() {
   const { searchKey } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const debounced = useDebounce(searchKey);

   const [ isLoading, setIsLoading ] = useState(false);

   const getNotesFn = async () => {
      try {
         setIsLoading(true);
         Toast.show({ type: "info", text1: "Лоудінг.." });
         const { data } = await axiosInstance.get<INote[]>(notesRequests.getNotes, { params: { searchKey: searchKey ? debounced : null, } });
         dispatch(noteActions.setNotes(data));
         Toast.hide();
         await pleaseWait(2000);
         setIsLoading(false);

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   useEffect(() => {
      getNotesFn();
   }, [ debounced ]);

   return { isLoading };

}
