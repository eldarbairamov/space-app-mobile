import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { gStyle } from "../../asset";
import { Add, PlanItem } from "../../component";
import { planAction } from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addPlanService, getPlansService } from "../../service";
import { EmptyIcon } from "../../component/UI/Empty-Icon";

export function PlansScreen() {
   const { plans, searchKey } = useAppSelector(state => state.planReducer)

   const dispatch = useAppDispatch()

   const handleChange = (value: string) => dispatch(planAction.setSearchKey(value));

   const { addPlanFn } = addPlanService()
   getPlansService()

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>
         <View style={ [ styles.header ] }>

            <Add onPress={ addPlanFn }/>

            <TextInput onChangeText={ handleChange }
                       value={ searchKey }
                       placeholder={ 'Пошук' }
                       style={ [ gStyle.regular_font, gStyle.input ] }/>

         </View>

         <View style={ [ styles.body ] }>
            { Boolean(plans.length)
               ?
               <FlatList style={ styles.planListWrapper }
                         data={ plans }
                         renderItem={ ({ item, index }) =>
                            <PlanItem key={ index + 1 } plan={ item }/> }/>
               : <EmptyIcon/>
            }
         </View>

      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      alignItems: 'center',
      paddingLeft: 20,
      gap: 10,
      flexDirection: 'row'
   },
   body: {
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   planListWrapper: {
      width: "93%",
   },
})

