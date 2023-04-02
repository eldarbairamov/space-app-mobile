import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import { MomentsScreen, PlansScreen } from "../../screen";
import { TabBarLabel, Title } from "../../component";
import { TabStackEnum } from "../../type";
import { HOME_ICON, MOMENT_ICON, MOMENTS_COLOR, NOTE_ICON, NOTES_COLOR, PLAN_ICON, PLANS_COLOR } from "../../constant";
import { useAppSelector } from "../../hook";
import { DashboardStack } from "./Dashboard-Stack";
import { NotesStack } from "./Note-Stack";

const Tab = createBottomTabNavigator();

export function BottomTab() {
   const { plansCount, notesCount, momentsCount } = useAppSelector(state => state.userReducer)

   return (
      <Tab.Navigator initialRouteName={ TabStackEnum.Dashboard } screenOptions={ screenOptions }>

         <Tab.Screen name={ TabStackEnum.Dashboard } component={ DashboardStack } options={ {
            tabBarIcon: () => <Image source={ HOME_ICON } style={ styles.image }/>,
            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

         <Tab.Screen name={ TabStackEnum.Notes } component={ NotesStack } options={ {
            tabBarIcon: () => <Image source={ NOTE_ICON } style={ styles.image }/>,
            tabBarBadge: notesCount,
            tabBarBadgeStyle: { backgroundColor: NOTES_COLOR, color: "whitesmoke" },
            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

         <Tab.Screen name={ TabStackEnum.Plans } component={ PlansScreen } options={ {
            tabBarIcon: () => <Image source={ PLAN_ICON } style={ styles.image }/>,
            tabBarBadge: plansCount,
            tabBarBadgeStyle: { backgroundColor: PLANS_COLOR, color: "whitesmoke" },

            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

         <Tab.Screen name={ TabStackEnum.Moments } component={ MomentsScreen } options={ {
            tabBarIcon: () => <Image source={ MOMENT_ICON } style={ styles.image }/>,
            tabBarBadge: momentsCount,
            tabBarBadgeStyle: { backgroundColor: MOMENTS_COLOR, color: "whitesmoke" },
            tabBarLabel: (props) => <TabBarLabel { ...props } />
         } }/>

      </Tab.Navigator>
   );
}

const screenOptions: BottomTabNavigationOptions = {
   headerTitle: ({ children }) => <Title children={ children }/>,
   headerStyle: {
      backgroundColor: "whitesmoke",
      shadowOpacity: 0,
   },
   tabBarStyle: {
      backgroundColor: "whitesmoke",
      borderTopWidth: 0,
   },
};

const styles = StyleSheet.create({
   image: {
      width: 30,
      height: 30,
      position: "absolute",
      top: 15
   }
});
