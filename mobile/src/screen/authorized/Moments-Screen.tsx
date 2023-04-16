import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { gStyle } from "../../asset";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addMomentService, getMomentsService } from "../../service";
import { BG_DARK, MOMENTS_COLOR, } from "../../constant";
import { Add, EmptyIcon, MomentItem, MomentsScreenDropdown } from "../../component";
import { useState } from "react";
import { momentActions } from "../../redux/slice";

export function MomentsScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { moments, searchKey } = useAppSelector(state => state.momentReducer);

   const { addMomentFn } = addMomentService();

   const { isLoading } = getMomentsService(searchKey);

   const [ value, setValue ] = useState("");
   const [ showClearIcon, setShowClearIcon ] = useState<boolean>(false);

   const dispatch = useAppDispatch();

   const onClear = () => {
      setShowClearIcon(false);
      setValue("");
      dispatch(momentActions.setSearchKey(""));
   };

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>

         { isLoading ? <ActivityIndicator size={ "large" } color={ MOMENTS_COLOR }/> :
            <>
               <View style={ [ styles.header ] }>
                  <Add onPress={ async () => {
                     await addMomentFn();
                     onClear();
                  } }/>
                  <MomentsScreenDropdown dropdownValue={ value }
                                         setShowClearIcon={ setShowClearIcon }
                                         showClearIcon={ showClearIcon }
                                         setDropdownValue={ setValue }
                                         onClear={ onClear }/>
               </View>

               <View style={ [ styles.body ] }>
                  { Boolean(moments.length)
                     ?
                     <FlatList style={ styles.momentListWrapper }
                               data={ moments }
                               renderItem={ ({ item, index }) =>
                                  <MomentItem key={ index + 1 } moment={ item }/> }/>
                     : <EmptyIcon/>
                  }
               </View>
            </>
         }

      </View>
   );
}

const styles = StyleSheet.create({
   header: {
      height: "5%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      gap: 10,
      flexDirection: "row"
   },
   body: {
      height: "95%",
      width: "100%",
      alignItems: "center",
   },
   momentListWrapper: {
      width: "93%",
   },
});
