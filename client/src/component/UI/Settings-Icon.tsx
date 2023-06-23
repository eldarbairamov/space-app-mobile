import { Image, TouchableOpacity } from "react-native";
import { MainScreenNavigationProp } from "../../navigation/type";
import { SETTINGS_ICON, SETTINGS_ICON_DARK } from "../../constant";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../hook";

export function SettingsIcon() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { navigate } = useNavigation<MainScreenNavigationProp>();

   return (
       <TouchableOpacity onPress={ () => navigate( "Settings" ) }
                         activeOpacity={ 0.5 }>
          <Image style={ { width: 27, height: 27, } }
                 source={ isDark ? SETTINGS_ICON_DARK : SETTINGS_ICON }/>

       </TouchableOpacity>
   );
}
