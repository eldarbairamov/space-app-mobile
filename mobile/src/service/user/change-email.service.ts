import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config";

export function changeEmailService(next: () => any) {

   const changeEmailFn = async (email: string) => {
      try {
         Toast.show({ type: 'info', text1: 'Лоудінг..' })
         await axiosInstance.post(userRequests.changeEmail, { email });
         Toast.hide()

         next();

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   return { changeEmailFn };

}
