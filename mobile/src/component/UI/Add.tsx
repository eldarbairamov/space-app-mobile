import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { ADD_ICON } from "../../constant";

interface IAddProps {
   onPress: () => void
}

export function Add({ onPress }: IAddProps) {
   return (
      <TouchableOpacity activeOpacity={ 0.5 }
                        style={ [ styles.add, gStyle.center ] }
                        onPress={ onPress }
      >
         <Image source={ ADD_ICON }
                style={ { width: 28, height: 28 } }
         />

      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   add: {
      flexDirection: 'row',
      gap: 5
   },
})
