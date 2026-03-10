import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { colors, spacing, borderRadius, typography } from "@/lib/theme";

type Option = { label: string; value: string } | string;

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  ariaLabel?: string;
};

const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false);

  const normalized = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );
  const selectedLabel =
    normalized.find((o) => o.value === value)?.label ?? value;

  return (
    <>
      <Pressable
        style={({ pressed }) => [styles.trigger, pressed && styles.pressed]}
        onPress={() => setOpen(true)}
        accessibilityLabel={ariaLabel}
      >
        <Text style={styles.triggerText}>{selectedLabel}</Text>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.dropdown}>
            <ScrollView>
              {normalized.map((opt) => (
                <Pressable
                  key={opt.value}
                  style={({ pressed }) => [
                    styles.option,
                    opt.value === value && styles.optionSelected,
                    pressed && styles.pressed,
                  ]}
                  onPress={() => {
                    onValueChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      opt.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.stone[600],
    backgroundColor: "rgba(41,37,36,0.6)",
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.gap[2],
    paddingVertical: spacing.gap[2],
    minHeight: 44,
  },
  triggerText: {
    ...typography.base,
    color: colors.white,
  },
  chevron: {
    fontSize: 10,
    color: colors.stone[400],
  },
  pressed: { opacity: 0.8 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: spacing.px,
  },
  dropdown: {
    backgroundColor: colors.stone[800],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone[700],
    maxHeight: 300,
  },
  option: {
    paddingHorizontal: spacing.gap[4],
    paddingVertical: spacing.gap[2],
  },
  optionSelected: { backgroundColor: "rgba(251,191,36,0.15)" },
  optionText: {
    ...typography.base,
    color: colors.white,
  },
  optionTextSelected: { color: colors.amber[400] },
});

export default Select;
