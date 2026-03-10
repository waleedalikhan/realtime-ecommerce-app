import { useState, useCallback } from "react";

export default function useMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  return { isOpen, toggle };
}
