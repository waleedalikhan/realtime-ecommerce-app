import React, { useState } from "react";
import { View, Text, Pressable, Modal, ScrollView } from "react-native";
import styles from "@/styles/Select.styles";

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  ariaLabel?: string;
};

const Select: React.FC<Props> = ({
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

export default Select;
