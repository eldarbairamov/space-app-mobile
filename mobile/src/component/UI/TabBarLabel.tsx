import { StyleSheet, View } from "react-native";
import { TabStackEnum } from "../../type";
import { DASHBOARD_COLOR, MOMENTS_COLOR, NOTES_COLOR, PLANS_COLOR } from "../../constant";

interface ITabBarLabel {
   focused: boolean,
   children: string
}

export function TabBarLabel({ focused, children }: ITabBarLabel) {

   const onFocusColorHandler = () => {
      switch (children) {
         case TabStackEnum.Dashboard:
            return DASHBOARD_COLOR;
         case TabStackEnum.Notes:
            return NOTES_COLOR;
         case TabStackEnum.Plans:
            return PLANS_COLOR;
         case TabStackEnum.Moments:
            return MOMENTS_COLOR;
      }
   };

   return (
      <View style={ styles.content }>
         <View style={ focused && { borderWidth: 2, borderColor: onFocusColorHandler() } }/>
      </View>
   );
}

const styles = StyleSheet.create({
   content: {
      position: "absolute",
      top: 53,
      width: 30
   }
});
