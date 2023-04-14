import { Image, StyleSheet, View } from "react-native";
import { gStyle } from "../../asset";
import { configuration } from "../../config";
import { useAppSelector } from "../../hook";

export function MomentEditPhotoBg() {
   const { activeMoment } = useAppSelector(state => state.momentReducer);

   return (
      <View style={ [ styles.absolute ] }>
         <View
            style={ [ activeMoment.photo ? styles.background_fx : null, gStyle.absolute ] }>
         </View>

         <View>
            <Image style={ styles.photo_background }
                   blurRadius={ 10 }
                   source={ { uri: `${ configuration.API_URL }/${ activeMoment.photo }` } }/>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
   photo_background: {
      width: "100%",
      height: "100%",
   },
   background_fx: {
      backgroundColor: "black",
      opacity: 0.3,
      zIndex: 1
   },
});
