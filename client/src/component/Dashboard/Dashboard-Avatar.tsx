import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { configuration } from "../../config";
import { NO_AVATAR_IMAGE } from "../../constant";
import { useAppSelector, useDimension } from "../../hook";

export function DashboardAvatar() {
   const { avatar } = useAppSelector( state => state.userReducer );

   const { isTablet, isPhoneSmall } = useDimension();

   const tabletCondition: StyleProp<ImageStyle> = isTablet && { width: 500, height: 500 };
   const smallPhoneCondition: StyleProp<ImageStyle> = isPhoneSmall && { width: 200, height: 200 };

   return (
       <Image source={ avatar ? { uri: `${ configuration.API_URL }/${ avatar }` } : NO_AVATAR_IMAGE }
              style={ avatar ? [ styles.photo, tabletCondition, smallPhoneCondition, styles.border ] : [ styles.no_photo, tabletCondition, styles.border ] }/>
   );
}

const styles = StyleSheet.create( {
   photo: {
      width: 260,
      height: 260,
      overflow: "hidden"
   },
   no_photo: {
      height: 260,
      width: 260
   },
   border: {
      borderRadius: 500,
      borderColor: "#9d9d9d",
      borderWidth: 5,
   }
} );
