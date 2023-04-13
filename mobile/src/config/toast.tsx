import { ToastConfig, BaseToast } from "react-native-toast-message";
import { StyleProp, ViewStyle } from "react-native";
import { ERROR_COLOR, NOTES_COLOR, SUCCESS_COLOR } from "../constant";

export const toastConfig: ToastConfig = {
   info: (props) => (
      <BaseToast { ...props } style={ info }/>
   ),
   success: (props) => (
      <BaseToast { ...props } style={ success }/>
   ),
   error: (props) => (
      <BaseToast { ...props } style={ error }/>
   )
};

const info: StyleProp<ViewStyle> = {
   borderLeftColor: NOTES_COLOR,
};

const success: StyleProp<ViewStyle> = {
   borderLeftColor: SUCCESS_COLOR
};

const error: StyleProp<ViewStyle> = {
   borderLeftColor: ERROR_COLOR,

};
