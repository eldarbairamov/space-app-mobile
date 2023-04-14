import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { DashboardStackEnum, SettingsScreenNavigationProp } from "../../navigation/type";
import { SECOND_FONT_DARK } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../hook";

export function AuthSettings() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { navigate } = useNavigation<SettingsScreenNavigationProp>();

   return (
      <View style={ [ styles.auth_settings, ] }>
         <TouchableOpacity style={ [ gStyle.center ] }
                           activeOpacity={ 0.5 }
                           onPress={ () => navigate(DashboardStackEnum.PasswordSetting) }>
            <Text style={ [ gStyle.second_font, isDark && { color: SECOND_FONT_DARK } ] }>
               Змінити пароль
            </Text>
         </TouchableOpacity>

         <TouchableOpacity style={ [ gStyle.center ] }
                           activeOpacity={ 0.5 }
                           onPress={ () => navigate(DashboardStackEnum.EmailSetting) }>
            <Text style={ [ gStyle.second_font, isDark && { color: SECOND_FONT_DARK } ] }>
               Змінити електронну пошту
            </Text>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   auth_settings: {
      marginTop: 50,
      gap: 20,
   },
});
