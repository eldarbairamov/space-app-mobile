import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SettingsIcon, LogoutIcon } from "../../component";
import { gStyle } from "../../asset";
import { BG_DARK, MAIN_FONT_DARK, NO_AVATAR_IMAGE, PLANS_COLOR, SECOND_FONT_DARK } from "../../constant";
import { deletePhotoService, getUserService, uploadPhotoService } from "../../service";
import { useAppSelector, useTheme } from "../../hook";
import { configuration } from "../../config";

export function DashboardScreen() {
   const { username, avatar } = useAppSelector(state => state.userReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   const { pickImageHandler } = uploadPhotoService();
   const { deletePhotoFn } = deletePhotoService();

   getUserService();

   const { isEnabled, toggleSwitch } = useTheme();

   return (
      <View style={ [ gStyle.screen, isDark && { backgroundColor: BG_DARK } ] }>
         <View style={ [ gStyle.container ] }>

            <View style={ [ styles.header ] }>
               <View style={ [ { flexDirection: "row", gap: 20 }, gStyle.center ] }>
                  <SettingsIcon/>
                  <Switch style={ styles.switch }
                          onValueChange={ toggleSwitch }
                          value={ isEnabled }
                          trackColor={ { true: PLANS_COLOR } }/>
               </View>
               <LogoutIcon/>
            </View>

            <View style={ [ gStyle.center, styles.avatar_wrapper ] }>
               <Image source={ avatar ? { uri: `${ configuration.API_URL }/${ avatar }` } : NO_AVATAR_IMAGE }
                      style={ avatar ? styles.photo : styles.no_photo }/>

               <View style={ [ styles.edit_wrapper ] }>
                  <TouchableOpacity activeOpacity={ 0.5 }
                                    onPress={ pickImageHandler }>
                     <Text style={ [ gStyle.second_font, isDark && { color: SECOND_FONT_DARK } ] }>
                        Змінити фото
                     </Text>
                  </TouchableOpacity>

                  <Text style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK } ] }> | </Text>

                  <TouchableOpacity activeOpacity={ 0.5 }
                                    onPress={ () => deletePhotoFn(avatar) }>
                     <Text style={ [ gStyle.second_font, isDark && { color: SECOND_FONT_DARK } ] }>
                        Видалити
                     </Text>
                  </TouchableOpacity>
               </View>

            </View>

            <View style={ [ gStyle.center, styles.greetings_wrapper ] }>
               <View style={ [ gStyle.center, styles.greetings, { width: "100%" } ] }>
                  <Text style={ [ gStyle.handwrite, styles.hello, isDark && { color: MAIN_FONT_DARK } ] }>
                     Привіт,
                  </Text>
                  <Text style={ [ gStyle.regular_font, styles.username ] }>
                     { username ? username : "завантажую" }
                  </Text>
               </View>
               <Text
                  style={ [ gStyle.handwrite, styles.how_are_you, gStyle.center, isDark && { color: MAIN_FONT_DARK } ] }>
                  Ну, як ти?
               </Text>
            </View>

         </View>
      </View>
   );
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
   avatar_wrapper: {
      marginTop: 30,
      width: "100%",
      height: "60%",
   },
   switch: {
      transform: [
         { scaleX: .8 },
         { scaleY: .8 }
      ],
   },
   no_photo: {
      borderRadius: 500,
      borderColor: "#9d9d9d",
      borderWidth: 5,
      height: 260,
      width: 260
   },
   edit_wrapper: {
      marginTop: 30,
      flexDirection: "row",
      gap: 5
   },
   greetings_wrapper: {
      width: "100%",
      marginTop: 20,
      gap: 10
   },
   greetings: {
      flexDirection: "row",
      gap: 10,
   },
   hello: {
      fontWeight: "bold",
      fontSize: 43,
   },
   username: {
      fontWeight: "bold",
      fontSize: 31,
      color: "#9d9d9d",
   },
   how_are_you: {
      fontSize: 25,
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
   },
   photo: {
      width: 260,
      height: 260,
      borderRadius: 500,
      borderColor: "#9d9d9d",
      borderWidth: 5,
      overflow: "hidden"
   }
});
