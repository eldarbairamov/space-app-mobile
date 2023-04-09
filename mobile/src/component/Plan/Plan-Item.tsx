import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { BRAIN_IMAGE, DELETE_ICON, ITEM_BG, PLANS_COLOR } from "../../constant";
import { IPlan } from "../../interface";
import dateHelper from "moment";
import { deletePlanService } from "../../service";
import { useNavigation } from "@react-navigation/native";
import { PlanListScreenNavigationProp, PlansStackEnum } from "../../navigation/type";
import { useAppDispatch } from "../../hook";
import { planAction } from "../../redux/slice";
import { useEffect } from "react";

export function PlanItem({ plan }: { plan: IPlan }) {
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(planAction.setActivePlan(plan))
   }, [])

   const { navigate } = useNavigation<PlanListScreenNavigationProp>()

   const { deletePlanFn } = deletePlanService()

   return (
      <>
         { plan &&
            <TouchableOpacity style={ [ styles.noteItem ] }
                              activeOpacity={ 0.7 }
                              onPress={ () => {
                                 dispatch(planAction.setActivePlan(plan))
                                 navigate(PlansStackEnum.TaskList)
                              } }>
               <View style={ [ styles.left ] }>
                  <Text style={ [ gStyle.regular_font, styles.title ] }>
                     { plan.title }
                  </Text>

                  <Text style={ [ gStyle.regular_font, styles.date ] }>
                     { dateHelper(plan.lastModified).format("DD-MM-YYYY, HH:mm") }
                  </Text>
               </View>

               <View style={ [ styles.mid ] }>
                  <Image source={ BRAIN_IMAGE }
                         style={ [ { width: 60, height: 60 } ] }/>
               </View>

               <TouchableOpacity activeOpacity={ 0.5 }
                                 style={ [ styles.right, gStyle.center ] }
                                 onPress={ () => deletePlanFn(plan.id) }>
                  <Image source={ DELETE_ICON }
                         style={ { width: 28, height: 28, alignSelf: "flex-end" } }/>

               </TouchableOpacity>

            </TouchableOpacity>
         }
      </>
   )
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
      width: "33,3%",
      justifyContent: "space-between",
   },
   mid: {
      width: "33,3%",
      justifyContent: "center",
      alignItems: "center"
   },
   right: {
      width: "34%",
   },
   title: {
      fontWeight: '500'
   },
   date: {
      color: PLANS_COLOR,
      fontSize: 12,
      fontWeight: "500"
   }
})
