import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { gStyle } from "../../asset";
import { Add, NoteItem } from "../../component";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addNoteService, getNotesService } from "../../service";
import { noteActions } from "../../redux/slice";

export function NotesScreen() {
   const { notes, searchKey } = useAppSelector(state => state.noteReducer)

   const dispatch = useAppDispatch()

   const handleChange = (value: string) => dispatch(noteActions.setSearchKey(value));

   const { addNoteFn } = addNoteService()

   getNotesService()

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>

         <View style={ [ styles.header ] }>

            <Add onPress={ addNoteFn }/>

            <TextInput onChangeText={ handleChange }
                       value={ searchKey }
                       placeholder={ 'Пошук' }
                       style={ [ gStyle.regular_font, gStyle.input ] }
            />

         </View>

         <View style={ [ styles.body ] }>
            <FlatList style={ styles.noteListWrapper }
                      data={ notes }
                      renderItem={ ({ item, index }) =>
                         <NoteItem key={ index + 1 } note={ item }/>
                      }/>
         </View>


      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      alignItems: 'center',
      paddingLeft: 20,
      gap: 10,
      flexDirection: 'row'
   },
   body: {
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   noteListWrapper: {
      width: "93%",
   },
})
