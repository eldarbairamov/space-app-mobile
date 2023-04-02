import { Text, View } from "react-native";
import { gStyle } from "../../asset";
import { Button, Input } from "../../component";
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

         <Input onChange={ handleChange } value={ value } isCenter={ true } isBorder={ true }/>
         <Button title={ 'Надіслати' } isValid={ !!value } onPress={ () => activationFn(value) }/>

      </View>
   )
}

