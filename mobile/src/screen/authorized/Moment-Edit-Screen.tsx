import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { useAppSelector } from "../../hook";
import { configuration } from "../../config";
import { NO_PHOTO_IMAGE, SAVE_DISABLE } from "../../constant";
import { uploadMomentPhotoService } from "../../service";
import { BackIcon } from "../../component";
import { NotesStackEnum } from "../../navigation/type";

export function MomentEditScreen() {
   const { activeMoment } = useAppSelector(state => state.momentReducer)

   const { pickImageHandler } = uploadMomentPhotoService(activeMoment.id)

   return (
      <>
         { activeMoment &&
            <View style={ [ gStyle.screen ] }>

               <View style={ [ styles.header ] }>
                  <BackIcon to={ NotesStackEnum.NoteList }/>

                  <TouchableOpacity activeOpacity={ 0.5 }>
                     <Image source={ SAVE_DISABLE }
                            style={ [ { width: 27, height: 27 } ] }/>
                  </TouchableOpacity>

               </View>

               <View style={ [ styles.body, gStyle.center ] }>
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

                  <Pressable onPress={ pickImageHandler }>
                     { activeMoment.photo
                        ?
                        <Image style={ styles.photo }
                               source={ { uri: `${ configuration.API_URL }/${ activeMoment.photo }` } }/>
                        :
                        <View style={ [ gStyle.absolute_center, gStyle.center ] }>
                           <Image source={ NO_PHOTO_IMAGE }
                                  style={ [ { width: 50, height: 50 } ] }/>
                        </View>
                     }
                  </Pressable>
               </View>


            </View>
         }
      </>
   )
}

const styles = StyleSheet.create({
   header: {
      zIndex: 2,
      width: "100%",
      height: "5%",
      position: "absolute",
      gap: 15,
      flexDirection: 'row',
      alignItems: "center",
      paddingHorizontal: 20,
   },
   body: {
      height: "100%",
      width: '100%',
   },
   wrapper: {
      backgroundColor: '#24292e',
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 4
   },
   photo: {
      width: 400,
      height: 400,
   },
   absolute: {
      // display: "none",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
   },
   photo_background: {
      width: "100%",
      height: "100%",
   },
   background_fx: {
      backgroundColor: 'black',
      opacity: 0.3,
      zIndex: 1
   },
})
