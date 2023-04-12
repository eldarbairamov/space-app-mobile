import { Image, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { LOGOUT_ICON } from "../../constant";
import { logoutService } from "../../service";

export function LogoutIcon() {
   const { logoutFn } = logoutService()

   return (
      <TouchableOpacity style={ [ gStyle.center ] }
                        activeOpacity={ 0.5 }
                        onPress={ logoutFn }>
         <Image source={ LOGOUT_ICON }
                style={ { width: 28, height: 28 } }/>

      </TouchableOpacity>
   )
}
