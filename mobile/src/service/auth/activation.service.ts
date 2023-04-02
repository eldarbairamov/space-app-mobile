import { axiosInstance } from "../axios.service";
import { authRequests } from "../../config";
import Toast from "react-native-toast-message";
import { errorCatherFn, pleaseWait } from "../../helper";

export function activationService(next: () => any) {

   const activationFn = async (body: string) => {
      try {
         Toast.show({ type: 'info', text1: 'Лоудінг..' })
         await axiosInstance.post(authRequests.accountActivation, { activationCode: body });
         Toast.show({ type: 'success', text1: "Ваш аккаунт активовано" })
         await pleaseWait(2000)
         Toast.hide()
         next();

      } catch (e) {
         Toast.show({ type: 'error', text1: errorCatherFn(e) })
      }
   };

   return { activationFn };
}
