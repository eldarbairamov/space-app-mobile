import { Image, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { LOGOUT_ICON, LOGOUT_ICON_DARK } from "../../constant";
import { logoutService } from "../../service";
import { useAppSelector } from "../../hook";

export function LogoutIcon() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { logoutFn } = logoutService();

   return (
       <TouchableOpacity style={ [ gStyle.center ] }
                         activeOpacity={ 0.5 }
                         onPress={ logoutFn }>
          <Image source={ isDark ? LOGOUT_ICON_DARK : LOGOUT_ICON }
                 style={ { width: 28, height: 28 } }/>

       </TouchableOpacity>
   );
}
