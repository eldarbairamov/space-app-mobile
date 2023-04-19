import { StyleSheet, TextInput, View } from "react-native";
import { gStyle } from "../../asset";
import { MAIN_FONT_DARK, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";
import { INote } from "../../interface";
import { noteActions } from "../../redux/slice";
import { useAppDispatch, useAppSelector } from "../../hook";

interface INoteEditBodyProps {
   fontStyle: string;
}

export function NoteEditBody({ fontStyle }: INoteEditBodyProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { activeNote } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

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

   return (
      <View style={ [ styles.body ] }>

         <View style={ [ { height: "10%" }, gStyle.center ] }>
            <TextInput style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK } ] }
                       maxLength={ 30 }
                       autoFocus={ false }
                       value={ activeNote.title }
                       placeholder={ "Заголовок" }
                       onChangeText={ value => handleInputs("title", value) }/>
         </View>

         <View style={ { height: "90%", width: "90%" } }>
            <TextInput placeholder={ "Розкажи мені щось цікаве..." }
                       placeholderTextColor={ isDark ? SECOND_FONT_DARK : SECOND_FONT_COLOR }
                       style={ [
                          fontStyle === "Handwrite" ? gStyle.handwriteForNote : gStyle.regular_font,
                          isDark && { color: MAIN_FONT_DARK },
                       ] }
                       autoFocus={ true }
                       value={ activeNote.body }
                       onChangeText={ (value) => handleInputs("body", value) }
                       multiline={ true }/>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   body: {
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
});
