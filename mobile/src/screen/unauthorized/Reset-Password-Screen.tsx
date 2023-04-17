import { View } from "react-native";
import { gStyle } from "../../asset";
import { ResetPasswordForm } from "../../component";
import { useAppSelector } from "../../hook";
import { BG_DARK } from "../../constant";

export function ResetPasswordScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <View style={ [ gStyle.screen, gStyle.center, { gap: 100 }, isDark && { backgroundColor: BG_DARK } ] }>
         <ResetPasswordForm/>
      </View>
   );
}
