import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { BackIcon } from "../UI/Back-Icon";
import { PlansStackEnum } from "../../navigation/type";
import { gStyle } from "../../asset";
import { MAIN_FONT_DARK, SAVE_DARK, SAVE_DISABLED_DARK, SAVE_DISABLED_ICON, SAVE_ICON } from "../../constant";
import { planAction } from "../../redux/slice";
import { useState } from "react";
import { updatePlanService } from "../../service";
import { useAppDispatch, useAppSelector } from "../../hook";

export function TasksScreenHeader() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { activePlan } = useAppSelector( state => state.planReducer );

   const dispatch = useAppDispatch();

   const [ isPrevPlanTitleSame, setIsPrevPlanTitleSame ] = useState<boolean>( true );

   const lightModeSaveDisable = isPrevPlanTitleSame ? SAVE_DISABLED_ICON : SAVE_ICON;
   const darkModeSaveDisable = isPrevPlanTitleSame ? SAVE_DISABLED_DARK : SAVE_DARK;

   const { updatePlanFn } = updatePlanService( () => setIsPrevPlanTitleSame( true ) );

   return (
       <View style={ [ styles.header ] }>

          <View style={ [ { flexDirection: "row", gap: 12, alignItems: "center" } ] }>
             <BackIcon to={ PlansStackEnum.PlanList }/>

             <TouchableOpacity style={ [ { flexDirection: "row", gap: 10 } ] }
                               activeOpacity={ 0.5 }
                               disabled={ isPrevPlanTitleSame }
                               onPress={ () => updatePlanFn( activePlan.id, activePlan.title ) }>

                <Image source={ isDark ? darkModeSaveDisable : lightModeSaveDisable }
                       style={ [ { width: 32, height: 32 } ] }/>
             </TouchableOpacity>

             <TextInput
                 style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK }, { textAlign: "left" } ] }
                 autoFocus={ false }
                 maxLength={ 25 }
                 onChangeText={ value => {
                    setIsPrevPlanTitleSame( false );
                    dispatch( planAction.updateTitle( { planId: activePlan.id, title: value } ) );
                 } }
                 value={ activePlan.title }
                 placeholder={ "Назва плану" }/>
          </View>

       </View>
   );
}

const styles = StyleSheet.create( {
   header: {
      height: 50,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      justifyContent: "space-between",
   },
   title: {
      fontSize: 18,
      fontWeight: "bold",
      width: 300,
      textAlign: "center",
   },
} );
