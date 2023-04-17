import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { ITEM_BG, ITEM_BG_DARK, MOMENTS_COLOR, NOTES_COLOR, SECOND_FONT_COLOR } from "../../constant";
import { IMoment } from "../../interface";
import dateHelper from "moment";
import { useNavigation } from "@react-navigation/native";
import { MomentListScreenNavigationProp, MomentsStackEnum } from "../../navigation/type";
import { useAppDispatch, useAppSelector, useDimension } from "../../hook";
import { momentActions } from "../../redux/slice";
import { MomentItemPhoto } from "./Moment-Item-Photo";

export function MomentItem({ moment }: { moment: IMoment }) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { navigate } = useNavigation<MomentListScreenNavigationProp>();

   const dispatch = useAppDispatch();

   const { isTablet } = useDimension();

   return (
      <>
         { moment &&
            <TouchableOpacity
               style={ [ styles.noteItem, isDark && { backgroundColor: ITEM_BG_DARK }, isTablet && { width: "49.5%", height: 300 } ] }
               onPress={ () => {
                  dispatch(momentActions.setActiveMoment(moment));
                  navigate(MomentsStackEnum.MomentEdit);
               } }
               activeOpacity={ 0.7 }>

               <MomentItemPhoto moment={ moment }/>

               <View
                  style={ [ moment.photo ? styles.background : null, gStyle.absolute ] }>
               </View>

               <View style={ [ styles.title_position, styles.wrapper ] }>
                  <Text style={ [ gStyle.regular_font, styles.title ] }>
                     { moment.title }
                  </Text>
               </View>

               <View style={ [ styles.tag_position, styles.wrapper, { backgroundColor: MOMENTS_COLOR } ] }>
                  <Text style={ [ gStyle.regular_font, styles.title ] }>
                     { moment.tag }
                  </Text>
               </View>

               <View style={ [ styles.date_and_location_position ] }>
                  <View style={ [ styles.wrapper ] }>
                     <Text style={ [ gStyle.regular_font, styles.title ] }>
                        { moment.location }
                     </Text>
                  </View>

                  <View style={ [ styles.wrapper ] }>
                     <Text style={ [ gStyle.regular_font, styles.title ] }>
                        { dateHelper(moment.date).format("DD-MM-YYYY") }
                     </Text>
                  </View>
               </View>

            </TouchableOpacity>
         }
      </>
   );
}

const styles = StyleSheet.create({
   noteItem: {
      height: 300,
      padding: 20,
      flexDirection: "row",
      borderRadius: 15,
      backgroundColor: ITEM_BG,
      marginVertical: 5,
      overflow: "hidden"
   },
   background: {
      backgroundColor: "black",
      opacity: 0.2
   },
   wrapper: {
      backgroundColor: "#24292e",
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 4
   },
   title_position: {
      position: "absolute",
      left: 20,
      top: 20,
   },
   date_and_location_position: {
      position: "absolute",
      flexDirection: "row",
      bottom: 20,
      right: 20,
      gap: 10
   },
   tag_position: {
      position: "absolute",
      left: 20,
      bottom: 20,
   },
   title: {
      color: "#F5F5F5FF",
   },
   noteBody: {
      color: SECOND_FONT_COLOR,
      fontSize: 14,
      width: "90%"
   },
   date: {
      color: NOTES_COLOR,
      fontSize: 12,
   }
});
