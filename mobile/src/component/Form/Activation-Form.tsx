import { StyleSheet, Text, TextInput, View } from "react-native";
import { gStyle } from "../../asset";
import { Button } from "../UI/Button";
import { useState } from "react";

interface IActivationFormProps {
   activationFn: (body: string) => Promise<void>
}

export function ActivationForm({ activationFn }: IActivationFormProps) {
   const [ value, setValue ] = useState<string>("");

   const handleChange = (value: string) => setValue(value);

   return (
      <View>
         <View style={ styles.message }>
            <Text style={ [ gStyle.regular_font, { fontSize: 16, fontWeight: "500" } ] }>
               Ви успішно зареєструвались.
            </Text>
            <Text style={ [ gStyle.regular_font, { fontSize: 16, fontWeight: "500" } ] }>
               Введіть код активації, який щойно прилетів на вашу електронну пошту:
            </Text>
         </View>

         <View style={ gStyle.form_control_wrapper }>
            <TextInput onChangeText={ handleChange }
                       value={ value }
                       style={ [ gStyle.regular_font, gStyle.input, gStyle.bottom_border, { textAlign: "center", minWidth: 300 } ] }/>
            <Button title={ "Активувати" } isValid={ !!value } onPress={ () => activationFn(value) } btnWidth={ 300 }/>

         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   message: {
      alignItems: "center",
      width: 300,
      marginBottom: 40
   }
})

