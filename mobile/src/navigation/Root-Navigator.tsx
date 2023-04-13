import { useAuth } from "../hook";
import { BottomTab } from "./authorized";
import { WelcomeStack } from "./unauthorized";

export function RootNavigator() {
   const { isLogin } = useAuth();

   return isLogin ? <BottomTab/> : <WelcomeStack/>;
}

