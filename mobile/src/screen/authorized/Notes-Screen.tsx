import { FlatList, StyleSheet, View } from "react-native";
import { gStyle } from "../../asset";
import { Add, Input, NoteItem } from "../../component";
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

            <Input onChange={ handleChange }
                   value={ searchKey }
                   isCenter={ false }
                   placeholder={ 'Пошук' }/>

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
      paddingTop: "1%",
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   noteListWrapper: {
      width: "93%",
   },
})
