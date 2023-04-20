import { useEffect } from "react";

import { IMoments } from "../../interface";
import { axiosInstance } from "../axios.service";
import { useDispatch } from "react-redux";
import { momentsRequests } from "../../config";
import { momentActions } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn, pleaseWait } from "../../helper";
import { useAppSelector } from "../../hook";
import { delay } from "../../constant";

export function getMomentsService() {
   const { total, searchKey } = useAppSelector(state => state.momentReducer);

   const dispatch = useDispatch();

   const getMomentsFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const { data } = await axiosInstance.get<IMoments>(momentsRequests.getAllMoments, {
            params: {
               searchKey: searchKey ? searchKey : null,
               limit: total,
            },
         });
         await pleaseWait(delay);
         dispatch(momentActions.setMoments(data));
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }

   };

   useEffect(() => {
      getMomentsFn();
   }, [ searchKey, total ]);

}
