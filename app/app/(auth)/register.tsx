import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerBodySchema, type RegisterBody } from "@repo/shared";
import { Link, useRouter } from "expo-router";
import { api } from "@/api/client";
import { useAuth } from "@/context/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<RegisterBody>({
    resolver: zodResolver(registerBodySchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  async function onSubmit(data: RegisterBody) {
    setError(null);
    try {
      const result = await api<{
        accessToken: string;
        refreshToken: string;
        user: { id: string; email: string; name: string | null; role: string };
      }>("/auth/register", { method: "POST", body: JSON.stringify(data) });
      await login(result.accessToken, result.refreshToken, result.user);
      router.replace("/(tabs)");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, value },
          fieldState: { error: err },
        }) => (
          <>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {err && <Text style={styles.err}>{err.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, value },
          fieldState: { error: err },
        }) => (
          <>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {err && <Text style={styles.err}>{err.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>Name (optional)</Text>
            <TextInput
              style={styles.input}
              value={value ?? ""}
              onChangeText={onChange}
            />
          </>
        )}
      />
      {error && <Text style={styles.err}>{error}</Text>}
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Link href="/(auth)/login" asChild>
        <Pressable>
          <Text style={styles.link}>Login</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, padding: 10, borderRadius: 6 },
  err: { color: "red", marginTop: 4 },
  button: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", textAlign: "center" },
  link: { color: "#2563eb", marginTop: 12 },
});
