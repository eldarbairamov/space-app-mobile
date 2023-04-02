import { Image, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { LOGOUT_ICON } from "../../constant";
import { logoutService } from "../../service";

export function Logout() {
   const { logoutFn } = logoutService()

   return (
      <TouchableOpacity style={ [ gStyle.center ] }
                        activeOpacity={ 0.5 }
                        onPress={ logoutFn }
      >
         <Image source={ LOGOUT_ICON }
                style={ { width: 30, height: 30 } }
         />

      </TouchableOpacity>
   )
}
