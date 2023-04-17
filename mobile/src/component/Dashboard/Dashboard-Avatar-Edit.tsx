import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { MAIN_FONT_DARK, SECOND_FONT_DARK } from "../../constant";
import { deletePhotoService, uploadPhotoService } from "../../service";
import { useAppSelector } from "../../hook";

export function DashboardAvatarEdit() {
   const { isDark } = useAppSelector(state => state.appReducer);
   const { avatar } = useAppSelector(state => state.userReducer);

   const { pickImageHandler } = uploadPhotoService();

   const { deletePhotoFn } = deletePhotoService();

   return (
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
   );
}

const styles = StyleSheet.create({
   edit_wrapper: {
      marginTop: 30,
      flexDirection: "row",
      gap: 5
   },
});
