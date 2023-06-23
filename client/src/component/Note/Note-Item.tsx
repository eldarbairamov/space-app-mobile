import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { DELETE_ICON, DELETE_ICON_DARK, ITEM_BG, ITEM_BG_DARK, MAIN_FONT_DARK, NOTES_COLOR } from "../../constant";
import { INote } from "../../interface";
import { deleteNoteService } from "../../service";
import { useNavigation } from "@react-navigation/native";
import { NoteListScreenNavigationProp, NotesStackEnum } from "../../navigation/type";
import dateHelper from "moment";
import { useAppDispatch, useAppSelector, useDimension } from "../../hook";
import { noteActions } from "../../redux/slice";

export function NoteItem( { note }: { note: INote } ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { total, searchKey } = useAppSelector( state => state.noteReducer );

   const { deleteNoteFn } = deleteNoteService();

   const { navigate } = useNavigation<NoteListScreenNavigationProp>();

   const dispatch = useAppDispatch();

   const openNote = () => {
      dispatch( noteActions.setActiveNote( note ) );
      navigate( NotesStackEnum.NoteEdit );
   };

   const { isTablet } = useDimension();

   return (
       <>
          { note &&
              <TouchableOpacity
                  style={ [ styles.noteItem, isDark && { backgroundColor: ITEM_BG_DARK }, isTablet && { width: "49.5%" } ] }
                  activeOpacity={ 0.7 }
                  onPress={ openNote }>

                  <View style={ [ styles.left ] }>

                      <Text style={ [ gStyle.regular_font, styles.title, isDark && { color: MAIN_FONT_DARK } ] }>
                         { note.title }
                      </Text>

                      <Text style={ [ gStyle.second_font, styles.noteBody, isDark && { color: MAIN_FONT_DARK }, ] }
                            ellipsizeMode={ "tail" }
                            numberOfLines={ 1 }>
                         { note.body }
                      </Text>

                      <Text style={ [ gStyle.regular_font, styles.date ] }>
                         { dateHelper( note.lastModified ).format( "DD-MM-YYYY, HH:mm" ) }
                      </Text>

                  </View>

                  <TouchableOpacity activeOpacity={ 0.5 }
                                    style={ [ gStyle.center, styles.right ] }
                                    onPress={ () => deleteNoteFn( note.id, total, searchKey ) }>

                      <Image source={ isDark ? DELETE_ICON_DARK : DELETE_ICON }
                             style={ { width: 28, height: 28 } }/>

                  </TouchableOpacity>

              </TouchableOpacity>
          }
       </>
   );
}

const styles = StyleSheet.create( {
   noteItem: {
      height: 120,
      padding: 20,
      flexDirection: "row",
      borderRadius: 15,
      backgroundColor: ITEM_BG,
      marginVertical: 5,
   },
   left: {
      width: "90%",
      justifyContent: "space-between",
      gap: 10
   },
   right: {
      width: "10%",
      alignItems: "flex-end"
   },
   title: {
      fontWeight: "bold"
   },
   noteBody: {
      fontSize: 14,
      width: "90%"
   },
   date: {
      color: NOTES_COLOR,
      fontSize: 12,
      fontWeight: "bold"
   }
} );
