import { StyleSheet, Text, View } from "react-native";
import { gStyle } from "../../asset";
import { Button } from "../UI/Button";
import { useAppSelector } from "../../hook";
import { MAIN_FONT_DARK } from "../../constant";
import { useForm } from "react-hook-form";
import { FormControl } from "../UI/Form-Control";

interface IActivationFormProps {
   activationFn: (body: string) => Promise<void>;
}

export function ActivationForm({ activationFn }: IActivationFormProps) {
   const { isDark } = useAppSelector(state => state.appReducer);

   const { control, handleSubmit, formState: { errors, isValid } } = useForm<{ code: string }>({ mode: "onTouched" });

   const onSubmit = async (data: { code: string }) => activationFn(data.code);

   return (
      <View>
         <View style={ styles.message }>
            <Text
               style={ [ gStyle.regular_font, { fontSize: 16, fontWeight: "500" }, isDark && { color: MAIN_FONT_DARK } ] }>
               Ви успішно зареєструвались!
            </Text>
            <Text
               style={ [ gStyle.regular_font, { fontSize: 16, fontWeight: "500", textAlign: "center" }, isDark && { color: MAIN_FONT_DARK } ] }>
               Введіть код активації, який щойно прилетів на вашу електронну пошту:
            </Text>
         </View>

         <View style={ gStyle.form_control_wrapper }>
            <FormControl control={ control }
                         name={ "code" }
                         isRequired={ true }
                         isCenter={ true }
                         width={ 300 }
                         errorMessage={ errors.code?.message }/>

            <Button title={ "Активувати" }
                    isValid={ isValid }
                    btnWidth={ 300 }
                    onPress={ handleSubmit(onSubmit) }/>

         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   message: {
      alignItems: "center",
      width: 300,
      marginBottom: 30
   }
});

