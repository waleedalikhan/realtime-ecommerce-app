import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { colors, spacing, borderRadius, typography } from "@/lib/theme";

type InputFieldProps = {
  label: string;
  error?: { message?: string };
  containerStyle?: object;
} & Pick<
  TextInputProps,
  "value" | "onChangeText" | "onBlur" | "placeholder" | "secureTextEntry" | "autoCapitalize" | "keyboardType" | "editable"
>;

const InputField: React.FC<InputFieldProps> = ({
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

const styles = StyleSheet.create({
  container: { marginBottom: spacing.gap[4] },
  label: {
    ...typography.sm,
    ...typography.fontMedium,
    color: colors.stone[300],
    marginBottom: spacing.gap[1],
  },
  input: {
    ...typography.base,
    color: colors.white,
    backgroundColor: colors.stone[800],
    borderWidth: 1,
    borderColor: colors.stone[700],
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.py.sm,
  },
  inputError: { borderColor: colors.red[400] },
  errorText: {
    ...typography.sm,
    color: colors.red[400],
    marginTop: spacing.gap[1],
  },
});

export default InputField;
