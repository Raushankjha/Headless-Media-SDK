import { useCallback, useState } from "react";
export function useLightbox<T>() {
  const [item, setItem] = useState<T | null>(null);
  return {
    item,
    isOpen: Boolean(item),
    open: useCallback((value: T) => setItem(value), []),
    close: useCallback(() => setItem(null), []),
  };
}
