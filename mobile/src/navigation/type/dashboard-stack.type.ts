import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum DashboardStackEnum {
   Main = "Main",
   Settings = "Settings",
   EmailSetting = "EmailSetting",
   PasswordSetting = "PasswordSetting",
   ChangePasswordMessage = "ChangePasswordMessage"
}

type DashboardStackParam = {
   Main: any,
   Settings: any,
   PasswordSetting: any,
   EmailSetting: any,
   ChangePasswordMessage: any,
}

type MainScreenRouteProp = RouteProp<DashboardStackParam, "Main">
export type MainScreenNavigationProp = NativeStackNavigationProp<DashboardStackParam, "Main">

export type MainProps = {
   route: MainScreenRouteProp,
   navigation: MainScreenNavigationProp
}

type SettingsScreenRouteProp = RouteProp<DashboardStackParam, "Settings">
export type SettingsScreenNavigationProp = NativeStackNavigationProp<DashboardStackParam, "Settings">

export type SettingsProps = {
   route: SettingsScreenRouteProp,
   navigation: SettingsScreenNavigationProp
}

type EmailSettingScreenRouteProp = RouteProp<DashboardStackParam, "EmailSetting">
export type EmailSettingScreenNavigationProp = NativeStackNavigationProp<DashboardStackParam, "EmailSetting">

export type EmailSettingProps = {
   route: EmailSettingScreenRouteProp,
   navigation: EmailSettingScreenNavigationProp
}

type PasswordSettingScreenRouteProp = RouteProp<DashboardStackParam, "PasswordSetting">
export type PasswordSettingScreenNavigationProp = NativeStackNavigationProp<DashboardStackParam, "PasswordSetting">

export type PasswordSettingProps = {
   route: PasswordSettingScreenRouteProp,
   navigation: PasswordSettingScreenNavigationProp
}

type ChangePasswordMessageRouteProp = RouteProp<DashboardStackParam, "ChangePasswordMessage">
export type ChangePasswordMessageScreenNavigationProp = NativeStackNavigationProp<DashboardStackParam, "ChangePasswordMessage">

export type ChangePasswordMessageProps = {
   route: ChangePasswordMessageRouteProp,
   navigation: ChangePasswordMessageScreenNavigationProp
}
