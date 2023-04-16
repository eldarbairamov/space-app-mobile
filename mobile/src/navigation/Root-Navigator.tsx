import { useAuth, useTheme } from "../hook";
import { BottomTab } from "./authorized";
import { WelcomeStack } from "./unauthorized";
import Toast from "react-native-toast-message";
import { toastTheme } from "../config";

export function RootNavigator() {
   const { isLogin } = useAuth();
   const { isDark } = useTheme();

   return (
      <>
         { isLogin ? <BottomTab/> : <WelcomeStack/> }
         <Toast config={ toastTheme(isDark) }/>
      </>
   );
}

