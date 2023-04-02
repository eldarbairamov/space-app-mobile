import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { gStyle } from "../../asset";
import { SECOND_FONT_COLOR } from "../../constant";
import { Button } from "./Button";

interface IMessageProps {
   nextFn: () => void,
   image: ImageSourcePropType,
   title: string,
   message: string,
   buttonTitle: string
}

export function Message({ nextFn, image, message, title, buttonTitle }: IMessageProps) {
   return (
      <View style={ [ gStyle.screen, gStyle.center, { gap: 40 } ] }>
         <Image source={ image } style={ { height: 100, width: 100 } }/>

         <View style={ [ { width: 300, gap: 5 } ] }>
            <Text style={ [ gStyle.regular_font, styles.title ] }>
               { title }
            </Text>
            <Text style={ [ gStyle.regular_font, styles.message ] }>
               { message }
            </Text>
         </View>

         <Button title={ buttonTitle } isValid={ true } onPress={ nextFn }/>
      </View>
   )
}

const styles = StyleSheet.create({
   title: { textAlign: 'center', fontSize: 20, fontWeight: '500' },
   message: { textAlign: 'center', color: SECOND_FONT_COLOR }
})
