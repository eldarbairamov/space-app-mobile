import { StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";
import { MAIN_FONT_COLOR, MAIN_FONT_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

export function SelectItem({ children }: { children: ReactNode }) {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <View style={ [ styles.container ] }>
         <Text style={ [isDark ? { color: MAIN_FONT_DARK } : { color: MAIN_FONT_COLOR }] }>
            { children }
         </Text>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      height: 30,
      justifyContent: "center",
      paddingHorizontal: 5,
   }
});
