import { axiosInstance } from "../axios.service";
import Toast from "react-native-toast-message";
import { authRequests } from "../../config";
import { errorCatherFn, pleaseWait } from "../../helper";

export function resetPasswordService(next: () => any) {

   const resetPasswordFn = async (password: string, code: string) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." })
         await axiosInstance.patch(authRequests.resetPassword, { code, password });
         Toast.show({ type: "success", text1: "Вітаємо! У вас новий пароль." })
         await pleaseWait(2000);
         Toast.hide()

         next();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) })
      }
   };

   return { resetPasswordFn };
}
