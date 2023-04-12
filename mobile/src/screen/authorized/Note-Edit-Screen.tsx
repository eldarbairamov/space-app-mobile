import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import dateHelper from "moment";
import { useAppDispatch, useAppSelector } from "../../hook";
import { FONT_ICON, SAVE_DISABLE, SAVE_ENABLE } from "../../constant";
import { notePrevStateService, updateNoteService } from "../../service";
import { INote } from "../../interface";
import { noteActions } from "../../redux/slice";
import { BackIcon, SelectItem } from "../../component";
import { NotesStackEnum } from "../../navigation/type";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

export function NoteEditScreen() {
   const [ fontStyle, setFontStyle ] = useState<"Regular" | "Handwrite">("Regular")

   const { activeNote } = useAppSelector(state => state.noteReducer)

   const dispatch = useAppDispatch()

   const { prevState, setPrevState } = notePrevStateService(activeNote)

   const { updateNoteFn } = updateNoteService(setPrevState)

   const handleInputs = (field: string, value: string) => {
      if (value !== activeNote[field as keyof INote]) {
         const updatedNote = {
            ...activeNote,
            [field]: value,
            lastModified: Date.now(),
         };

         dispatch(noteActions.updateNote(updatedNote))
      }
   };

   const fontStyles = [ "Regular", "Handwrite" ]

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>
         <View style={ [ styles.header ] }>

            <View style={ [ { flexDirection: "row", gap: 15, alignItems: "center" } ] }>
               <BackIcon to={ NotesStackEnum.NoteList }/>

               <TouchableOpacity style={ [ { flexDirection: "row", gap: 10 } ] }
                                 activeOpacity={ 0.5 }
                                 onPress={ () => updateNoteFn(activeNote) }>
                  <Image source={ prevState === activeNote ? SAVE_DISABLE : SAVE_ENABLE }
                         style={ [ { width: 26, height: 26 } ] }/>

               </TouchableOpacity>

               <Dropdown style={ [ styles.dropdown ] }
                         placeholderStyle={ gStyle.second_font }
                         selectedTextStyle={ { display: "none" } }
                         activeColor={ "#e3e3e3" }
                         renderItem={ (item) => <SelectItem> { item.label } </SelectItem> }
                         containerStyle={ { borderRadius: 5 } }
                         iconStyle={ { display: "none" } }
                         fontFamily={ "Roboto" }
                         data={ fontStyles.map(font => ({ value: font, label: font })) }
                         labelField={ "label" }
                         value={ fontStyle }
                         valueField={ "value" }
                         placeholder={ "" }
                         renderLeftIcon={ () =>
                            <Image source={ FONT_ICON }
                                   style={ { width: 18, height: 18, marginRight: 5 } }/> }
                         onChange={ (item: any) => setFontStyle(item.value) }/>
            </View>

            <Text style={ [ gStyle.second_font, styles.date ] }>
               { dateHelper(activeNote.lastModified).format("DD-MM-YYYY, HH:mm") }
            </Text>

         </View>

         <View style={ [ styles.body ] }>
            <TextInput style={ [ gStyle.regular_font, styles.title ] }
                       maxLength={ 30 }
                       autoFocus={ false }
                       value={ activeNote.title }
                       placeholder={ "Заголовок" }
                       onChangeText={ value => handleInputs("title", value) }/>


            <TextInput placeholder={ "Розкажи мені щось цікаве..." }
                       style={ [ fontStyle === "Handwrite" ? gStyle.handwriteForNote : gStyle.regular_font, { width: "90%", minHeight: "100%", marginTop: 10 } ] }
                       autoFocus={ true }
                       value={ activeNote.body }
                       onChangeText={ (value) => handleInputs("body", value) }
                       multiline={ true }/>
         </View>

      </View>
   )
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
      borderColor: "#4e4e51",
   },
})
