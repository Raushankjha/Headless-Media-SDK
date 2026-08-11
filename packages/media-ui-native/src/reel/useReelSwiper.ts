import { useState } from "react";
export function useReelSwiper<T>(
  items: T[],
  onActiveChange?: (item: T, index: number) => void,
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<{ index: number | null }>;
  }) => {
    const index = viewableItems[0]?.index;
    if (index != null) {
      setActiveIndex(index);
      const item = items[index];
      if (item) onActiveChange?.(item, index);
    }
  };
  return { activeIndex, onViewableItemsChanged };
}
