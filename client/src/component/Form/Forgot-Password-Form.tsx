import { StyleSheet, Text, View } from "react-native";
import { gStyle } from "../../asset";
import { Button, FormControl } from "../../component";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../hook";
import { MAIN_FONT_DARK } from "../../constant";

interface IActivationFormProps {
   forgotPasswordFn: ( email: string ) => Promise<void>;
}

export function ForgotPasswordForm( { forgotPasswordFn }: IActivationFormProps ) {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { control, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>( { mode: "onTouched" } );

   const onSubmit = async ( data: { email: string } ) => forgotPasswordFn( data.email );

   return (
       <View style={ [ gStyle.center, gStyle.form_control_wrapper ] }>

          <Text style={ [ gStyle.regular_font, styles.description, isDark && { color: MAIN_FONT_DARK } ] }>
             Введіть адресу електронної пошти вашого аккаунту і ми пришлемо лист із подальшою інструкцією
          </Text>

          <FormControl control={ control }
                       name={ "email" }
                       isEmail={ true }
                       isRequired={ true }
                       isCenter={ true }
                       errorMessage={ errors.email?.message }/>

          <Button title={ "Надіслати" }
                  isValid={ isValid }
                  onPress={ handleSubmit( onSubmit ) }/>

       </View>
   );
}

const styles = StyleSheet.create( {
   description: {
      fontSize: 16,
      fontWeight: "500",
      width: 300,
      textAlign: "center"
   }
} );




