import { ToastConfig, BaseToast } from "react-native-toast-message";
import { StyleProp, ViewStyle } from "react-native";
import { ERROR_COLOR, ITEM_BG_DARK, MAIN_FONT_DARK, NOTES_COLOR, SUCCESS_COLOR } from "../constant";
import { gStyle } from "../asset";

export function toastTheme( isDark: boolean ) {
   const info: StyleProp<ViewStyle> = {
      borderLeftColor: NOTES_COLOR,
      backgroundColor: isDark ? ITEM_BG_DARK : "white",
   };

   const success: StyleProp<ViewStyle> = {
      borderLeftColor: SUCCESS_COLOR,
      backgroundColor: isDark ? ITEM_BG_DARK : "white"
   };

   const error: StyleProp<ViewStyle> = {
      borderLeftColor: ERROR_COLOR,
      backgroundColor: isDark ? ITEM_BG_DARK : "white"
   };

   const toastConfig: ToastConfig = {
      info: ( props ) => (
          <BaseToast { ...props } style={ info }
                     text1Style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK } ] }/>
      ),
      success: ( props ) => (
          <BaseToast { ...props } style={ success }
                     text1Style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK } ] }/>
      ),
      error: ( props ) => (
          <BaseToast { ...props } style={ error }
                     text1Style={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK } ] }/>
      )
   };

   return toastConfig;
}


