import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { BG_DARK, MAIN_FONT_DARK, NOTES_COLOR } from "../../constant";
import { LoginForm } from "../../component";
import { LoginProps, UnauthorizedStackEnum } from "../../navigation/type";
import { loginService } from "../../service";
import { useAppSelector } from "../../hook";

export function LoginScreen({ navigation }: LoginProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { loginFn } = loginService();

   return (
      <View style={ [ gStyle.unauthorized_screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>

         <LoginForm loginFn={ loginFn }/>

         <View style={ styles.footer }>
            <TouchableOpacity activeOpacity={ 0.5 }
                              onPress={ () => navigation.navigate(UnauthorizedStackEnum.ForgotPassword) }>
               <Text style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK } ] }>
                  Забув пароль?
               </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={ 0.5 }
                              onPress={ () => navigation.navigate(UnauthorizedStackEnum.Registration) }>
               <Text style={ [ gStyle.regular_font, { color: NOTES_COLOR } ] }>
                  Створити аккаунт
               </Text>
            </TouchableOpacity>
         </View>

      </View>
   );
}

const styles = StyleSheet.create({
   footer: {
      flexDirection: "row",
      gap: 20,
      marginTop: 40
   }
});
