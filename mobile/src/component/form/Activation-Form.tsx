import { Text, TextInput, View } from "react-native";
import { gStyle } from "../../asset";
import { Button } from "../ui/Button";
import { useState } from "react";

interface IActivationFormProps {
   activationFn: (body: string) => Promise<void>
}

export function ActivationForm({ activationFn }: IActivationFormProps) {
   const [ value, setValue ] = useState<string>("");

   const handleChange = (value: string) => setValue(value);

   return (
      <View style={ gStyle.form_control_wrapper }>

         <Text style={ [ gStyle.regular_font, { fontSize: 16, fontWeight: '500' } ] }>
            Будь ласка, введіть код активації
         </Text>

         <TextInput onChangeText={ handleChange } value={ value }
                    style={ [ gStyle.regular_font, gStyle.input, gStyle.bottom_border, { textAlign: 'center' } ] }/>
         <Button title={ 'Надіслати' } isValid={ !!value } onPress={ () => activationFn(value) }/>

      </View>
   )
}

