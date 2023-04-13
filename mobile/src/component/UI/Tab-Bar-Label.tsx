import { StyleSheet, View } from "react-native";
import { TabStackEnum } from "../../navigation/type";
import { DASHBOARD_COLOR, MOMENTS_COLOR, NOTES_COLOR, PLANS_COLOR } from "../../constant";
import { useAppSelector } from "../../hook";

interface ITabBarLabel {
   focused: boolean,
   children: string
}

export function TabBarLabel({ focused, children }: ITabBarLabel) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const onFocusColorHandler = () => {
      switch (children) {
         case TabStackEnum.Dashboard:
            return isDark ? "#34a4ae" : DASHBOARD_COLOR;
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
