import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { MAIN_FONT_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

interface IButtonProps {
   title: string,
   onPress?: any,
   isValid?: boolean
   btnWidth?: number
}

export function Button( { title, onPress, isValid, btnWidth = 250 }: IButtonProps ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   const lightModeDisable = isValid ? "#3D8DAE" : "#c1c1c1";
   const darkModeDisable = isValid ? "#3D8DAE" : "#35373c";

   return (
       <TouchableOpacity onPress={ onPress }
                         disabled={ !isValid }
                         style={ [ gStyle.border, gStyle.center, styles.container, { width: btnWidth }, { backgroundColor: isDark ? darkModeDisable : lightModeDisable } ] }
                         activeOpacity={ 0.5 }>
          <Text style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK } ] }>
             { title }
          </Text>
       </TouchableOpacity>
   );
}

const styles = StyleSheet.create( {
   container: {
      width: 250,
      padding: 10,
      borderRadius: 5,
      borderWidth: 0
   },
   title: {
      fontWeight: "bold",
      color: "whitesmoke"
   }
} );
