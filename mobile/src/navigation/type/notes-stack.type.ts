import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum NotesStackEnum {
   NoteList = "NoteList",
   NoteEdit = "NoteEdit"
}

export type NotesStackParam = {
   NoteList: any,
   NoteEdit: any
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
