import { ActivityIndicator, View } from "react-native";
import { gStyle } from "../../asset";
import { TasksScreenBody, TasksScreenHeader } from "../../component";
import { useAppSelector } from "../../hook";
import { BG_DARK, PLANS_COLOR } from "../../constant";
import { getTasksService } from "../../service";

export function TasksScreen() {
   const { activePlan } = useAppSelector(state => state.planReducer);

   const { isDark } = useAppSelector(state => state.appReducer);

   const { isLoading } = getTasksService(activePlan.id);

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         { isLoading ? <ActivityIndicator size={ "large" } color={ PLANS_COLOR }/> :
            <>
               <TasksScreenHeader/>
               <TasksScreenBody activePlan={ activePlan }/>
            </>
         }
      </View>
   );
}
