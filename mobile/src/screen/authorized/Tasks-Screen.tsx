import { View } from "react-native";
import { gStyle } from "../../asset";
import { TasksScreenBody, TasksScreenHeader } from "../../component";
import { useAppSelector } from "../../hook";
import { BG_DARK } from "../../constant";
import { getTasksService } from "../../service";

export function TasksScreen() {
   const { activePlan } = useAppSelector(state => state.planReducer);

   const { isDark } = useAppSelector(state => state.appReducer);

   getTasksService(activePlan.id);

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         <TasksScreenHeader/>
         <TasksScreenBody activePlan={ activePlan }/>
      </View>
   );
}
