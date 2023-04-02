import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { ITEM_BG, NOTES_COLOR, SECOND_FONT_COLOR } from "../../constant";
import { IMoment } from "../../interface";
import { configuration } from "../../config";

export function MomentItem({ moment }: { moment: IMoment }) {

   return (
      <>
         { moment &&
            <TouchableOpacity style={ [ styles.noteItem ] }
                              activeOpacity={ 0.7 }
            >
               <Image style={ styles.photo } source={ { uri: `${ configuration.API_URL }/${ moment.photo }` } }/>
               <View style={ [ styles.background, gStyle.absolute ] }></View>

               <View style={ styles.left }>
                  <View style={ styles.title_wrapper }>
                     <Text style={ [ gStyle.regular_font, styles.title ] }>
                        { moment.title }
                     </Text>
                  </View>
               </View>

            </TouchableOpacity>
         }
      </>
   )
}

const styles = StyleSheet.create({
   noteItem: {
      height: 200,
      padding: 20,
      flexDirection: "row",
      borderRadius: 15,
      backgroundColor: ITEM_BG,
      marginVertical: 5,
      overflow: "hidden"
   },
   photo: {
      position: "absolute",
      top: -120,
      left: -50,
      width: 500,
      height: 500,
   },
   background: {
      backgroundColor: 'black',
      opacity: 0.2
   },
   left: {
      width: "95%",
      justifyContent: "space-between",
      gap: 10
   },
   right: {
      width: "5%",
   },
   title_wrapper: {
      backgroundColor: '#24292e',
      alignSelf: "baseline",
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 4
   },
   title: {
      fontWeight: '500',
      color: "whitesmoke",
   },
   noteBody: {
      color: SECOND_FONT_COLOR,
      fontSize: 14,
      width: "90%"
   },
   date: {
      color: NOTES_COLOR,
      fontSize: 12,
      fontWeight: "bold"
   }
})
