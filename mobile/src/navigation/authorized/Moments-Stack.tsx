import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { MomentEditScreen, MomentsScreen } from "../../screen";
import { MomentsStackEnum } from "../type";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export function MomentsStack() {
   return (
      <Stack.Navigator screenOptions={ screenOptions } initialRouteName={ MomentsStackEnum.MomentList }>
         <Stack.Screen name={ MomentsStackEnum.MomentList } component={ MomentsScreen }/>
         <Stack.Screen name={ MomentsStackEnum.MomentEdit } component={ MomentEditScreen }/>
      </Stack.Navigator>
   );
}

const screenOptions: NativeStackNavigationOptions = {
   headerShown: false,
   animation: Platform.OS === "android" ? "none" : "fade",
   animationDuration: 100,
};

