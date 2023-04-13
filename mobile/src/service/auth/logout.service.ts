import { storageService } from "../storage.service";
import { errorCatherFn } from "../../helper";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "../../hook";
import { authActions } from "../../redux/slice";
import { axiosInstance } from "../axios.service";
import { authRequests } from "../../config";

export function logoutService() {
   const dispatch = useAppDispatch();

   const logoutFn = async () => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." });
         await axiosInstance.get(authRequests.logout);
         await storageService.deleteTokens();
         Toast.hide();
         dispatch(authActions.setIsLogin(false));

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });
      }
   };

   return { logoutFn };

}
