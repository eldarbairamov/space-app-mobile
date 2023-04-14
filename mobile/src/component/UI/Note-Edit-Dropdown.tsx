import { Dropdown } from "react-native-element-dropdown";
import { FONT_ICON, FONT_ICON_DARK, ITEM_BG_DARK, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { SelectItem } from "./Select-Item";
import { Image, StyleSheet } from "react-native";
import { TypedSetState } from "../../interface";
import { useAppSelector } from "../../hook";

interface INoteEditDropdownProps {
   setFontStyle: TypedSetState<"Regular" | "Handwrite">,
   fontStyle: string
}

export function NoteEditDropdown({ setFontStyle, fontStyle }: INoteEditDropdownProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const fontStyles = [ "Regular", "Handwrite" ];

   return (
      <Dropdown style={ [ styles.dropdown ] }
                selectedTextStyle={ { display: "none" } }
                activeColor={ isDark ? SECOND_FONT_COLOR : SECOND_FONT_DARK }
                renderItem={ (item) => <SelectItem> { item.label } </SelectItem> }
                itemContainerStyle={ { borderRadius: 5 } }
                containerStyle={ [ { borderRadius: 5, borderWidth: 0, overflow: "hidden" }, isDark && { backgroundColor: ITEM_BG_DARK } ] }
                iconStyle={ { display: "none" } }
                fontFamily={ "Roboto" }
                data={ fontStyles.map(font => ({ value: font, label: font })) }
                value={ fontStyle }
                labelField={ "label" }
                valueField={ "value" }
                placeholder={ "" }
                renderLeftIcon={ () =>
                   <Image source={ isDark ? FONT_ICON_DARK : FONT_ICON }
                          style={ { width: 18, height: 18, marginLeft: 5 } }/> }
                onChange={ (item: any) => setFontStyle(item.value) }/>
   );
}

const styles = StyleSheet.create({
   dropdown: {
      height: 26,
      width: 100,
      borderRadius: 20,
   },
});
