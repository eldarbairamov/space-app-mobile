import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum UnauthorizedStackEnum {
   Registration = "Registration",
   Login = "Login",
   Activation = "Activation",
   ForgotPassword = 'ForgotPassword',
   ResetPassword = 'ResetPassword'
}

type UnauthorizedStackParam = {
   Registration: any,
   Login: any,
   Activation: any,
   ForgotPassword: any,
   ResetPassword: any
}

type LoginScreenRouteProp = RouteProp<UnauthorizedStackParam, "Login">
export type LoginScreenNavigationProp = NativeStackNavigationProp<UnauthorizedStackParam, "Login">

export type LoginProps = {
   route: LoginScreenRouteProp,
   navigation: LoginScreenNavigationProp
}

type RegistrationScreenRouteProp = RouteProp<UnauthorizedStackParam, "Registration">
export type RegistrationScreenNavigationProp = NativeStackNavigationProp<UnauthorizedStackParam, "Registration">

export type RegistrationProps = {
   route: RegistrationScreenRouteProp,
   navigation: RegistrationScreenNavigationProp
}

type ForgotPasswordScreenRouteProp = RouteProp<UnauthorizedStackParam, "ForgotPassword">
export type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<UnauthorizedStackParam, "ForgotPassword">

export type ForgotPasswordProps = {
   route: ForgotPasswordScreenRouteProp,
   navigation: ForgotPasswordScreenNavigationProp
}

type ActivationScreenRouteProp = RouteProp<UnauthorizedStackParam, "Activation">
export type ActivationScreenNavigationProp = NativeStackNavigationProp<UnauthorizedStackParam, "Activation">

export type ActivationProps = {
   route: ActivationScreenRouteProp,
   navigation: ActivationScreenNavigationProp
}

type ResetPasswordScreenRouteProp = RouteProp<UnauthorizedStackParam, "ResetPassword">
export type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<UnauthorizedStackParam, "ResetPassword">

export type ResetPasswordProps = {
   route: ResetPasswordScreenRouteProp,
   navigation: ResetPasswordScreenNavigationProp
}
