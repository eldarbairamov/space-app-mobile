import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";

interface IButtonProps {
   title: string,
   onPress?: any,
   isValid?: boolean
   btnWidth?: number
}

export function Button({ title, onPress, isValid, btnWidth = 250 }: IButtonProps) {
   const styles = StyleSheet.create({
      container: {
         width: 250,
         padding: 10,
         backgroundColor: isValid ? "#24292e" : "#c1c1c1",
         borderRadius: 5,
         borderWidth: 0
      },
      title: {
         color: "whitesmoke",
         fontWeight: "bold",
      }
   })

   return (
      <TouchableOpacity onPress={ onPress }
                        disabled={ !isValid }
                        style={ [ gStyle.border, gStyle.center, styles.container, { width: btnWidth } ] }
                        activeOpacity={ 0.5 }>
         <Text style={ [ gStyle.regular_font, styles.title ] }> { title } </Text>
      </TouchableOpacity>
   )
}


