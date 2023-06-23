import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { Add } from "../UI/Add";
import { gStyle } from "../../asset";
import { MAIN_FONT_DARK, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { TaskItem } from "./Task-Item";
import { useAppSelector } from "../../hook";
import { useState } from "react";
import { addTaskService } from "../../service";
import { IPlan } from "../../interface";

export function TasksScreenBody( { activePlan }: { activePlan: IPlan } ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { tasks } = useAppSelector( state => state.taskReducer );

   const [ taskTitle, setTaskTitle ] = useState<string>( "" );

   const [ isTyping, setIsTyping ] = useState<boolean | string>( false );

   const iconDisableCondition = !isTyping || taskTitle === "";

   const { addTaskFn } = addTaskService( activePlan.id, taskTitle, () => setTaskTitle( "" ) );

   return (
       <View style={ [ styles.body ] }>
          <View style={ [ { flexDirection: "row", gap: 10 } ] }>
             <Add onPress={ addTaskFn } condition={ iconDisableCondition }/>
             <TextInput value={ taskTitle }
                        style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK }, { width: 200 } ] }
                        placeholderTextColor={ isDark ? SECOND_FONT_DARK : SECOND_FONT_COLOR }
                        onChangeText={ ( value ) => {
                           setIsTyping( true );
                           setTaskTitle( value );
                        } }
                        placeholder={ "Що плануєш зробити?" }/>
          </View>

          <FlatList style={ [ styles.taskListWrapper ] }
                    contentContainerStyle={ { alignItems: "center" } }
                    data={ tasks }
                    renderItem={ ( { item, index } ) =>
                        <TaskItem key={ index + 1 } task={ item }/> }/>

       </View>
   );
}

const styles = StyleSheet.create( {
   body: {
      paddingTop: 30,
      gap: 15,
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   date: {
      fontWeight: "bold",
   },
   taskListWrapper: {
      marginTop: 10,
      width: "93%",
      paddingHorizontal: 10,
   },
} );

