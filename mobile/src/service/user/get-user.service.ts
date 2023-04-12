import { useAppDispatch } from "../../hook";
import { useEffect } from "react";
import { axiosInstance } from "../axios.service";
import { errorCatherFn } from "../../helper";
import Toast from "react-native-toast-message";
import { userRequests } from "../../config";
import { IUser } from "../../interface";
import { userActions } from "../../redux/slice";

export function getUserService() {
   const dispatch = useAppDispatch();

   const getUserFn = async () => {
      try {
         const { data } = await axiosInstance.get<IUser>(userRequests.getUser);
         dispatch(userActions.setInfo(data));

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) })
      }
   };

   useEffect(() => {
      getUserFn();
   }, []);

   return { getUserFn };
}
