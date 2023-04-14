import { Image, StyleSheet, View } from "react-native";
import { configuration } from "../../config";
import { gStyle } from "../../asset";
import { NO_PHOTO, NO_PHOTO_DARK } from "../../constant";
import { IMoment } from "../../interface";
import { useAppSelector } from "../../hook";

export function MomentItemPhoto({ moment }: { moment: IMoment }) {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <>
         { moment.photo
            ?
            <Image style={ styles.photo }
                   source={ { uri: `${ configuration.API_URL }/${ moment.photo }` } }/>
            :
            <View style={ [ gStyle.absolute_center, gStyle.center ] }>
               <Image source={ isDark ? NO_PHOTO_DARK : NO_PHOTO }
                      style={ [ { width: 50, height: 50 } ] }/>
            </View>
         }
      </>
   );
}

const styles = StyleSheet.create({
   photo: {
      position: "absolute",
      top: -120,
      left: -50,
      width: 500,
      height: 500,
   },
});

