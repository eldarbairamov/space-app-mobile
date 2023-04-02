import { FlatList, StyleSheet, View } from "react-native";
import { gStyle } from "../../asset";
import { Add, Input, PlanItem } from "../../component";
import { planAction } from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addPlanService, getPlansService } from "../../service";

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

            <Input onChange={ handleChange }
                   value={ searchKey }
                   isCenter={ false }
                   placeholder={ 'Пошук' }/>

         </View>

         <View style={ [ styles.body ] }>
            <FlatList style={ styles.planListWrapper }
                      data={ plans }
                      renderItem={ ({ item, index }) =>
                         <PlanItem plan={ item }/>
                      }/>
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
      paddingTop: "1%",
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   planListWrapper: {
      width: "93%",
   },
})

