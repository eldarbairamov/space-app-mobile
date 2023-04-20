import { useEffect } from "react";

import { useAppDispatch } from "../../hook";
import { axiosInstance } from "../axios.service";
import { errorCatherFn, pleaseWait } from "../../helper";
import Toast from "react-native-toast-message";
import { userRequests } from "../../config";
import { IUser } from "../../interface";
import { userActions } from "../../redux/slice";
import { delay } from "../../constant";

export function getUserService() {
   const dispatch = useAppDispatch();

   const getUserFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         await pleaseWait(delay);
         dispatch(userActions.setInfo(data));
         Toast.show({ type: "info", text1: "Лоудінг.." });
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   useEffect(() => {
      getUserFn();
   }, []);

}
