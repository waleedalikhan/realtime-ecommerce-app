import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { colors } from "@/lib/theme";
import styles from "@/styles/Input.styles";

type Props = {
  label: string;
  error?: any;
  containerStyle?: object;
} & Pick<
  TextInputProps,
  | "value"
  | "onChangeText"
  | "onBlur"
  | "placeholder"
  | "secureTextEntry"
  | "autoCapitalize"
  | "keyboardType"
  | "editable"
>;

const InputField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  secureTextEntry,
  containerStyle,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={colors.stone[500]}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      {error?.message ? (
        <Text style={styles.errorText}>{error.message}</Text>
      ) : null}
    </View>
  );
};

export default InputField;
