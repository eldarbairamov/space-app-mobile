import { View } from "react-native";
import { FormControl, Button } from "../../component";
import { useForm } from "react-hook-form";
import { IResetPasswordForm } from "../../interface";
import { gStyle } from "../../asset";

export function ResetPasswordForm() {
   const {
      control,
      handleSubmit,
      formState: { errors, isValid }
   } = useForm<IResetPasswordForm>({ mode: "onTouched" });

   const onSubmit = (data: any) => console.log(data)

   return (
      <View style={ [ gStyle.form_control_wrapper ] }>

         <FormControl label={ '6-значний код' }
                      control={ control }
                      name={ 'code' }
                      errorMessage={ errors.code?.message }
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
