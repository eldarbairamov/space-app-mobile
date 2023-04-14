import { StyleSheet, Switch } from "react-native";
import { PLANS_COLOR, SECOND_FONT_DARK } from "../../constant";
import { useTheme } from "../../hook";

export function SwitchButton() {
   const { isEnabled, toggleSwitch } = useTheme();

   return (
      <Switch style={ [ styles.switch ] }
              onValueChange={ toggleSwitch }
              value={ isEnabled }
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
