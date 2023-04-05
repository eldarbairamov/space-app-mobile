import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { ADD_DISABLE_ICON, ADD_ICON } from "../../constant";

interface IAddProps {
   onPress: () => void,
   condition?: boolean
}

export function Add({ onPress, condition }: IAddProps) {
   return (
      <TouchableOpacity activeOpacity={ 0.5 }
                        style={ [ styles.add, gStyle.center ] }
                        onPress={ onPress }>
         <Image source={ condition ? ADD_DISABLE_ICON : ADD_ICON }
                style={ { width: 32, height: 32 } }/>

      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   add: {
      flexDirection: 'row',
      gap: 5
   },
})
