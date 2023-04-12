import { Image, View } from "react-native";
import { gStyle } from "../../asset";
import { EMPTY_IMAGE } from "../../constant";

export function EmptyIcon() {
   return (
      <View style={ [ gStyle.center, gStyle.screen ] }>
         <Image source={ EMPTY_IMAGE } style={ { width: 60, height: 60 } }/>
      </View>
   )
}
