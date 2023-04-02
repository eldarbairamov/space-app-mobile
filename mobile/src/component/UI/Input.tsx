import { StyleSheet, TextInput } from "react-native";
import { gStyle } from "../../asset";

interface IInputProps {
   onChange: any,
   value: string,
   isCenter?: boolean,
   isBorder?: boolean,
   placeholder?: string,
}

export function Input({ onChange, value, isCenter, isBorder, placeholder }: IInputProps) {
   return (
      <TextInput autoFocus={ false }
                 style={ [
                    gStyle.regular_font,
                    styles.input,
                    isCenter && { textAlign: 'center' },
                    isBorder && { borderBottomColor: "#e3e3e3", borderBottomWidth: 1 }
                 ] }
                 onChangeText={ onChange }
                 value={ value }
                 placeholder={ placeholder ? placeholder : undefined }
      />
   )
}

export const styles = StyleSheet.create({
   input: {
      width: 250,
      padding: 1
   },
})
