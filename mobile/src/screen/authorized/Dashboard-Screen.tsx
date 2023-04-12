import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SettingsIcon, LogoutIcon } from "../../component";
import { gStyle } from "../../asset";
import { NO_AVATAR_IMAGE } from "../../constant";
import { deletePhotoService, getUserService, uploadPhotoService } from "../../service";
import { useAppSelector } from "../../hook";
import { configuration } from "../../config";

export function DashboardScreen() {
   const { username, avatar } = useAppSelector(state => state.userReducer)

   const { pickImageHandler } = uploadPhotoService()
   const { deletePhotoFn } = deletePhotoService()

   getUserService()

   return (
      <View style={ [ gStyle.screen ] }>
         <View style={ [ gStyle.container ] }>

            <View style={ [ styles.header ] }>
               <SettingsIcon/>
               <LogoutIcon/>
            </View>

            <View style={ [ gStyle.center, styles.avatar_wrapper ] }>
               <Image source={ avatar ? { uri: `${ configuration.API_URL }/${ avatar }` } : NO_AVATAR_IMAGE }
                      style={ avatar ? styles.photo : styles.no_photo }/>

               <View style={ [ styles.edit_wrapper ] }>
                  <TouchableOpacity activeOpacity={ 0.5 } onPress={ pickImageHandler }>
                     <Text style={ [ gStyle.second_font ] }>
                        Змінити фото
                     </Text>
                  </TouchableOpacity>

                  <Text style={ [ gStyle.regular_font ] }> | </Text>

                  <TouchableOpacity activeOpacity={ 0.5 } onPress={ () => deletePhotoFn(avatar) }>
                     <Text style={ [ gStyle.second_font ] }>
                        Видалити
                     </Text>
                  </TouchableOpacity>
               </View>

            </View>

            <View style={ [ styles.greetings_wrapper, gStyle.center ] }>
               <View style={ [ gStyle.center, styles.greetings, { width: "100%" } ] }>
                  <Text style={ [ gStyle.handwrite, styles.hello ] }> Привіт, </Text>
                  <Text
                     style={ [ gStyle.regular_font, styles.username ] }> { username ? username : "завантажую" } </Text>
                  <Text style={ [ gStyle.handwrite, styles.how_are_you ] }> Ну, як ти? </Text>
               </View>
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
   },
   greetings: {
      flexDirection: "row",
      gap: -7,
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
      position: "absolute",
      right: 80,
      top: 60,
      fontWeight: "bold",
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
