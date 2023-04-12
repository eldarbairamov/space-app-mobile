import { View } from "react-native";
import { gStyle } from "../../asset";
import { Button, FormControl } from "../../component";
import { useForm } from "react-hook-form";
import { IRegistration, IRegistrationForm } from "../../interface";

interface IRegistrationFormProps {
   registrationFn: (body: IRegistration) => Promise<void>
}

export function RegistrationForm({ registrationFn }: IRegistrationFormProps) {
   const { control, handleSubmit, formState: { errors, isValid } } = useForm<IRegistrationForm>({ mode: "onTouched" });

   const onSubmit = (data: any) => registrationFn(data)

   return (
      <View style={ [ gStyle.center, gStyle.form_control_wrapper ] }>

         <FormControl label={ 'Імʼя користувача' }
                      control={ control }
                      name={ 'username' }
                      isTextLimit={ true }
                      isRequired={ true }
                      errorMessage={ errors.username?.message }/>

         <FormControl label={ 'Електронна пошта' }
                      control={ control }
                      name={ 'email' }
                      isEmail={ true }
                      isRequired={ true }
                      errorMessage={ errors.email?.message }/>

         <FormControl label={ 'Пароль' }
                      control={ control }
                      name={ 'password' }
                      isPassword={ true }
                      isRequired={ true }
                      errorMessage={ errors.password?.message }/>

         <Button title={ 'Зареєструватись' } isValid={ isValid } onPress={ handleSubmit(onSubmit) }/>

      </View>
   )
}
