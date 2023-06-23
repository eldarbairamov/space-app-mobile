import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ActivationScreen, ForgotPasswordScreen, LoginScreen, RegistrationScreen, ResetPasswordScreen } from "../../screen";
import { UnauthorizedStackEnum } from "../type";
import { SwitchButton, Title } from "../../component";
import { BG_DARK, MAIN_FONT_COLOR, MAIN_FONT_DARK } from "../../constant";
import { useAppSelector } from "../../hook";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export function WelcomeStack() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const screenOptions: NativeStackNavigationOptions = {
      headerTitle: ( { children } ) => <Title children={ children }/>,
      headerRight: () => <SwitchButton/>,
      headerBackTitleVisible: false,
      headerTintColor: isDark ? MAIN_FONT_DARK : MAIN_FONT_COLOR,
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerStyle: {
         backgroundColor: isDark ? BG_DARK : "whitesmoke",
      },
      animation: Platform.OS === "android" ? "none" : "fade",
      animationDuration: 100,
   };

   return (
       <Stack.Navigator screenOptions={ screenOptions } initialRouteName={ UnauthorizedStackEnum.Login }>
          <Stack.Screen name={ UnauthorizedStackEnum.Login } component={ LoginScreen }/>
          <Stack.Screen name={ UnauthorizedStackEnum.Registration } component={ RegistrationScreen }/>
          <Stack.Screen name={ UnauthorizedStackEnum.ForgotPassword } component={ ForgotPasswordScreen }/>
          <Stack.Screen name={ UnauthorizedStackEnum.Activation } component={ ActivationScreen }/>
          <Stack.Screen name={ UnauthorizedStackEnum.ResetPassword } component={ ResetPasswordScreen }/>
       </Stack.Navigator>
   );
}


