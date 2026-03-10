/** Merge style arrays or objects for React Native (e.g. conditional styles). */
type StyleValue =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | false
  | null
  | undefined;

export function cn(...inputs: StyleValue[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const x of inputs) {
    if (x == null || x === false) continue;
    if (Array.isArray(x)) out.push(...x);
    else if (typeof x === "object") out.push(x);
  }
  return out;
}
