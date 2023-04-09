import { View } from "react-native";
import { FormControl, Button } from "../../component";
import { useForm } from "react-hook-form";
import { IChangePasswordForm } from "../../interface";
import { gStyle } from "../../asset";
import { changePasswordService } from "../../service";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { DashboardStackEnum, PasswordSettingScreenNavigationProp } from "../../navigation/type";

export function ChangePasswordForm() {
   const {
      control,
      handleSubmit,
      formState: { errors, isValid }
   } = useForm<IChangePasswordForm>({ mode: "onTouched" });

   const { navigate } = useNavigation<PasswordSettingScreenNavigationProp>()

   const { updatePasswordFn } = changePasswordService(() => navigate(DashboardStackEnum.ChangePasswordMessage))

   const onSubmit = async (data: IChangePasswordForm) => {
      console.log(data)

      const newPassword = data.password;
      const currentPassword = data.current_password;
      const repeatPassword = data.repeat_password;

      if (newPassword === repeatPassword) {
         await updatePasswordFn(newPassword, currentPassword);
      } else {
         Toast.show({ type: 'error', text1: 'Паролі не співпадають' })
      }
   }

   return (
      <View style={ gStyle.form_control_wrapper }>
         <FormControl label={ 'Поточний пароль' }
                      control={ control }
                      name={ 'current_password' }
                      isPassword={ true }
                      errorMessage={ errors.current_password?.message }
                      isRequired={ true }/>

         <FormControl label={ 'Новий пароль' }
                      control={ control }
                      name={ 'password' }
                      isPassword={ true }
                      errorMessage={ errors.password?.message }
                      isRequired={ true }/>

         <FormControl label={ 'Повторіть пароль' }
                      control={ control }
                      name={ 'repeat_password' }
                      isPassword={ true }
                      errorMessage={ errors.repeat_password?.message }
                      isRequired={ true }/>

         <Button title={ 'Змінити' } isValid={ isValid } onPress={ handleSubmit(onSubmit) }/>
      </View>)
}
