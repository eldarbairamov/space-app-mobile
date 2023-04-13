import { useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addMomentService, getMomentsService } from "../../service";
import { Dropdown } from "react-native-element-dropdown";
import { momentActions } from "../../redux/slice";
import { BG_DARK, CLEAR_ICON, ITEM_BG_DARK, MAIN_FONT_DARK, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { Add, MomentItem, SelectItem } from "../../component";
import { EmptyIcon } from "../../component/UI/Empty-Icon";

export function MomentsScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { moments, tags, searchKey } = useAppSelector(state => state.momentReducer);

   const { addMomentFn } = addMomentService();

   const dispatch = useAppDispatch();

   getMomentsService(searchKey);

   const [ value, setValue ] = useState("");
   const [ showClearIcon, setShowClearIcon ] = useState<boolean>(false);

   const onClear = () => {
      setShowClearIcon(false);
      setValue("");
      dispatch(momentActions.setSearchKey(""));
   };

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>

         <View style={ [ styles.header ] }>

            <Add onPress={ addMomentFn }/>

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
                      placeholder={ "Фільтр" }
                      value={ value }
                      renderRightIcon={ showClearIcon ? () =>
                            <TouchableOpacity activeOpacity={ 0.5 } onPress={ onClear }>
                               <Image source={ CLEAR_ICON }
                                      style={ { width: 15, height: 15, marginRight: 2 } }
                               />
                            </TouchableOpacity> :
                         undefined }
                      onChange={ (item: any) => {
                         dispatch(momentActions.setSearchKey(item.value));
                         setValue(item.value);
                         setShowClearIcon(true);
                      } }/>

         </View>

         <View style={ [ styles.body ] }>
            { Boolean(moments.length)
               ?
               <FlatList style={ styles.momentListWrapper }
                         data={ moments }
                         renderItem={ ({ item, index }) =>
                            <MomentItem key={ index + 1 } moment={ item }/> }/>
               : <EmptyIcon/>
            }
         </View>

      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      gap: 10,
      flexDirection: "row"
   },
   body: {
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   momentListWrapper: {
      width: "93%",
   },
   dropdown: {
      height: 26,
      width: 100,
      borderColor: "#4e4e51",
   },
   iconStyle: {
      width: 20,
      height: 20,
   },
});
