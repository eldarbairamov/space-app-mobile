import { Image, TouchableOpacity } from "react-native";
import { MainScreenNavigationProp } from "../../type";
import { SETTINGS_ICON } from "../../constant";
import { useNavigation } from "@react-navigation/native";

export function SettingsIcon() {
   const { navigate } = useNavigation<MainScreenNavigationProp>()

   return (
      <TouchableOpacity onPress={ () => navigate('Settings') }
                        activeOpacity={ 0.5 }>
         <Image style={ { width: 28, height: 28, } } source={ SETTINGS_ICON }/>
      </TouchableOpacity>
   )
}
