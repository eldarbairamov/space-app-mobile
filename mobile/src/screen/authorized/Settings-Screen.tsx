import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { BackIcon, UpdateProfileForm } from "../../component";
import { DashboardStackEnum, SettingsProps } from "../../navigation/type";
import { updateProfileService } from "../../service";

export function SettingsScreen({ navigation }: SettingsProps) {
   const { updateProfileFn } = updateProfileService()

   return (
      <View style={ gStyle.screen }>
         <View style={ [ gStyle.container ] }>

            <View style={ [ styles.header ] }>
               <BackIcon to={ DashboardStackEnum.Main }/>
            </View>

            <View style={ [ gStyle.center, { flex: 1 } ] }>
               <UpdateProfileForm updateProfileFn={ updateProfileFn }/>

               <View style={ [ styles.auth_settings, ] }>
                  <TouchableOpacity style={ [ gStyle.center ] }
                                    activeOpacity={ 0.5 }
                                    onPress={ () => navigation.navigate(DashboardStackEnum.PasswordSetting) }>
                     <Text style={ [ gStyle.second_font ] }> Змінити пароль </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={ [ gStyle.center ] }
                                    activeOpacity={ 0.5 }
                                    onPress={ () => navigation.navigate(DashboardStackEnum.EmailSetting) }>
                     <Text style={ [ gStyle.second_font ] }> Змінити електронну пошту </Text>
                  </TouchableOpacity>
               </View>
            </View>

         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   header: {
      position: "absolute",
      zIndex: 1,
      height: "5%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      flexDirection: "row"
   },
   edit: {
      color: "#7d7d7d",
      fontSize: 13,
   },
   logout: {
      position: "absolute",
      right: 20,
      top: 19,
      zIndex: 1
   },
   auth_settings: {
      marginTop: 50,
      gap: 20,
   },
})
