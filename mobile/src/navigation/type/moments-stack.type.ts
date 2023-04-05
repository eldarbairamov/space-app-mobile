import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum MomentsStackEnum {
   MomentList = 'NoteMomentListList',
   MomentEdit = 'MomentEdit'
}

export type MomentsStackParam = {
   MomentList: any,
   MomentEdit: any
}

type MomentListScreenRouteProp = RouteProp<MomentsStackParam, "MomentList">
export type MomentListScreenNavigationProp = NativeStackNavigationProp<MomentsStackParam, "MomentList">

export type MomentListProps = {
   route: MomentListScreenRouteProp,
   navigation: MomentListScreenNavigationProp
}

type MomentEditScreenRouteProp = RouteProp<MomentsStackParam, "MomentEdit">
export type MomentEditScreenNavigationProp = NativeStackNavigationProp<MomentsStackParam, "MomentEdit">

export type MomentEditProps = {
   route: MomentEditScreenRouteProp,
   navigation: MomentEditScreenNavigationProp
}
