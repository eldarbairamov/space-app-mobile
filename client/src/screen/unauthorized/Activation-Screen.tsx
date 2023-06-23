import { View } from "react-native";
import { ActivationForm } from "../../component";
import { ActivationProps, UnauthorizedStackEnum } from "../../navigation/type";
import { gStyle } from "../../asset";
import { activationService } from "../../service";
import { useAppSelector } from "../../hook";
import { BG_DARK } from "../../constant";

export function ActivationScreen( { navigation }: ActivationProps ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { activationFn } = activationService( () => navigation.navigate( UnauthorizedStackEnum.Login ) );

   return (
       <View style={ [ gStyle.screen, gStyle.center, isDark && { backgroundColor: BG_DARK } ] }>
          <ActivationForm activationFn={ activationFn }/>
       </View>
   );
}
