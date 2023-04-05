import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum TabStackEnum {
   Dashboard = "Dashboard",
   Notes = "Notes",
   Plans = "Plans",
   Moments = "Moments",
}

type TabStackParam = {
   Dashboard: any,
   Notes: any,
   Plans: any,
   Moments: any
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
