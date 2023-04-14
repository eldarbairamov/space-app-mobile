import { Modal, View } from "react-native";
import { gStyle } from "../../asset";
import { ReactNode } from "react";

interface IModal {
   isOpen: boolean;
   next: () => void;
   children: ReactNode;
}

export function MyModal({ isOpen, children }: IModal) {
   return (
      <Modal visible={ isOpen }
             animationType={ "fade" }>
         <View style={ [ gStyle.screen, gStyle.center ] }>
            { children }
         </View>
      </Modal>
   );
}
