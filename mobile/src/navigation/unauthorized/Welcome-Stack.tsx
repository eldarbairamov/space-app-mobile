import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ActivationScreen, ForgotPasswordSreen, LoginScreen, RegistrationSreen, ResetPasswordScreen } from "../../screen";
import { UnauthorizedStackEnum } from "../../type";
import { Title } from "../../component";

const Stack = createNativeStackNavigator()

export function WelcomeStack() {
   return (
      <Stack.Navigator screenOptions={ screenOptions } initialRouteName={ UnauthorizedStackEnum.Login }>
         <Stack.Screen name={ UnauthorizedStackEnum.Login } component={ LoginScreen }/>
         <Stack.Screen name={ UnauthorizedStackEnum.Registration } component={ RegistrationSreen }/>
         <Stack.Screen name={ UnauthorizedStackEnum.ForgotPassword } component={ ForgotPasswordSreen }/>
         <Stack.Screen name={ UnauthorizedStackEnum.Activation } component={ ActivationScreen }/>
         <Stack.Screen name={ UnauthorizedStackEnum.ResetPassword } component={ ResetPasswordScreen }/>
      </Stack.Navigator>
   )
}

const screenOptions: NativeStackNavigationOptions = {
   headerTitle: ({ children }) => <Title children={ children }/>,
   headerBackTitleVisible: false,
   headerShadowVisible: false,
   headerStyle: {
      backgroundColor: "whitesmoke",
   },
   animation: "fade",
   animationDuration: 100
}
