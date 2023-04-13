import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { Add, BackIcon, TaskItem } from "../../component";
import { PlansStackEnum } from "../../navigation/type";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useState } from "react";
import { BG_DARK, MAIN_FONT_DARK, SAVE_DARK, SAVE_DISABLE_DARK, SAVE_DISABLED_ICON, SAVE_ICON, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { addTaskService, getTasksService, updatePlanService } from "../../service";
import { planAction } from "../../redux/slice";

export function TasksScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { tasks } = useAppSelector(state => state.taskReducer);
   const { activePlan } = useAppSelector(state => state.planReducer);

   const dispatch = useAppDispatch();

   const [ taskTitle, setTaskTitle ] = useState<string>("");
   const [ isPrevPlanTitleSame, setIsPrevPlanTitleSame ] = useState<boolean>(true);
   const [ isTyping, setIsTyping ] = useState<boolean | string>(false);

   const iconDisableCondition = !isTyping || taskTitle === "";

   const lightModeSaveDisable = isPrevPlanTitleSame ? SAVE_ICON : SAVE_DISABLED_ICON;
   const darkModeSaveDisable = isPrevPlanTitleSame ? SAVE_DARK : SAVE_DISABLE_DARK;

   getTasksService(activePlan.id);
   const { addTaskFn } = addTaskService(activePlan.id, taskTitle, () => setTaskTitle(""));
   const { updatePlanFn } = updatePlanService(() => setIsPrevPlanTitleSame(true));

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         <View style={ [ styles.header ] }>

            <View style={ [ { flexDirection: "row", gap: 12, alignItems: "center" } ] }>
               <BackIcon to={ PlansStackEnum.PlanList }/>

               <TouchableOpacity style={ [ { flexDirection: "row", gap: 10 } ] }
                                 activeOpacity={ 0.5 }
                                 onPress={ () => updatePlanFn(activePlan.id, activePlan.title) }>

                  <Image source={ isDark ? darkModeSaveDisable : lightModeSaveDisable }
                         style={ [ { width: 32, height: 32 } ] }/>
               </TouchableOpacity>

               <TextInput
                  style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK }, { textAlign: "left" } ] }
                  autoFocus={ false }
                  maxLength={ 25 }
                  onChangeText={ value => {
                     setIsPrevPlanTitleSame(false);
                     dispatch(planAction.updateTitle({ planId: activePlan.id, title: value }));
                  } }
                  value={ activePlan.title }
                  placeholder={ "Назва плану" }/>


            </View>

         </View>

         <View style={ [ styles.body ] }>
            <View style={ [ { flexDirection: "row", gap: 10 } ] }>
               <Add onPress={ addTaskFn } condition={ iconDisableCondition }/>
               <TextInput value={ taskTitle }
                          style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK }, { width: 200 } ] }
                          placeholderTextColor={ isDark ? SECOND_FONT_DARK : SECOND_FONT_COLOR }
                          onChangeText={ (value) => {
                             setIsTyping(true);
                             setTaskTitle(value);
                          } }
                          placeholder={ "Що плануєш зробити?" }/>
            </View>


            <FlatList style={ [ styles.taskListWrapper ] }
                      data={ tasks }
                      renderItem={ ({ item, index }) =>
                         <TaskItem key={ index + 1 } task={ item }/> }/>

         </View>


      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      justifyContent: "space-between",
   },
   body: {
      paddingTop: 30,
      gap: 15,
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   title: {
      fontSize: 18,
      fontWeight: "bold",
      width: 300,
      textAlign: "center",
   },
   date: {
      fontWeight: "bold",
   },
   taskListWrapper: {
      marginTop: 10,
      width: "93%",
      paddingHorizontal: 10
   },

});
