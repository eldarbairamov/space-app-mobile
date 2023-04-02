import { View } from "react-native";
import { gStyle } from "../../asset";
import { ResetPasswordForm } from "../../component";

export function ResetPasswordScreen() {
   return (
      <View style={ [ gStyle.screen, gStyle.center, { gap: 100 } ] }>
         <ResetPasswordForm/>
      </View>
   )
}
