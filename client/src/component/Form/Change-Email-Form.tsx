import { StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { FormControl, Button } from "../../component";
import { gStyle } from "../../asset";
import { changeEmailService } from "../../service/user/change-email.service";
import { emailConfirmationService } from "../../service/user/email-confirmation.service";
import { useNavigation } from "@react-navigation/native";
import { DashboardStackEnum, EmailSettingScreenNavigationProp } from "../../navigation/type";
import { SECOND_FONT_DARK } from "../../constant";
import { useAppSelector } from "../../hook";

export function ChangeEmailForm() {
   const { isDark } = useAppSelector( state => state.appReducer );

   const { control, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string, code: string }>( { mode: "onTouched" } );

   const { navigate } = useNavigation<EmailSettingScreenNavigationProp>();

   const { changeEmailFn, isEmailSent } = changeEmailService();
   const { confirmEmailFn } = emailConfirmationService( () => navigate( DashboardStackEnum.ChangeEmailMessage ) );

   const handleNewEmailRequest = async ( { email }: { email: string } ) => changeEmailFn( email );
   const handleNewEmailConfirmation = async ( { code }: { code: string } ) => confirmEmailFn( code );

   return (
       <View style={ { gap: !isEmailSent ? 80 : 50 } }>

          <View style={ gStyle.form_control_wrapper }>
             <Text style={ [ gStyle.regular_font, styles.description, isDark && { color: SECOND_FONT_DARK } ] }>
                Введіть нову адресу електронної пошти і ми пришлемо вам лист із подальшою інструкцією
             </Text>

             <FormControl isRequired={ true }
                          control={ control }
                          isCenter={ true }
                          errorMessage={ errors.email?.message }
                          isEmail={ true }
                          isChangeValueOff={ isEmailSent }
                          name={ "email" }/>

             { !isEmailSent &&
                 <Button title={ "Надіслати" }
                         isValid={ isValid }
                         onPress={ handleSubmit( handleNewEmailRequest ) }/> }
          </View>

          { isEmailSent && <View style={ gStyle.form_control_wrapper }>
              <Text style={ [ gStyle.regular_font, styles.description, isDark && { color: SECOND_FONT_DARK } ] }>
                  Введіть код:
              </Text>

              <FormControl control={ control }
                           name={ "code" }
                           isCenter={ true }
                           errorMessage={ errors.code?.message }
                           isRequired={ true }/>

              <Button title={ "Змінити" }
                      isValid={ isValid }
                      onPress={ handleSubmit( handleNewEmailConfirmation ) }/>
          </View> }

       </View>
   );
}

const styles = StyleSheet.create( {
   description: {
      fontSize: 16,
      fontWeight: "500",
      width: 300,
      textAlign: "center",
   }
} );
