import { View } from "react-native";
import { gStyle } from "../../asset";
import { ForgotPasswordForm } from "../../component";
import { forgotPasswordService } from "../../service";
import { ForgotPasswordProps, UnauthorizedStackEnum, } from "../../navigation/type";

export function ForgotPasswordSreen({ navigation }: ForgotPasswordProps) {
   const { forgotPasswordFn } = forgotPasswordService(() => navigation.navigate(UnauthorizedStackEnum.ResetPassword))

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>
         <ForgotPasswordForm forgotPasswordFn={ forgotPasswordFn }/>
      </View>
   )
}
