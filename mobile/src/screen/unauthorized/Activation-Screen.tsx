import { View } from "react-native";
import { ActivationForm } from "../../component";
import { ActivationProps, UnauthorizedStackEnum } from "../../type";
import { gStyle } from "../../asset";
import { activationService } from "../../service";

export function ActivationScreen({ navigation }: ActivationProps) {
   const { activationFn } = activationService(() => navigation.navigate(UnauthorizedStackEnum.Login))

   return (
      <View style={ [ gStyle.screen, gStyle.center ] }>
         <ActivationForm activationFn={ activationFn }/>
      </View>
   )
}
