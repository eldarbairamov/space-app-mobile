import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { RegistrationForm } from "../../component";
import { RegistrationProps, UnauthorizedStackEnum } from "../../navigation/type";
import { BG_DARK, MAIN_FONT_DARK, NOTES_COLOR } from "../../constant";
import { registrationService } from "../../service";
import { useAppSelector } from "../../hook";

export function RegistrationScreen({ navigation }: RegistrationProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { registrationFn } = registrationService(() => navigation.navigate(UnauthorizedStackEnum.Activation));

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         <RegistrationForm registrationFn={ registrationFn }/>

         <View style={ styles.footer }>
            <Text style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK } ] }> Є аккаунт? </Text>

            <TouchableOpacity onPress={ () => navigation.navigate(UnauthorizedStackEnum.Login) }>
               <Text style={ [ gStyle.regular_font, { color: NOTES_COLOR } ] }> Увійти </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   footer: {
      flexDirection: "row",
      marginTop: 40
   }
});
