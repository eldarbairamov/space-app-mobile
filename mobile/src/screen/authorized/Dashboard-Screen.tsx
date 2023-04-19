import { StyleSheet, View } from "react-native";
import { SettingsIcon, LogoutIcon, SwitchButton, DashboardAvatar, DashboardAvatarEdit, DashboardGreetings } from "../../component";
import { gStyle } from "../../asset";
import { BG_DARK } from "../../constant";
import { getUserService } from "../../service";
import { useAppSelector } from "../../hook";

export function DashboardScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   getUserService();

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>

               <View style={ [ gStyle.container ] }>

                  <View style={ [ styles.header ] }>
                     <SwitchButton/>
                     <View style={ [ { flexDirection: "row", gap: 20 }, gStyle.center ] }>
                        <SettingsIcon/>
                        <LogoutIcon/>
                     </View>
                  </View>

                  <View style={ [ gStyle.center, styles.avatar_wrapper ] }>
                     <DashboardAvatar/>
                     <DashboardAvatarEdit/>
                  </View>

                  <DashboardGreetings/>

               </View>

      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      position: "absolute",
      zIndex: 1,
      height: "5%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      flexDirection: "row"
   },
   avatar_wrapper: {
      marginTop: 30,
      width: "100%",
      height: "60%",
   },
});
