import { StyleSheet, View } from "react-native";
import { gStyle } from "../../asset";
import { AuthSettings, BackIcon, UpdateProfileForm } from "../../component";
import { DashboardStackEnum } from "../../navigation/type";
import { updateProfileService } from "../../service";
import { BG_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

export function SettingsScreen() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { updateProfileFn } = updateProfileService();

   return (
       <View style={ [ gStyle.screen, isDark && { backgroundColor: BG_DARK } ] }>
          <View style={ [ gStyle.container ] }>

             <View style={ [ styles.header ] }>
                <BackIcon to={ DashboardStackEnum.Main }/>
             </View>

             <View style={ [ gStyle.center, { flex: 1 } ] }>
                <UpdateProfileForm updateProfileFn={ updateProfileFn }/>
                <AuthSettings/>
             </View>

          </View>
       </View>
   );
}


const styles = StyleSheet.create( {
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
   edit: {
      color: "#7d7d7d",
      fontSize: 13,
   },
   logout: {
      position: "absolute",
      right: 20,
      top: 19,
      zIndex: 1
   },
} );

