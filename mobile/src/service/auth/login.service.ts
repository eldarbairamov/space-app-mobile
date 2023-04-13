import { AxiosApiError, axiosInstance } from "../axios.service";
import { authRequests } from "../../config";
import { ILoginForm, IOAuth } from "../../interface";
import { storageService } from "../storage.service";
import Toast from "react-native-toast-message";
import { errorCatherFn, pleaseWait } from "../../helper";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp, UnauthorizedStackEnum } from "../../navigation/type";
import { useAppDispatch } from "../../hook";
import { authActions } from "../../redux/slice";

export function loginService() {
   const { navigate } = useNavigation<LoginScreenNavigationProp>();
   const dispatch = useAppDispatch();

   const loginFn = async (body: ILoginForm) => {
      try {
         Toast.show({ type: "info", text1: "Лоудінг.." });
         const { data } = await axiosInstance.post<IOAuth>(authRequests.login, body);
         await storageService.setTokens(data.accessToken, data.refreshToken);
         Toast.show({ type: "success", text1: `Привіт, ${ data.username }` });
         await pleaseWait(2000);
         Toast.hide();
         dispatch(authActions.setIsLogin(true));

      } catch (e) {
         Toast.show({ type: "error", text1: errorCatherFn(e) });

         const responseMessage = (e as AxiosApiError).response?.data.message;
         if (responseMessage === "Account is not activated") {
            await pleaseWait(2000);
            Toast.hide();
            navigate(UnauthorizedStackEnum.Activation);
         }
      }
   };

   return { loginFn };
}
