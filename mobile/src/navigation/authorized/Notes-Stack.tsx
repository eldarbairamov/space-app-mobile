import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { NoteEditScreen, NotesScreen } from "../../screen";
import { NotesStackEnum } from "../type";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export function NotesStack() {
   return (
      <Stack.Navigator screenOptions={ screenOptions } initialRouteName={ NotesStackEnum.NoteList }>
         <Stack.Screen name={ NotesStackEnum.NoteList } component={ NotesScreen }/>
         <Stack.Screen name={ NotesStackEnum.NoteEdit } component={ NoteEditScreen }/>
      </Stack.Navigator>
   );
}

const screenOptions: NativeStackNavigationOptions = {
   headerShown: false,
   animation: Platform.OS === "android" ? "none" : "fade",
   animationDuration: 100,
};
