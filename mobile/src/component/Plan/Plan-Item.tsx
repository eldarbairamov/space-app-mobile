import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { BRAIN_IMAGE, DELETE_ICON, DELETE_ICON_DARK, ITEM_BG, ITEM_BG_DARK, MAIN_FONT_DARK, PLANS_COLOR } from "../../constant";
import { IPlan } from "../../interface";
import dateHelper from "moment";
import { deletePlanService } from "../../service";
import { useNavigation } from "@react-navigation/native";
import { PlanListScreenNavigationProp, PlansStackEnum } from "../../navigation/type";
import { useAppDispatch, useAppSelector, useDimension } from "../../hook";
import { planAction } from "../../redux/slice";
import { useEffect } from "react";

export function PlanItem({ plan }: { plan: IPlan }) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { total, searchKey } = useAppSelector(state => state.planReducer);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(planAction.setActivePlan(plan));
   }, []);

   const { navigate } = useNavigation<PlanListScreenNavigationProp>();

   const { deletePlanFn } = deletePlanService();

   const { isTablet } = useDimension();

   return (
      <>
         { plan &&
            <TouchableOpacity
               style={ [ styles.noteItem, isDark && { backgroundColor: ITEM_BG_DARK }, isTablet && { width: "49.5%", height: 160 } ] }
               activeOpacity={ 0.7 }
               onPress={ () => {
                  dispatch(planAction.setActivePlan(plan));
                  navigate(PlansStackEnum.TaskList);
               } }>
               <View style={ [ styles.left ] }>
                  <Text style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK } ] }>
                     { plan.title }
                  </Text>

                  <Text style={ [ gStyle.regular_font, styles.date ] }>
                     { dateHelper(plan.lastModified).format("DD-MM-YYYY, HH:mm") }
                  </Text>
               </View>

               <View style={ [ styles.mid ] }>
                  <Image source={ BRAIN_IMAGE }
                         style={ [ { width: 60, height: 60 }, isTablet && { width: 80, height: 80 } ] }/>
               </View>

               <View style={ [ styles.right, gStyle.center, { alignItems: "flex-end" } ] }>
                  <TouchableOpacity activeOpacity={ 0.5 }
                                    onPress={ () => deletePlanFn(plan.id, total, searchKey) }>
                     <Image source={ isDark ? DELETE_ICON_DARK : DELETE_ICON }
                            style={ { width: 28, height: 28, alignSelf: "flex-end" } }/>
                  </TouchableOpacity>
               </View>

            </TouchableOpacity>
         }
      </>
   );
}

const styles = StyleSheet.create({
   noteItem: {
      height: 120,
      padding: 20,
      flexDirection: "row",
      borderRadius: 15,
      backgroundColor: ITEM_BG,
      marginVertical: 5,
   },
   left: {
      width: "33%",
      justifyContent: "space-between",
   },
   mid: {
      width: "34%",
      justifyContent: "center",
      alignItems: "center"
   },
   right: {
      width: "34%",
   },
   title: {
      fontWeight: "700"
   },
   date: {
      color: PLANS_COLOR,
      fontSize: 12,
      fontWeight: "500"
   }
});
