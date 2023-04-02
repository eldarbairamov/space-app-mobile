import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { INote } from "../interface";

export enum DashboardStackEnum {
   Main = "Main",
   Settings = "Settings",
   EmailSetting = "EmailSetting",
   PasswordSetting = "PasswordSetting",
   ChangePasswordMessage = "ChangePasswordMessage"
}

export enum TabStackEnum {
   Dashboard = "Dashboard",
   Notes = "Notes",
   Plans = "Plans",
   Moments = "Moments",
}

export enum UnauthorizedStackEnum {
   Registration = "Registration",
   Login = "Login",
   Activation = "Activation",
   ForgotPassword = 'ForgotPassword',
   ResetPassword = 'ResetPassword'
}

export enum NotesStackEnum {
   NoteList = 'NoteList',
   NoteEdit = 'NoteEdit'
}

type DashboardStackParam = {
   Main: any,
   Settings: any,
   PasswordSetting: any,
   EmailSetting: any,
   ChangePasswordMessage: any,
}

type UnauthorizedStackParam = {
   Registration: any,
   Login: any,
   Activation: any,
   ForgotPassword: any,
   ResetPassword: any
}

type TabStackParam = {
   Dashboard: any,
   Notes: any,
   Plans: any,
   Moments: any
}

export type NotesStackParam = {
   NoteList: any,
   NoteEdit: any
}

type DashboardScreenRouteProp = RouteProp<TabStackParam, "Dashboard">
export type DashboardScreenNavigationProp = NativeStackNavigationProp<TabStackParam, "Dashboard">

export type DashboardProps = {
   route: DashboardScreenRouteProp,
   navigation: DashboardScreenNavigationProp
}

type NotesScreenRouteProp = RouteProp<TabStackParam, "Notes">
export type NotesScreenNavigationProp = NativeStackNavigationProp<TabStackParam, "Notes">

export type NotesProps = {
   route: NotesScreenRouteProp,
   navigation: NotesScreenNavigationProp
}

type PlansScreenRouteProp = RouteProp<TabStackParam, "Plans">
export type PlansScreenNavigationProp = NativeStackNavigationProp<TabStackParam, "Plans">

export type PlansProps = {
   route: PlansScreenRouteProp,
   navigation: PlansScreenNavigationProp
}

type MomentsScreenRouteProp = RouteProp<TabStackParam, "Moments">
type MomentsScreenNavigationProp = NativeStackNavigationProp<TabStackParam, "Moments">

type MomentsProps = {
   route: MomentsScreenRouteProp,
   navigation: MomentsScreenNavigationProp
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

type NoteListScreenRouteProp = RouteProp<NotesStackParam, "NoteList">
export type NoteListScreenNavigationProp = NativeStackNavigationProp<NotesStackParam, "NoteList">

export type NoteListProps = {
   route: NoteListScreenRouteProp,
   navigation: NoteListScreenNavigationProp
}

type NoteEditScreenRouteProp = RouteProp<NotesStackParam, "NoteEdit">
export type NoteEditScreenNavigationProp = NativeStackNavigationProp<NotesStackParam, "NoteEdit">

export type NoteEditProps = {
   route: NoteEditScreenRouteProp,
   navigation: NoteEditScreenNavigationProp
}
