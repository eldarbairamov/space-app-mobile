import { View } from "react-native";
import { gStyle } from "../../asset";
import { TasksScreenBody, TasksScreenHeader } from "../../component";
import { useAppSelector } from "../../hook";
import { BG_DARK } from "../../constant";

export function TasksScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         <TasksScreenHeader/>
         <TasksScreenBody/>
      </View>
   );
}
