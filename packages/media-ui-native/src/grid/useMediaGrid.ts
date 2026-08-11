import { useCallback } from "react";
export function useMediaGrid({ onLoadMore }: { onLoadMore?: () => void } = {}) {
  return {
    getRootProps: useCallback(
      (props: Record<string, unknown> = {}) => props,
      [],
    ),
    getItemProps: useCallback(
      (props: Record<string, unknown> = {}) => props,
      [],
    ),
    onEndReached: useCallback(() => onLoadMore?.(), [onLoadMore]),
  };
}
