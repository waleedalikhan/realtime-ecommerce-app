type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | Record<string, boolean | undefined | null>;

function parseClassValue(value: ClassValue): string[] {
  if (
    value === undefined ||
    value === null ||
    value === false ||
    value === ""
  ) {
    return [];
  }
  if (typeof value === "string") {
    return [value];
  }
  if (typeof value === "number" && value !== 0) {
    return [String(value)];
  }
  if (Array.isArray(value)) {
    return value.flatMap(parseClassValue);
  }
  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([, v]) => Boolean(v))
      .map(([k]) => k);
  }
  return [];
}
export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap(parseClassValue).filter(Boolean).join(" ").trim();
}
