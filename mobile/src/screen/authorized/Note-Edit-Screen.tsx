import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import dateHelper from "moment";
import { useAppDispatch, useAppSelector } from "../../hook";
import { BG_DARK, FONT_ICON, FONT_ICON_DARK, ITEM_BG_DARK, MAIN_FONT_DARK, SAVE_DARK, SAVE_DISABLE_DARK, SAVE_DISABLED_ICON, SAVE_ICON, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { notePrevStateService, updateNoteService } from "../../service";
import { INote } from "../../interface";
import { noteActions } from "../../redux/slice";
import { BackIcon, SelectItem } from "../../component";
import { NotesStackEnum } from "../../navigation/type";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

export function NoteEditScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const [ fontStyle, setFontStyle ] = useState<"Regular" | "Handwrite">("Regular");

   const { activeNote } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const { prevState, setPrevState } = notePrevStateService(activeNote);

   const { updateNoteFn } = updateNoteService(setPrevState);

   const handleInputs = (field: string, value: string) => {
      if (value !== activeNote[field as keyof INote]) {
         const updatedNote = {
            ...activeNote,
            [field]: value,
            lastModified: Date.now(),
         };

         dispatch(noteActions.updateNote(updatedNote));
      }
   };

   const lightModeSaveDisable = prevState === activeNote ? SAVE_ICON : SAVE_DISABLED_ICON;
   const darkModeSaveDisable = prevState === activeNote ? SAVE_DARK : SAVE_DISABLE_DARK;

   const fontStyles = [ "Regular", "Handwrite" ];

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         <View style={ [ styles.header ] }>

            <View style={ [ { flexDirection: "row", gap: 15, alignItems: "center" } ] }>
               <BackIcon to={ NotesStackEnum.NoteList }/>

               <TouchableOpacity style={ [ { flexDirection: "row", gap: 10 } ] }
                                 activeOpacity={ 0.5 }
                                 onPress={ () => updateNoteFn(activeNote) }>

                  <Image source={ isDark ? darkModeSaveDisable : lightModeSaveDisable }
                         style={ [ { width: 32, height: 32 } ] }/>

               </TouchableOpacity>

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
            </View>

            <Text style={ [ gStyle.second_font, styles.date, isDark && { color: SECOND_FONT_DARK } ] }>
               { dateHelper(activeNote.lastModified).format("DD-MM-YYYY, HH:mm") }
            </Text>

         </View>

         <View style={ [ styles.body ] }>
            <TextInput style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK } ] }
                       maxLength={ 30 }
                       autoFocus={ false }
                       value={ activeNote.title }
                       placeholder={ "Заголовок" }
                       onChangeText={ value => handleInputs("title", value) }/>


            <TextInput placeholder={ "Розкажи мені щось цікаве..." }
                       placeholderTextColor={ isDark ? SECOND_FONT_DARK : SECOND_FONT_COLOR }
                       style={ [ fontStyle === "Handwrite" ? gStyle.handwriteForNote : gStyle.regular_font, { width: "90%", minHeight: "100%", marginTop: 10 }, isDark && { color: MAIN_FONT_DARK } ] }
                       autoFocus={ true }
                       value={ activeNote.body }
                       onChangeText={ (value) => handleInputs("body", value) }
                       multiline={ true }/>
         </View>

      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      justifyContent: "space-between",
   },
   body: {
      paddingTop: 20,
      gap: 15,
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   title: {
      fontSize: 18,
      fontWeight: "bold",
      width: 300,
      textAlign: "center",
   },
   date: {
      fontWeight: "bold",
   },
   dropdown: {
      height: 26,
      width: 100,
      borderRadius: 20,
   },
});
