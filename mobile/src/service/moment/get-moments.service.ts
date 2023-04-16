import { useEffect, useState } from "react";
import { IMoments } from "../../interface";
import { axiosInstance } from "../axios.service";
import { useDispatch } from "react-redux";
import { momentsRequests } from "../../config";
import { momentActions } from "../../redux/slice";
import Toast from "react-native-toast-message";
import { errorCatherFn, pleaseWait } from "../../helper";
import { delay } from "../../constant";

export function getMomentsService(searchKey: string) {
   const dispatch = useDispatch();

   const [ isLoading, setIsLoading ] = useState(false);

   const getMomentsFn = async () => {
      try {
         setIsLoading(true);
         Toast.show({ type: "info", text1: "Лоудінг.." });
         const { data } = await axiosInstance.get<IMoments>(momentsRequests.getAllMoments, {
            params: {
               searchKey: searchKey ? searchKey : null,
            },
         });
         dispatch(momentActions.setMoments(data));
         await pleaseWait(delay);
         Toast.hide();

      } catch (e) {
         setIsLoading(false);
         Toast.show({ type: "error", text1: errorCatherFn(e) });

      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      getMomentsFn();
   }, [ searchKey ]);

   return { isLoading };

}
