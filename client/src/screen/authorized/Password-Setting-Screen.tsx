import { StyleSheet, View } from "react-native";
import { gStyle } from "../../asset";
import { DashboardStackEnum } from "../../navigation/type";
import { BackIcon, ChangePasswordForm } from "../../component";
import { BG_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

export function PasswordSettingScreen() {
   const { isDark } = useAppSelector( state => state.appReducer );

   return (
       <View style={ [ gStyle.screen, isDark && { backgroundColor: BG_DARK } ] }>
          <View style={ [ gStyle.container ] }>

             <View style={ [ styles.header ] }>
                <BackIcon to={ DashboardStackEnum.Settings }/>
             </View>

             <View style={ [ gStyle.center, styles.forms, { flex: 1 } ] }>
                <ChangePasswordForm/>
             </View>

          </View>
       </View>
   );
}

const styles = StyleSheet.create( {
   header: {
      position: "absolute",
      height: "5%",
      width: "100%",
      alignItems: "center",
      paddingHorizontal: 20,
      flexDirection: "row"
   },
   forms: {
      justifyContent: "center",
      width: "100%",
      marginTop: 30,
      gap: 55
   },
} );
