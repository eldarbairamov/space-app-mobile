import { StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { FormControl, Button } from "../../component";
import { gStyle } from "../../asset";
import { useState } from "react";

export function ChangeEmailForm() {
   const {
      control,
      handleSubmit,
      formState: { errors, isValid }
   } = useForm<{ email: string, code: string }>({ mode: "onTouched" });

   const [ isEmailSent, setIsEmailSent ] = useState<boolean>(false)

   const onSubmit = (data: any) => setIsEmailSent(true)

   return (
      <View style={ { gap: !isEmailSent ? 80 : 50 } }>

         <View style={ gStyle.form_control_wrapper }>
            <Text style={ [ gStyle.regular_font, styles.description ] }>
               Введіть адресу електронної пошти вашого аккаунту і ми пришлемо лист із подальшою інструкцією
            </Text>

            <FormControl isRequired={ true }
                         control={ control }
                         isCenter={ true }
                         errorMessage={ errors.email?.message }
                         isEmail={ true }
                         isChangeValueOff={ isEmailSent }
                         name={ 'email' }/>

            { !isEmailSent && <Button title={ 'Надіслати' } isValid={ isValid } onPress={ handleSubmit(onSubmit) }/> }
         </View>

         { isEmailSent && <View style={ gStyle.form_control_wrapper }>
            <FormControl label={ '6-значний код' }
                         control={ control }
                         name={ 'code' }
                         errorMessage={ errors.code?.message }
                         isRequired={ true }/>

            <Button title={ 'Змінити' } isValid={ isValid } onPress={ handleSubmit(onSubmit) }/>
         </View> }

      </View>
   )
}

const styles = StyleSheet.create({
   description: {
      fontSize: 16,
      fontWeight: "500",
      width: 300,
      textAlign: 'center',
   }
})
