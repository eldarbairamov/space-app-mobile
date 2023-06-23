import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum PlansStackEnum {
   PlanList = "PlanList",
   TaskList = "TaskList"
}

type PlansStackParam = {
   PlanList: any,
   TaskList: any
}

type PlanListScreenRouteProp = RouteProp<PlansStackParam, "PlanList">
export type PlanListScreenNavigationProp = NativeStackNavigationProp<PlansStackParam, "PlanList">

export type PlanListProps = {
   route: PlanListScreenRouteProp,
   navigation: PlanListScreenNavigationProp
}

export type TaskListScreenRouteProp = RouteProp<PlansStackParam, "TaskList">
export type TaskListScreenNavigationProp = NativeStackNavigationProp<PlansStackParam, "TaskList">

export type TaskListProps = {
   route: TaskListScreenRouteProp,
   navigation: TaskListScreenNavigationProp
}
