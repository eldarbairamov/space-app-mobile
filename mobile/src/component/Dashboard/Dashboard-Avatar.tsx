import { Image, StyleSheet } from "react-native";
import { configuration } from "../../config";
import { NO_AVATAR_IMAGE } from "../../constant";
import { useAppSelector } from "../../hook";

export function DashboardAvatar() {
   const { avatar } = useAppSelector(state => state.userReducer);

   return (
      <Image source={ avatar ? { uri: `${ configuration.API_URL }/${ avatar }` } : NO_AVATAR_IMAGE }
             style={ avatar ? styles.photo : styles.no_photo }/>
   );
}

const styles = StyleSheet.create({
   photo: {
      width: 260,
      height: 260,
      borderRadius: 500,
      borderColor: "#9d9d9d",
      borderWidth: 5,
      overflow: "hidden"
   },
   no_photo: {
      borderRadius: 500,
      borderColor: "#9d9d9d",
      borderWidth: 5,
      height: 260,
      width: 260
   },
});
