import { View } from "react-native";
import { gStyle } from "../../asset";
import { ForgotPasswordForm } from "../../component";
import { forgotPasswordService } from "../../service";
import { ForgotPasswordProps, UnauthorizedStackEnum, } from "../../navigation/type";
import { useAppSelector } from "../../hook";
import { BG_DARK } from "../../constant";

export function ForgotPasswordScreen({ navigation }: ForgotPasswordProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { forgotPasswordFn } = forgotPasswordService(() => navigation.navigate(UnauthorizedStackEnum.ResetPassword));

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         <ForgotPasswordForm forgotPasswordFn={ forgotPasswordFn }/>
      </View>
   );
}
