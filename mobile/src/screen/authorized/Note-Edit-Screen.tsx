import { View } from "react-native";
import { gStyle } from "../../asset";
import { useAppSelector } from "../../hook";
import { BG_DARK } from "../../constant";
import { useState } from "react";
import { NoteEditBody, NoteEditHeader } from "../../component";

export function NoteEditScreen() {
   const { isDark } = useAppSelector(state => state.appReducer);

   const [ fontStyle, setFontStyle ] = useState<"Regular" | "Handwrite">("Regular");

   return (
      <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
         <NoteEditHeader setFontStyle={ setFontStyle }
                         fontStyle={ fontStyle }/>
         <NoteEditBody fontStyle={ fontStyle }/>
      </View>
   );
}

