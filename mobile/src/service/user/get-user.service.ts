import { useAppDispatch } from "../../hook";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axios.service";
import { errorCatherFn, pleaseWait } from "../../helper";
import Toast from "react-native-toast-message";
import { userRequests } from "../../config";
import { IUser } from "../../interface";
import { userActions } from "../../redux/slice";
import { delay } from "../../constant";

export function getUserService() {
   const dispatch = useAppDispatch();

   const [ isLoading, setIsLoading ] = useState(false);

   const getUserFn = async () => {
      try {
         setIsLoading(true);
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         dispatch(userActions.setInfo(data));
         await pleaseWait(delay);

      } catch (e) {
         setIsLoading(false);
         Toast.show({ type: "error", text1: errorCatherFn(e) });

      } finally {
         setIsLoading(false);
      }

   };

   useEffect(() => {
      getUserFn();
   }, []);

   return { getUserFn, isLoading };
}
