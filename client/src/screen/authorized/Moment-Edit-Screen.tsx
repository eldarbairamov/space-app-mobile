import { View } from "react-native";
import { gStyle } from "../../asset";
import { useAppDispatch, useAppSelector } from "../../hook";
import { BG_DARK } from "../../constant";
import { momentActions } from "../../redux/slice";
import DatePicker from "react-native-date-picker";
import { useState } from "react";
import { MomentEditBody, MomentEditHeader } from "../../component";

export function MomentEditScreen() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { activeMoment } = useAppSelector( state => state.momentReducer );

   const dispatch = useAppDispatch();

   const [ isDatePickerOpen, setIsDatePickerOpen ] = useState( false );

   return (
       <>
          { activeMoment &&
              <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>

                  <MomentEditHeader/>

                  <MomentEditBody setIsDatePickerOpen={ setIsDatePickerOpen }/>

                  <DatePicker modal
                              open={ isDatePickerOpen }
                              date={ new Date( activeMoment.date ) }
                              mode={ "date" }
                              onConfirm={ ( date ) => {
                                 setIsDatePickerOpen( false );
                                 dispatch( momentActions.setDate( new Date( date ).getTime() ) );
                              } }
                              onCancel={ () => {
                                 setIsDatePickerOpen( false );
                              } }/>

              </View>
          }
       </>
   );
}

