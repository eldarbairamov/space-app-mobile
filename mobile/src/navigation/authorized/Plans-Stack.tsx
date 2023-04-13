import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { PlansStackEnum } from "../type";
import { PlansScreen } from "../../screen";
import { TasksScreen } from "../../screen/authorized/Tasks-Screen";

const Stack = createNativeStackNavigator();

export function PlansStack() {
   return (
      <Stack.Navigator screenOptions={ screenOptions } initialRouteName={ PlansStackEnum.PlanList }>
         <Stack.Screen name={ PlansStackEnum.PlanList } component={ PlansScreen }/>
         <Stack.Screen name={ PlansStackEnum.TaskList } component={ TasksScreen }/>
      </Stack.Navigator>
   );
}

const screenOptions: NativeStackNavigationOptions = {
   headerShown: false,
   animation: "fade",
   animationDuration: 100,
};

