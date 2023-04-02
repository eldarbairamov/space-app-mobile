import { View } from "react-native";
import { gStyle } from "../../asset";
import { Button, FormControl } from "../../component";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../interface";

interface ILoginFormProps {
   loginFn: (body: ILoginForm) => Promise<void>;
}

export function LoginForm({ loginFn }: ILoginFormProps) {
   const { control, handleSubmit, formState: { errors, isValid } } = useForm<ILoginForm>({ mode: "onTouched" });

   const onSubmit = async (data: ILoginForm) => await loginFn(data)

   return (
      <View style={ [ gStyle.center, gStyle.form_control_wrapper ] }>

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

         <Button title={ 'Увійти' } isValid={ isValid } onPress={ handleSubmit(onSubmit) }/>

      </View>
   )
}
