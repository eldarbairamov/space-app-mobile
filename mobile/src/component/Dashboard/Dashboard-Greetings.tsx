import { gStyle } from "../../asset";
import { StyleSheet, Text, View } from "react-native";
import { MAIN_FONT_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

export function DashboardGreetings() {
   const { username } = useAppSelector(state => state.userReducer);
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <View style={ [ gStyle.center, styles.greetings_wrapper ] }>
         <View style={ [ gStyle.center, styles.greetings, { width: "100%" } ] }>
            <Text style={ [ gStyle.handwrite, styles.hello, isDark && { color: MAIN_FONT_DARK } ] }>
               Привіт,
            </Text>
            <Text style={ [ gStyle.regular_font, styles.username ] }>
               { username ? username : "завантажую" }
            </Text>
         </View>
         <Text
            style={ [ gStyle.handwrite, styles.how_are_you, gStyle.center, isDark && { color: MAIN_FONT_DARK } ] }>
            Ну, як ти?
         </Text>
      </View>
   );
}

const styles = StyleSheet.create({
   greetings_wrapper: {
      width: "100%",
      marginTop: 20,
      gap: 10
   },
   greetings: {
      flexDirection: "row",
      gap: 10,
   },
   hello: {
      fontWeight: "bold",
      fontSize: 43,
   },
   username: {
      fontWeight: "bold",
      fontSize: 31,
      color: "#9d9d9d",
   },
   how_are_you: {
      fontSize: 25,
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
   },
});
