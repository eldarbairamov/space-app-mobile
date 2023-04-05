import { StyleSheet, Text, View } from "react-native";
import { ReactNode } from "react";

export function SelectItem({ children }: { children: ReactNode }) {
   return (
      <View style={ [ styles.container ] }>
         <Text>
            { children }
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: 30,
      justifyContent: 'center',
      paddingHorizontal: 5
   }
})
