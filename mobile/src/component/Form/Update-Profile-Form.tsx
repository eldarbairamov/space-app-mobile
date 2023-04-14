import { View } from "react-native";
import { gStyle } from "../../asset";
import { Button, FormControl } from "../../component";
import { useForm } from "react-hook-form";
import { IUpdateProfile, IUpdateProfileForm } from "../../interface";
import { useAppSelector } from "../../hook";
import { useEffect } from "react";

interface IUpdateProfileFormProps {
   updateProfileFn: (body: IUpdateProfile) => Promise<void>;
}

export function UpdateProfileForm({ updateProfileFn }: IUpdateProfileFormProps) {
   const { control, handleSubmit, formState: { errors, isValid }, setValue } = useForm<IUpdateProfileForm>({ mode: "onTouched" });
   const { username, name, surname } = useAppSelector(state => state.userReducer);

   const onSubmit = (data: any) => updateProfileFn(data);

   useEffect(() => {
      setValue("name", name);
      setValue("username", username);
      setValue("surname", surname);
   }, []);

   return (
      <View style={ [ gStyle.center, gStyle.form_control_wrapper ] }>

         <FormControl label={ "Імʼя користувача" }
                      control={ control }
                      name={ "username" }
                      isRequired={ true }
                      isTextLimit={ true }
                      errorMessage={ errors.username?.message }/>

         <FormControl label={ "Імʼя" }
                      control={ control }
                      name={ "name" }
                      isOnlyLetters={ true }
                      errorMessage={ errors.name?.message }/>

         <FormControl label={ "Фамілія" }
                      control={ control }
                      name={ "surname" }
                      isOnlyLetters={ true }
                      errorMessage={ errors.surname?.message }/>

         <Button title={ "Зберегти" }
                 isValid={ isValid }
                 onPress={ handleSubmit(onSubmit) }/>

      </View>
   );
}
