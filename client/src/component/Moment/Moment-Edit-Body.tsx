import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { gStyle } from "../../asset";
import { ITEM_BG_DARK, MOMENTS_COLOR, NO_PHOTO, NO_PHOTO_DARK } from "../../constant";
import { configuration } from "../../config";
import dateHelper from "moment";
import { uploadMomentPhotoService } from "../../service";
import { IMoment, TypedSetState } from "../../interface";
import { momentActions } from "../../redux/slice";
import { useAppDispatch, useAppSelector, useDimension } from "../../hook";
import { MomentEditPhotoBg } from "./Moment-Edit-Photo-Bg";

export function MomentEditBody( { setIsDatePickerOpen }: { setIsDatePickerOpen: TypedSetState<boolean> } ) {
   const { activeMoment } = useAppSelector( state => state.momentReducer );
   const { isDark } = useAppSelector( state => state.appReducer );

   const dispatch = useAppDispatch();

   const { pickImageHandler } = uploadMomentPhotoService( activeMoment.id );

   const handleTag = ( value: string ) => dispatch( momentActions.editTag( value ) );

   const handleInputs = ( field: string, value: string ) => {
      if ( value.length <= 20 ) {
         const updatedMoment = {
            ...activeMoment,
            [field]: value,
         } as IMoment;

         dispatch( momentActions.setActiveMoment( updatedMoment ) );
      }
   };

   const { isTablet, isPhoneSmall } = useDimension();

   return (
       <View style={ [ styles.body, gStyle.center, isDark && { backgroundColor: ITEM_BG_DARK } ] }>
          <MomentEditPhotoBg/>

          <View style={ [ gStyle.center, styles.top_line, ] }>
             <TextInput placeholder={ "Назва моменту" }
                        value={ activeMoment.title }
                        maxLength={ 20 }
                        onChangeText={ value => handleInputs( "title", value ) }
                        style={ [ gStyle.regular_font, styles.input, { position: "absolute", top: 20, left: 20 } ] }/>
          </View>

          <View style={ [ gStyle.center, styles.bottom_line ] }>
             <TextInput placeholder={ "Тег" }
                        value={ activeMoment.tag }
                        onChangeText={ handleTag }
                        style={ [ styles.input, { minWidth: 50, position: "absolute", left: 20, bottom: 20, backgroundColor: MOMENTS_COLOR } ] }/>

             <View style={ [ { gap: 10 }, { position: "absolute", right: 20, bottom: 20 } ] }>
                <TextInput placeholder={ "Локація" }
                           value={ activeMoment.location }
                           onChangeText={ value => handleInputs( "location", value ) }
                           maxLength={ 20 }
                           style={ [ gStyle.regular_font, styles.input ] }/>

                <Pressable onPress={ () => setIsDatePickerOpen( true ) }>
                   <Text style={ [ gStyle.regular_font, styles.input ] }>
                      { dateHelper( activeMoment.date ).format( "DD-MM-YYYY" ) }
                   </Text>
                </Pressable>
             </View>
          </View>

          <Pressable onPress={ pickImageHandler }>
             { activeMoment.photo
                 ?
                 <Image
                     style={ [ styles.photo, isTablet && { height: 600, width: 600 }, isPhoneSmall && { height: 330, width: 330 } ] }
                     source={ { uri: `${ configuration.API_URL }/${ activeMoment.photo }` } }/>
                 :
                 <View style={ [ gStyle.absolute_center, gStyle.center ] }>
                    <Image source={ isDark ? NO_PHOTO_DARK : NO_PHOTO }
                           style={ [ { width: 50, height: 50 } ] }/>
                 </View>
             }
          </Pressable>

       </View>

   );
}

const styles = StyleSheet.create( {
   input: {
      backgroundColor: "#24292e",
      color: "whitesmoke",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 4,
      textAlign: "center"
   },
   body: {
      height: "85%",
      width: "100%",
   },
   top_line: {
      position: "absolute",
      flexDirection: "row",
      width: "100%",
      top: 0,
      left: 0,
      paddingHorizontal: 20,
      zIndex: 1
   },
   bottom_line: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 0,
      zIndex: 1
   },
   wrapper: {
      backgroundColor: "#24292e",
      padding: 5,
      paddingHorizontal: 10,
   },
   photo: {
      zIndex: 20,
      width: 360,
      height: 360,
      borderRadius: 15,
   },
} );

