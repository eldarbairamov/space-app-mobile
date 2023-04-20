import { errorCatherFn } from "../../helper";
import { axiosInstance } from "../axios.service";
import { IRegistration } from "../../interface";
import { authRequests } from "../../config";
import Toast from "react-native-toast-message";

export function registrationService(next: () => any) {

   const registrationFn = async (body: IRegistration) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг..." });
         await axiosInstance.post(authRequests.registration, body);
         Toast.hide();

         next();

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { registrationFn };
}
