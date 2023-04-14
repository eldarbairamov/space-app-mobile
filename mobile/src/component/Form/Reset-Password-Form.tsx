import { View } from "react-native";
import { FormControl, Button } from "../../component";
import { useForm } from "react-hook-form";
import { IResetPassword, IResetPasswordForm } from "../../interface";
import { gStyle } from "../../asset";
import Toast from "react-native-toast-message";
import { resetPasswordService } from "../../service/auth/reset-password.service";
import { useNavigation } from "@react-navigation/native";
import { ForgotPasswordScreenNavigationProp, UnauthorizedStackEnum } from "../../navigation/type";

export function ResetPasswordForm() {
   const { navigate } = useNavigation<ForgotPasswordScreenNavigationProp>();
   const { control, handleSubmit, formState: { errors, isValid } } = useForm<IResetPasswordForm>({ mode: "onTouched" });

   const { resetPasswordFn } = resetPasswordService(() => navigate(UnauthorizedStackEnum.Login));

   const onSubmit = async ({ code, newPassword, repeatPassword }: IResetPassword) => {
      if (newPassword === repeatPassword) await resetPasswordFn(newPassword, code);
      else Toast.show({ type: "error", text1: "Паролі не співпадають" });
   };

   return (
      <View style={ [ gStyle.form_control_wrapper ] }>

         <FormControl label={ "6-значний код" }
                      control={ control }
                      name={ "code" }
                      errorMessage={ errors.code?.message }
                      isRequired={ true }/>

         <FormControl label={ "Новий пароль" }
                      control={ control }
                      name={ "newPassword" }
                      isPassword={ true }
                      errorMessage={ errors.newPassword?.message }
                      isRequired={ true }/>

         <FormControl label={ "Повторіть пароль" }
                      control={ control }
                      name={ "repeatPassword" }
                      isPassword={ true }
                      errorMessage={ errors.repeatPassword?.message }
                      isRequired={ true }/>

         <Button title={ "Змінити" }
                 isValid={ isValid }
                 onPress={ handleSubmit(onSubmit) }/>

      </View>);
}
