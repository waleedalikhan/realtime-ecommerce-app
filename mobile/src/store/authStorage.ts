import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export const getStoredToken = async (
  type: "accessToken" | "refreshToken" = "accessToken"
): Promise<string | null> => {
  const key = type === "accessToken" ? ACCESS_KEY : REFRESH_KEY;
  return SecureStore.getItemAsync(key);
};

export const setStoredTokens = async (
  accessToken: string,
  refreshToken?: string
): Promise<void> => {
  await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
  if (refreshToken != null)
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
};

export const clearStoredTokens = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
};
