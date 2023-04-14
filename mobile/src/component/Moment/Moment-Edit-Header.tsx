import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { BackIcon } from "../UI/Back-Icon";
import { MomentEditScreenNavigationProp, MomentsStackEnum } from "../../navigation/type";
import { DELETE_ICON_COLOR, SAVE_DARK, SAVE_DISABLE_DARK, SAVE_DISABLED_ICON, SAVE_ICON } from "../../constant";
import { deleteMomentService, momentPrevStateService, updateMomentService } from "../../service";
import { useAppSelector } from "../../hook";
import { useNavigation } from "@react-navigation/native";

export function MomentEditHeader() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { activeMoment } = useAppSelector(state => state.momentReducer);

   const { goBack } = useNavigation<MomentEditScreenNavigationProp>();

   const { prevState, setPrevState } = momentPrevStateService(activeMoment);

   const { deleteMomentFn } = deleteMomentService(goBack);

   const { updateMomentFn } = updateMomentService(setPrevState);

   const lightModeSaveDisable = prevState === activeMoment ? SAVE_DISABLED_ICON : SAVE_ICON;
   const darkModeSaveDisable = prevState === activeMoment ? SAVE_DISABLE_DARK : SAVE_DARK;

   return (
      <View style={ [ styles.header ] }>
         <View style={ [ { flexDirection: "row", gap: 15 }, gStyle.center ] }>
            <BackIcon to={ MomentsStackEnum.MomentList }/>

            <TouchableOpacity activeOpacity={ 0.5 }
                              disabled={ prevState === activeMoment }
                              onPress={ () => updateMomentFn(activeMoment) }>
               <Image source={ isDark ? darkModeSaveDisable : lightModeSaveDisable }
                      style={ [ { width: 32, height: 32 } ] }/>
            </TouchableOpacity>
         </View>

         <TouchableOpacity activeOpacity={ 0.5 }
                           onPress={ () => deleteMomentFn(activeMoment.id) }>
            <Image source={ DELETE_ICON_COLOR }
                   style={ { width: 30, height: 30 } }/>
         </TouchableOpacity>

      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      width: "100%",
      position: "absolute",
      top: 0,
      height: "5%",
      gap: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
   },
});
