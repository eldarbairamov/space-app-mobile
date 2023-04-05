import { Image, TouchableOpacity } from "react-native";
import { MainScreenNavigationProp } from "../../navigation/type";
import { SETTINGS_ICON } from "../../constant";
import { useNavigation } from "@react-navigation/native";

export function SettingsIcon() {
   const { navigate } = useNavigation<MainScreenNavigationProp>()

   return (
      <TouchableOpacity onPress={ () => navigate('Settings') }
                        activeOpacity={ 0.5 }>
         <Image style={ { width: 27, height: 27, } } source={ SETTINGS_ICON }/>
      </TouchableOpacity>
   )
}
