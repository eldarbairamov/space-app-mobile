import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import dateHelper from "moment";
import { useAppDispatch, useAppSelector } from "../../hook";
import { SAVE_DISABLE, SAVE_ENABLE } from "../../constant";
import { notePrevStateService, updateNoteService } from "../../service";
import { INote } from "../../interface";
import { noteActions } from "../../redux/slice";
import { BackIcon } from "../../component";
import { NotesStackEnum } from "../../type";

export function NoteEditScreen() {
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

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>
         <View style={ [ styles.header ] }>

            <View style={ { flexDirection: 'row', gap: 15 } }>
               <BackIcon to={ NotesStackEnum.NoteList }/>

               <TouchableOpacity style={ { flexDirection: 'row', gap: 10 } }
                                 activeOpacity={ 0.5 }
                                 onPress={ () => updateNoteFn(activeNote) }
               >
                  <Image source={ prevState === activeNote ? SAVE_DISABLE : SAVE_ENABLE }
                         style={ [ { width: 23, height: 23 } ] }
                  />

               </TouchableOpacity>
            </View>

            <Text style={ [ gStyle.second_font, styles.date ] }>
               { dateHelper(activeNote.lastModified).format("DD-MM-YYYY, HH:mm") }
            </Text>

         </View>

         <View style={ [ styles.body ] }>
            <TextInput style={ [ gStyle.regular_font, styles.title ] }
                       autoFocus={ false }
                       value={ activeNote.title }
                       placeholder={ 'Заголовок' }
                       onChangeText={ value => handleInputs('title', value) }
            />

            <TextInput placeholder={ 'Розкажи мені щось цікаве...' }
                       style={ [ gStyle.regular_font, { width: "90%", minHeight: "100%" } ] }
                       autoFocus={ false }
                       value={ activeNote.body }
                       onChangeText={ (value) => handleInputs('body', value) }
                       multiline={ true }
            />
         </View>

      </View>
   )
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      flexDirection: 'row',
      alignItems: "center",
      paddingHorizontal: 20,
      justifyContent: "space-between",
   },
   body: {
      paddingTop: "1%",
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
   }
})
