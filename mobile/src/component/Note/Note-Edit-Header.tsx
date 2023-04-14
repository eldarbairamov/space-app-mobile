import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BackIcon } from "../UI/Back-Icon";
import { NotesStackEnum } from "../../navigation/type";
import { NoteEditDropdown } from "../UI/Note-Edit-Dropdown";
import { gStyle } from "../../asset";
import { SAVE_DARK, SAVE_DISABLE_DARK, SAVE_DISABLED_ICON, SAVE_ICON, SECOND_FONT_DARK } from "../../constant";
import dateHelper from "moment/moment";
import { useAppSelector } from "../../hook";
import { notePrevStateService, updateNoteService } from "../../service";
import { TypedSetState } from "../../interface";

interface INoteEditHeaderProps {
   setFontStyle: TypedSetState<"Regular" | "Handwrite">,
   fontStyle: string
}

export function NoteEditHeader({ setFontStyle, fontStyle }: INoteEditHeaderProps) {
   const { activeNote } = useAppSelector(state => state.noteReducer);

   const { isDark } = useAppSelector(state => state.appReducer);

   const { prevState, setPrevState } = notePrevStateService(activeNote);

   const { updateNoteFn } = updateNoteService(setPrevState);

   const lightModeSaveDisable = prevState === activeNote ? SAVE_DISABLED_ICON : SAVE_ICON;
   const darkModeSaveDisable = prevState === activeNote ? SAVE_DISABLE_DARK : SAVE_DARK;

   return (
      <View style={ [ styles.header ] }>

         <View style={ [ { flexDirection: "row", gap: 15, alignItems: "center" } ] }>
            <BackIcon to={ NotesStackEnum.NoteList }/>

            <TouchableOpacity style={ [ { flexDirection: "row", gap: 10 } ] }
                              activeOpacity={ 0.5 }
                              disabled={prevState === activeNote}
                              onPress={ () => updateNoteFn(activeNote) }>

               <Image source={ isDark ? darkModeSaveDisable : lightModeSaveDisable }
                      style={ [ { width: 32, height: 32 } ] }/>

            </TouchableOpacity>

            <NoteEditDropdown setFontStyle={ setFontStyle }
                              fontStyle={ fontStyle }/>

         </View>

         <Text style={ [ gStyle.second_font, styles.date, isDark && { color: SECOND_FONT_DARK } ] }>
            { dateHelper(activeNote.lastModified).format("DD-MM-YYYY, HH:mm") }
         </Text>

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
   date: {
      fontWeight: "bold",
   },
});
