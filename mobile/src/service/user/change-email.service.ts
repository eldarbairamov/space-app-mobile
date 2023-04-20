import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config";
import { useState } from "react";

export function changeEmailService() {
   const [ isEmailSent, setIsEmailSent ] = useState<boolean>(false);

   const changeEmailFn = async (email: string) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         await axiosInstance.post(userRequests.changeEmail, { email });
         setIsEmailSent(true);
         Toast.hide();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { changeEmailFn, isEmailSent, setIsEmailSent };

}
