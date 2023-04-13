import { StyleSheet, View } from "react-native";
import { gStyle } from "../../asset";
import { DashboardStackEnum } from "../../navigation/type";
import { BackIcon, ChangeEmailForm } from "../../component";
import { BG_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

export function EmailSettingScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <View style={ [ gStyle.screen, isDark && { backgroundColor: BG_DARK } ] }>
         <View style={ [ gStyle.container ] }>

            <View style={ [ styles.header ] }>
               <BackIcon to={ DashboardStackEnum.Settings }/>
            </View>

            <View style={ [ gStyle.center, styles.form, { flex: 1 } ] }>
               <ChangeEmailForm/>
            </View>

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
      paddingHorizontal: 20,
      flexDirection: "row"
   },
   form: {
      justifyContent: "center",
      width: "100%",
      gap: 55
   },
});
