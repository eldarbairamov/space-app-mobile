import { Image, View } from "react-native";
import { gStyle } from "../../asset";
import { BG_DARK, EMPTY_DARK, EMPTY_IMAGE } from "../../constant";
import { useAppSelector } from "../../hook";

export function EmptyIcon() {
   const { isDark } = useAppSelector(state => state.appReducer);

   return (
      <View style={ [ gStyle.center, gStyle.screen, isDark && { backgroundColor: BG_DARK } ] }>
         <Image source={ isDark ? EMPTY_DARK : EMPTY_IMAGE }
                style={ { width: 60, height: 60 } }/>
      </View>
   );
}
