import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { Add, BackIcon, TaskItem } from "../../component";
import { PlansStackEnum } from "../../navigation/type";
import { useAppDispatch, useAppSelector } from "../../hook";
import { useState } from "react";
import { SAVE_DISABLE, SAVE_ENABLE, SECOND_FONT_COLOR } from "../../constant";
import { addTaskService, getTasksService, updatePlanService } from "../../service";
import { planAction } from "../../redux/slice";

export function TasksScreen() {
   const { tasks } = useAppSelector(state => state.taskReducer)
   const { activePlan } = useAppSelector(state => state.planReducer)
   const dispatch = useAppDispatch()

   const [ taskTitle, setTaskTitle ] = useState<string>('')
   const [ isPrevPlanTitleSame, setIsPrevPlanTitleSame ] = useState<boolean>(true)
   const [ isTyping, setIsTyping ] = useState<boolean | string>(false)

   const iconDisableCondition = !isTyping || taskTitle === ''

   getTasksService(activePlan.id)
   const { addTaskFn } = addTaskService(activePlan.id, taskTitle, () => setTaskTitle(''))
   const { updatePlanFn } = updatePlanService(() => setIsPrevPlanTitleSame(true))

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>
         <View style={ [ styles.header ] }>

            <View style={ [ { flexDirection: 'row', gap: 12, alignItems: 'center' } ] }>
               <BackIcon to={ PlansStackEnum.PlanList }/>


               <TouchableOpacity style={ [ { flexDirection: 'row', gap: 10 } ] }
                                 activeOpacity={ 0.5 }
                                 onPress={ () => updatePlanFn(activePlan.id, activePlan.title) }>

                  <Image source={ isPrevPlanTitleSame ? SAVE_DISABLE : SAVE_ENABLE }
                         style={ [ { width: 26, height: 26 } ] }/>
               </TouchableOpacity>

               <TextInput style={ [ gStyle.regular_font, styles.title, { textAlign: 'left' } ] }
                          autoFocus={ false }
                          maxLength={ 30 }
                          onChangeText={ value => {
                             setIsPrevPlanTitleSame(false)
                             dispatch(planAction.updateTitle({ planId: activePlan.id, title: value }))
                          } }
                          value={ activePlan.title }
                          placeholder={ 'Назва плану' }/>


            </View>

         </View>

         <View style={ [ styles.body ] }>
            <View style={ [ { flexDirection: 'row', gap: 10 } ] }>
               <Add onPress={ addTaskFn } condition={ iconDisableCondition }/>
               <TextInput value={ taskTitle }
                          style={ [ gStyle.regular_font, { width: 200 } ] }
                          placeholderTextColor={ SECOND_FONT_COLOR }
                          onChangeText={ (value) => {
                             setIsTyping(true)
                             setTaskTitle(value)
                          } }
                          placeholder={ 'Що плануєш зробити?' }/>
            </View>


            <FlatList style={ [ styles.taskListWrapper ] }
                      data={ tasks }
                      renderItem={ ({ item, index }) =>
                         <TaskItem key={ index + 1 } task={ item }/> }/>

         </View>


      </View>
   )
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      flexDirection: 'row',
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

})
