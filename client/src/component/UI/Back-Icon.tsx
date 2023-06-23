import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BACK_ICON, BACK_ICON_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

interface IBackIcon {
   to: string;
}

export function BackIcon( { to }: IBackIcon ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { navigate } = useNavigation<any>();

   return (
       <TouchableOpacity onPress={ () => navigate( to ) }
                         activeOpacity={ 0.5 }>
          <Image style={ { width: 32, height: 32, } }
                 source={ isDark ? BACK_ICON_DARK : BACK_ICON }/>
       </TouchableOpacity>
   );
}
