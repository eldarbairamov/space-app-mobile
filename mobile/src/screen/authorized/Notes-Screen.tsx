import { ActivityIndicator, FlatList, StyleSheet, TextInput, View } from "react-native";
import { gStyle } from "../../asset";
import { Add, EmptyIcon, NoteItem } from "../../component";
import { useAppDispatch, useAppSelector, useDimension } from "../../hook";
import { addNoteService, getNotesService } from "../../service";
import { noteActions } from "../../redux/slice";
import { BG_DARK, MAIN_FONT_DARK, NOTES_COLOR, SECOND_FONT_COLOR, SECOND_FONT_DARK } from "../../constant";

export function NotesScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { notes, searchKey } = useAppSelector(state => state.noteReducer);

   const dispatch = useAppDispatch();

   const handleChange = (value: string) => dispatch(noteActions.setSearchKey(value));

   const { addNoteFn } = addNoteService();

   const { isLoading } = getNotesService();

   const { isTablet } = useDimension();

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>

         { isLoading ? <ActivityIndicator size={ "large" } color={ NOTES_COLOR }/> :
            <>
               <View style={ [ styles.header ] }>

                  <Add onPress={ addNoteFn }/>

                  <TextInput onChangeText={ handleChange }
                             value={ searchKey }
                             placeholder={ "Пошук" }
                             placeholderTextColor={ isDark ? SECOND_FONT_DARK : SECOND_FONT_COLOR }
                             style={ [ gStyle.regular_font, gStyle.input, isDark && { color: MAIN_FONT_DARK } ] }/>
               </View>

               <View style={ [ styles.body ] }>
                  { Boolean(notes.length)
                     ?
                     <FlatList style={ [ styles.noteListWrapper ] }
                               columnWrapperStyle={ isTablet && { justifyContent: "space-between" } }
                               numColumns={ isTablet ? 2 : 1 }
                               data={ notes }
                               renderItem={ ({ item, index }) =>
                                  <NoteItem key={ index + 1 } note={ item }/> }/>
                     :
                     <EmptyIcon/>
                  }
               </View>
            </>
         }

      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      height: 50,
      width: "100%",
      alignItems: "center",
      paddingLeft: 20,
      gap: 10,
      flexDirection: "row"
   },
   body: {
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   noteListWrapper: {
      width: "93%",
   },
});
