import { StyleSheet, Switch } from "react-native";
import { PLANS_COLOR, SECOND_FONT_DARK } from "../../constant";
import { useSwitch } from "../../hook";

export function SwitchButton() {
   const { isDark, toggleSwitch } = useSwitch();

   return (
      <Switch style={ [ styles.switch ] }
              onValueChange={ toggleSwitch }
              value={ isDark }
              ios_backgroundColor={ SECOND_FONT_DARK }
              trackColor={ { true: PLANS_COLOR } }/>
   );
}

const styles = StyleSheet.create({
   switch: {
      marginLeft: -8,
      transform: [
         { scaleX: .7 },
         { scaleY: .7 }
      ],
   },
});
