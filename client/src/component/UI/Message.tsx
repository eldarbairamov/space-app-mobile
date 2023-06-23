import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { gStyle } from "../../asset";
import { BG_DARK, MAIN_FONT_DARK, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { Button } from "./Button";
import { useAppSelector } from "../../hook";

interface IMessageProps {
   nextFn?: () => void,
   image: ImageSourcePropType,
   title: string,
   message: string,
   buttonTitle: string
}

export function Message( { nextFn, image, message, title, buttonTitle }: IMessageProps ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   return (
       <View style={ [ gStyle.screen, gStyle.center, { gap: 40 }, isDark && { backgroundColor: BG_DARK } ] }>
          <Image source={ image } style={ { height: 100, width: 100 } }/>

          <View style={ [ { width: 300, gap: 5 } ] }>
             <Text style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK } ] }>
                { title }
             </Text>
             <Text style={ [ gStyle.regular_font, styles.message, isDark && { color: SECOND_FONT_DARK } ] }>
                { message }
             </Text>
          </View>

          <Button title={ buttonTitle }
                  isValid={ true }
                  onPress={ nextFn }/>
       </View>
   );
}

const styles = StyleSheet.create( {
   title: { textAlign: "center", fontSize: 20, fontWeight: "500" },
   message: { textAlign: "center", color: SECOND_FONT_COLOR }
} );
