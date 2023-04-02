import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BACK_ICON } from "../../constant";

interface IBackIcon {
   to: string
}

export function BackIcon({ to }: IBackIcon) {
   const { navigate } = useNavigation<any>()

   return (
      <TouchableOpacity onPress={ () => navigate(to) }
                        activeOpacity={ 0.5 }>
         <Image style={ { width: 28, height: 28, } } source={ BACK_ICON }/>
      </TouchableOpacity>
   )
}
