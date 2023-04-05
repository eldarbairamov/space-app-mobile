import { StyleSheet, Text, View } from "react-native";
import { gStyle } from "../asset";
import { TabStackEnum } from "../navigation/type";

export function Title({ children }: { children: string }) {
   const changeLogoBg = () => {
      switch (children) {
         case TabStackEnum.Dashboard:
            return "#17494D";
         case TabStackEnum.Notes:
            return "#d78052";
         case TabStackEnum.Plans:
            return "#3D8DAE";
         case TabStackEnum.Moments:
            return "#7274d7";
         default:
            return "#d78052";
      }
   };

   const styles = StyleSheet.create({
      container: {
         gap: -3,
         flexDirection: "row",
      },
      title: {
         fontWeight: "bold",
         fontSize: 20,
         color: changeLogoBg(),
      }
   });


   return (
      <View style={ styles.container }>
         <Text style={ [ gStyle.regular_font, styles.title ] }> [ </Text>
         <Text style={ [ gStyle.regular_font, styles.title ] }> СПЕЙС </Text>
         <Text style={ [ gStyle.regular_font, styles.title ] }> ] </Text>
      </View>
   );
}

