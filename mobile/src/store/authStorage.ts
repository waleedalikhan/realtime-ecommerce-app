import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export async function getStoredToken(
  type: "accessToken" | "refreshToken" = "accessToken"
): Promise<string | null> {
  const key = type === "accessToken" ? ACCESS_KEY : REFRESH_KEY;
  return SecureStore.getItemAsync(key);
}

export async function setStoredTokens(
  accessToken: string,
  refreshToken?: string
): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
  if (refreshToken != null) {
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
  }
}

export async function clearStoredTokens(): Promise<void> {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}
