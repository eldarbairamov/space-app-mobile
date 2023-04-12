import { useEffect } from "react";
import { IMoments } from "../../interface";
import { axiosInstance } from "../axios.service";
import { useDispatch } from "react-redux";
import { momentsRequests } from "../../config";
import { momentActions } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";

export function getMomentsService(searchKey: string) {
   const dispatch = useDispatch();

   const getMomentsFn = async () => {
      try {
         const { data } = await axiosInstance.get<IMoments>(momentsRequests.getAllMoments, {
            params: {
               searchKey: searchKey ? searchKey : null,
            },
         });
         dispatch(momentActions.setMoments(data));

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) })
      }
   };

   useEffect(() => {
      getMomentsFn();
   }, [ searchKey ]);

}
