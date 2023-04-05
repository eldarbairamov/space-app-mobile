import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { RegistrationForm } from "../../component";
import { RegistrationProps, UnauthorizedStackEnum } from "../../navigation/type";
import { NOTES_COLOR } from "../../constant";
import { registrationService } from "../../service";

export function RegistrationSreen({ navigation }: RegistrationProps) {
   const { registrationFn } = registrationService(() => navigation.navigate(UnauthorizedStackEnum.Activation))

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>
         <RegistrationForm registrationFn={ registrationFn }/>

         <View style={ styles.footer }>
            <Text style={ gStyle.regular_font }> Є аккаунт? </Text>

            <TouchableOpacity onPress={ () => navigation.navigate(UnauthorizedStackEnum.Login) }>
               <Text style={ [ gStyle.regular_font, { color: NOTES_COLOR } ] }> Увійти </Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   footer: {
      flexDirection: "row",
      marginTop: 40
   }
})
