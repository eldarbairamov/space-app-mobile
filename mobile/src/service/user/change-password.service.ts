import Toast from "react-native-toast-message";
import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { userRequests } from "../../config";

export function changePasswordService(next: () => any) {

   const updatePasswordFn = async (newPassword: string, currentPassword: string) => {
      try {
         Toast.show({ type: 'info', text1: 'Лоудінг..' })
         await axiosInstance.patch(userRequests.changePassword, { newPassword, currentPassword });
         Toast.hide()

         next();

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   return { updatePasswordFn };

}
