import { createContext, useContext } from "react";

export const TreeContext = createContext(null);

export function useTreeContext() {
  const ctx = useContext(TreeContext);
  if (!ctx) {
    throw new Error("useTreeContext must be used within a TreeView");
  }
  return ctx;
}
