import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { gStyle } from "../../asset";
import { CLEAR_ICON, CLEAR_ICON_DARK, ITEM_BG_DARK, MAIN_FONT_DARK, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { SelectItem } from "./Select-Item";
import { momentActions } from "../../redux/slice";
import { Dropdown } from "react-native-element-dropdown";
import { useAppDispatch, useAppSelector } from "../../hook";
import { TypedSetState } from "../../interface";

interface IMomentsScreenDropdownProps {
   dropdownValue: string,
   setDropdownValue: TypedSetState<string>,
   showClearIcon: boolean,
   setShowClearIcon: TypedSetState<boolean>,
   onClear: () => void
}

export function MomentsScreenDropdown({ dropdownValue, onClear, showClearIcon, setDropdownValue, setShowClearIcon }: IMomentsScreenDropdownProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const dispatch = useAppDispatch();

   const { tags } = useAppSelector(state => state.momentReducer);

   return (
      <Dropdown style={ [ styles.dropdown ] }
                placeholderStyle={ [ gStyle.second_font, isDark && { color: SECOND_FONT_DARK } ] }
                selectedTextStyle={ [ gStyle.regular_font, isDark && { color: MAIN_FONT_DARK } ] }
                activeColor={ isDark ? SECOND_FONT_COLOR : SECOND_FONT_DARK }
                itemContainerStyle={ { borderRadius: 5 } }
                renderItem={ (item) => <SelectItem> { item.label } </SelectItem> }
                containerStyle={ [ { borderRadius: 5, borderWidth: 0, overflow: "hidden" }, isDark && { backgroundColor: ITEM_BG_DARK } ] }
                iconStyle={ { tintColor: "#4e4e51" } }
                fontFamily={ "Roboto" }
                data={ tags.map(tag => ({ value: tag, label: tag })) }
                labelField={ "label" }
                valueField={ "value" }
                placeholder={ "фільтр" }
                value={ dropdownValue }
                renderRightIcon={ showClearIcon ? () =>
                      <TouchableOpacity activeOpacity={ 0.5 } onPress={ onClear }>
                         <Image source={ isDark ? CLEAR_ICON_DARK : CLEAR_ICON }
                                style={ { width: 15, height: 15, marginRight: 2 } }
                         />
                      </TouchableOpacity> :
                   undefined }
                onChange={ (item: any) => {
                   dispatch(momentActions.setSearchKey(item.value));
                   setDropdownValue(item.value);
                   setShowClearIcon(true);
                } }/>
   );
}

const styles = StyleSheet.create({
   dropdown: {
      height: 26,
      width: 100,
      borderColor: "#4e4e51",
   },
});
