import { StyleSheet } from "react-native";
import { MAIN_FONT_COLOR, SECOND_FONT_COLOR } from "../../constant";

export const gStyle = StyleSheet.create( {
   regular_font: {
      fontSize: 15,
      fontFamily: "Roboto",
      letterSpacing: -0.5,
      color: MAIN_FONT_COLOR,
   },
   second_font: {
      fontSize: 14,
      fontFamily: "Roboto",
      letterSpacing: -0.5,
      color: SECOND_FONT_COLOR,
   },
   handwrite: {
      fontFamily: "Caveat",
      letterSpacing: -0.5,
      color: MAIN_FONT_COLOR,
   },
   handwrite_bold: {
      fontFamily: "Caveat-Bold",
      letterSpacing: -0.5,
      color: MAIN_FONT_COLOR,
   },
   handwriteForNote: {
      fontFamily: "Caveat",
      fontSize: 25,
      letterSpacing: -0.5,
      color: MAIN_FONT_COLOR,
   },
   center: {
      justifyContent: "center",
      alignItems: "center",
   },
   container: {
      width: "100%",
      height: "100%",
   },
   bottom_border: {
      borderBottomColor: "#e3e3e3",
      borderBottomWidth: 1,
      width: 200
   },
   input: {
      minWidth: 0,
      maxWidth: 200,
      padding: 1
   },
   absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
   },
   absolute_center: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
   },
   border: {
      borderColor: "black",
      borderWidth: 1
   },
   screen: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "whitesmoke"
   },
   unauthorized_screen: {
      flex: 1,
      backgroundColor: "whitesmoke"
   },
   form_control_wrapper: {
      alignItems: "center",
      gap: 40,
   },
   // shadow: {
   //    shadowColor: "#171717",
   //    shadowOffset: {
   //       width: -2,
   //       height: 4
   //    },
   //    shadowOpacity: 0.2,
   //    shadowRadius: 3,
   // },
} );
