import { StyleSheet, Text, View } from "react-native";
import { gStyle } from "../asset";
import { TabStackEnum } from "../navigation/type";
import { DASHBOARD_COLOR, DASHBOARD_COLOR_DARK, MOMENTS_COLOR, NOTES_COLOR, PLANS_COLOR } from "../constant";
import { useAppSelector } from "../hook";

export function Title( { children }: { children: string } ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   const changeLogoBg = () => {
      switch ( children ) {
         case TabStackEnum.Dashboard:
            return isDark ? DASHBOARD_COLOR_DARK : DASHBOARD_COLOR;
         case TabStackEnum.Notes:
            return NOTES_COLOR;
         case TabStackEnum.Plans:
            return PLANS_COLOR;
         case TabStackEnum.Moments:
            return MOMENTS_COLOR;
         default:
            return NOTES_COLOR;
      }
   };

   return (
       <View style={ [ styles.container ] }>
          <Text style={ [ gStyle.regular_font, styles.title, { color: changeLogoBg() } ] }> [ </Text>
          <Text style={ [ gStyle.regular_font, styles.title, { color: changeLogoBg() } ] }> СПЕЙС </Text>
          <Text style={ [ gStyle.regular_font, styles.title, { color: changeLogoBg() } ] }> ] </Text>
       </View>
   );
}

const styles = StyleSheet.create( {
   container: {
      gap: -3,
      flexDirection: "row",
   },
   title: {
      fontWeight: "bold",
      fontSize: 20,
   }
} );
