import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { ADD_DISABLE_ICON, ADD_DISABLE_ICON_DARK, ADD_ICON, ADD_ICON_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

interface IAddProps {
   onPress: () => void,
   condition?: boolean
}

export function Add({ onPress, condition }: IAddProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const lightCondition = condition ? ADD_DISABLE_ICON : ADD_ICON;
   const darkCondition = condition ? ADD_DISABLE_ICON_DARK : ADD_ICON_DARK;

   return (
      <TouchableOpacity activeOpacity={ 0.5 }
                        style={ [ styles.add, gStyle.center ] }
                        disabled={ condition }
                        onPress={ onPress }>
         <Image source={ isDark ? darkCondition : lightCondition }
                style={ { width: 32, height: 32 } }/>

      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   add: {
      flexDirection: "row",
      gap: 5
   },
});
