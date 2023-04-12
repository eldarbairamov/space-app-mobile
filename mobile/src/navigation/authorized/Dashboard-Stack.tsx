import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { PasswordSettingScreen, DashboardScreen, SettingsScreen, EmailSettingScreen } from "../../screen";
import { DashboardStackEnum } from "../type";
import { ChangePasswordMessage } from "../../component";
import { ChangeEmailMessage } from "../../component/Message/Change-Email-Message";

const Stack = createNativeStackNavigator()

export function DashboardStack() {
   return (
      <Stack.Navigator screenOptions={ screenOptions } initialRouteName={ DashboardStackEnum.Main }>
         <Stack.Screen name={ DashboardStackEnum.Main } component={ DashboardScreen }/>
         <Stack.Screen name={ DashboardStackEnum.Settings } component={ SettingsScreen }/>
         <Stack.Screen name={ DashboardStackEnum.EmailSetting } component={ EmailSettingScreen }/>
         <Stack.Screen name={ DashboardStackEnum.PasswordSetting } component={ PasswordSettingScreen }/>
         <Stack.Screen name={ DashboardStackEnum.ChangePasswordMessage } component={ ChangePasswordMessage }/>
         <Stack.Screen name={ DashboardStackEnum.ChangeEmailMessage } component={ ChangeEmailMessage }/>
      </Stack.Navigator>
   )
}

const screenOptions: NativeStackNavigationOptions = {
   headerShown: false,
   animation: "fade",
   animationDuration: 100,
}
