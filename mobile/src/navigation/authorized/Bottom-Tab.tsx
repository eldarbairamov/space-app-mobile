import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import { TabBarLabel, Title } from "../../component";
import { TabStackEnum } from "../type";
import { BG_DARK, HOME_ICON, HOME_ICON_DARK, MOMENT_ICON, MOMENT_ICON_DARK, MOMENTS_COLOR, NOTE_ICON, NOTE_ICON_DARK, NOTES_COLOR, PLAN_ICON, PLAN_ICON_DARK, PLANS_COLOR } from "../../constant";
import { useAppSelector } from "../../hook";
import { DashboardStack } from "./Dashboard-Stack";
import { NotesStack } from "./Notes-Stack";
import { PlansStack } from "./Plans-Stack";
import { MomentsStack } from "./Moments-Stack";

const Tab = createBottomTabNavigator();

export function BottomTab() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const screenOptions: BottomTabNavigationOptions = {
      headerTitle: ({ children }) => <Title children={ children }/>,
      headerStyle: {
         backgroundColor: isDark ? BG_DARK : "whitesmoke",
         shadowOpacity: 0,
      },
      tabBarStyle: {
         backgroundColor: isDark ? BG_DARK : "whitesmoke",
         borderTopWidth: 0,
      },
   };

   const { plansCount, notesCount, momentsCount } = useAppSelector(state => state.userReducer);

   return (
      <Tab.Navigator initialRouteName={ TabStackEnum.Dashboard } screenOptions={ screenOptions }>

         <Tab.Screen name={ TabStackEnum.Dashboard } component={ DashboardStack } options={ {
            tabBarIcon: () => <Image source={ isDark ? HOME_ICON_DARK : HOME_ICON } style={ styles.image }/>,
            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

         <Tab.Screen name={ TabStackEnum.Notes } component={ NotesStack } options={ {
            tabBarIcon: () => <Image source={ isDark ? NOTE_ICON_DARK : NOTE_ICON } style={ styles.image }/>,
            tabBarBadge: notesCount,
            tabBarBadgeStyle: { backgroundColor: NOTES_COLOR, color: "whitesmoke" },
            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

         <Tab.Screen name={ TabStackEnum.Plans } component={ PlansStack } options={ {
            tabBarIcon: () => <Image source={ isDark ? PLAN_ICON_DARK : PLAN_ICON } style={ styles.image }/>,
            tabBarBadge: plansCount,
            tabBarBadgeStyle: { backgroundColor: PLANS_COLOR, color: "whitesmoke" },
            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

         <Tab.Screen name={ TabStackEnum.Moments } component={ MomentsStack } options={ {
            tabBarIcon: () => <Image source={ isDark ? MOMENT_ICON_DARK : MOMENT_ICON } style={ styles.image }/>,
            tabBarBadge: momentsCount,
            tabBarBadgeStyle: { backgroundColor: MOMENTS_COLOR, color: "whitesmoke" },
            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

      </Tab.Navigator>
   );
}

const styles = StyleSheet.create({
   image: {
      width: 30,
      height: 30,
      position: "absolute",
      top: 15
   },
});
