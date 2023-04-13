import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { gStyle } from "../../asset";
import { useAppDispatch, useAppSelector } from "../../hook";
import { configuration } from "../../config";
import { BG_DARK, DELETE_ICON_COLOR, ITEM_BG_DARK, MOMENTS_COLOR, NO_PHOTO, NO_PHOTO_DARK, SAVE_DARK, SAVE_DISABLE_DARK, SAVE_DISABLED_ICON, SAVE_ICON } from "../../constant";
import { deleteMomentService, momentPrevStateService, updateMomentService, uploadMomentPhotoService } from "../../service";
import { BackIcon } from "../../component";
import { MomentEditProps, MomentsStackEnum } from "../../navigation/type";
import { IMoment } from "../../interface";
import { momentActions } from "../../redux/slice";
import dateHelper from "moment/moment";
import DatePicker from "react-native-date-picker";
import { useState } from "react";

export function MomentEditScreen({ navigation }: MomentEditProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { activeMoment } = useAppSelector(state => state.momentReducer);

   const { pickImageHandler } = uploadMomentPhotoService(activeMoment.id);

   const { prevState, setPrevState } = momentPrevStateService(activeMoment);

   const { deleteMomentFn } = deleteMomentService(navigation.goBack);

   const dispatch = useAppDispatch();

   const handleInputs = (field: string, value: string) => {
      if (value.length <= 20) {
         const updatedMoment = {
            ...activeMoment,
            [field]: value,
         } as IMoment;

         dispatch(momentActions.setActiveMoment(updatedMoment));
      }
   };

   const { updateMomentFn } = updateMomentService(setPrevState);

   const handleTag = (value: string) => dispatch(momentActions.editTag(value));

   const [ isDatePickerOpen, setIsDatePickerOpen ] = useState(false);

   const lightModeSaveDisable = prevState === activeMoment ? SAVE_ICON : SAVE_DISABLED_ICON;
   const darkModeSaveDisable = prevState === activeMoment ? SAVE_DARK : SAVE_DISABLE_DARK;

   return (
      <>
         { activeMoment &&
            <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>

               <View style={ [ styles.header ] }>
                  <View style={ [ { flexDirection: "row", gap: 15 }, gStyle.center ] }>
                     <BackIcon to={ MomentsStackEnum.MomentList }/>

                     <TouchableOpacity activeOpacity={ 0.5 } onPress={ () => updateMomentFn(activeMoment) }>
                        <Image source={ isDark ? darkModeSaveDisable : lightModeSaveDisable }
                               style={ [ { width: 32, height: 32 } ] }/>
                     </TouchableOpacity>
                  </View>

                  <TouchableOpacity activeOpacity={ 0.5 } onPress={ () => deleteMomentFn(activeMoment.id) }>
                     <Image source={ DELETE_ICON_COLOR } style={ { width: 30, height: 30 } }/>
                  </TouchableOpacity>

               </View>

               <View style={ [ styles.body, gStyle.center, isDark && { backgroundColor: ITEM_BG_DARK } ] }>
                  <View style={ [ styles.absolute ] }>
                     <View
                        style={ [ activeMoment.photo ? styles.background_fx : null, gStyle.absolute ] }>
                     </View>

                     <View>
                        <Image style={ styles.photo_background }
                               blurRadius={ 10 }
                               source={ { uri: `${ configuration.API_URL }/${ activeMoment.photo }` } }/>
                     </View>
                  </View>

                  <View style={ [ gStyle.center, styles.top_line, ] }>
                     <TextInput placeholder={ "Назва моменту" }
                                value={ activeMoment.title }
                                maxLength={ 20 }
                                onChangeText={ value => handleInputs("title", value) }
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
                                   onChangeText={ value => handleInputs("location", value) }
                                   maxLength={ 20 }
                                   style={ [ gStyle.regular_font, styles.input ] }/>

                        <Pressable onPress={ () => setIsDatePickerOpen(true) }>
                           <Text style={ [ gStyle.regular_font, styles.input ] }>
                              { dateHelper(activeMoment.date).format("DD-MM-YYYY") }
                           </Text>
                        </Pressable>

                     </View>
                  </View>

                  <Pressable onPress={ pickImageHandler }>
                     { activeMoment.photo
                        ?
                        <Image style={ [ styles.photo ] }
                               source={ { uri: `${ configuration.API_URL }/${ activeMoment.photo }` } }/>
                        :
                        <View style={ [ gStyle.absolute_center, gStyle.center ] }>
                           <Image source={ isDark ? NO_PHOTO_DARK : NO_PHOTO }
                                  style={ [ { width: 50, height: 50 } ] }/>
                        </View>
                     }
                  </Pressable>

               </View>

               <DatePicker modal
                           open={ isDatePickerOpen }
                           date={ new Date(activeMoment.date) }
                           mode={ "date" }
                           onConfirm={ (date) => {
                              setIsDatePickerOpen(false);
                              dispatch(momentActions.setDate(new Date(date).getTime()));
                           } }
                           onCancel={ () => {
                              setIsDatePickerOpen(false);
                           } }
               />

            </View>
         }
      </>
   );
}

const styles = StyleSheet.create({
   header: {
      width: "100%",
      position: "absolute",
      top: 0,
      height: "5%",
      gap: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
   },
   input: {
      backgroundColor: "#24292e",
      color: "whitesmoke",
      padding: 5,
      paddingHorizontal: 10,
      minWidth: 100,
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
      paddingHorizontal: 20
   },
   bottom_line: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      left: 0,
   },
   wrapper: {
      backgroundColor: "#24292e",
      padding: 5,
      paddingHorizontal: 10,
   },
   photo: {
      zIndex: 20,
      width: 400,
      height: 400,
      borderRadius: 15,
   },
   absolute: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
   photo_background: {
      width: "100%",
      height: "100%",
   },
   background_fx: {
      backgroundColor: "black",
      opacity: 0.3,
      zIndex: 1
   },
});
