import Toast from "react-native-toast-message";
import { errorCatherFn, pleaseWait } from "../../helper";
import { axiosInstance } from "../axios.service";
import { authRequests } from "../../config";

export function forgotPasswordService(next: () => any) {

   const forgotPasswordFn = async (email: string) => {
      try {
         Toast.show({ type: 'info', text1: 'Лоудінг..' })
         await axiosInstance.post<{ message: string }>(authRequests.forgotPassword, { email });
         Toast.show({ type: 'success', text1: 'Готово!' })
         await pleaseWait(1000)
         Toast.hide()

         next();

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   return { forgotPasswordFn };
}
