import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutBodySchema, type CheckoutBody } from "@repo/shared";
import { api } from "@/api/client";

export default function CheckoutScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<CheckoutBody>({
    resolver: zodResolver(checkoutBodySchema),
    defaultValues: { shippingAddress: "", contactEmail: "", contactPhone: "" },
  });

  async function onSubmit(data: CheckoutBody) {
    setError(null);
    try {
      const order = await api<{ id: string }>("/checkout", {
        method: "POST",
        body: JSON.stringify(data),
      });
      router.replace({ pathname: "/orders/[id]", params: { id: order.id } });
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Controller
        control={control}
        name="shippingAddress"
        render={({
          field: { onChange, value },
          fieldState: { error: err },
        }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Shipping address</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
              value={value}
              onChangeText={onChange}
            />
            {err && <Text style={{ color: "red" }}>{err.message}</Text>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="contactEmail"
        render={({
          field: { onChange, value },
          fieldState: { error: err },
        }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Contact email</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
            {err && <Text style={{ color: "red" }}>{err.message}</Text>}
          </View>
        )}
      />
      <Controller
        control={control}
        name="contactPhone"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Contact phone (optional)</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 10, borderRadius: 6 }}
              value={value ?? ""}
              onChangeText={onChange}
            />
          </View>
        )}
      />
      {error && <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>}
      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={{ backgroundColor: "#2563eb", padding: 12, borderRadius: 6 }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Place order</Text>
      </Pressable>
    </View>
  );
}
