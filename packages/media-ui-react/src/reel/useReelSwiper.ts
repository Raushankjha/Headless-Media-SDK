import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import type { MediaItem } from '@headless-media/media-core';

export function useReelSwiper(items: MediaItem[], onActiveChange?: (item: MediaItem, index: number) => void) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.reelIndex);
      if (!Number.isNaN(index) && index !== activeIndex) { setActiveIndex(index); const item = items[index]; if (item) onActiveChange?.(item, index); }
    }, { root, threshold: [0.6, 0.8, 1] });
    itemRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [activeIndex, items, onActiveChange]);
  const getRootProps = useCallback((props: HTMLAttributes<HTMLDivElement> = {}): HTMLAttributes<HTMLDivElement> & { ref: typeof rootRef } => {
    const style: CSSProperties = { overflowY: 'auto', scrollSnapType: 'y mandatory', height: '100%', ...props.style };
    return { ...props, ref: rootRef, style };
  }, []);
  const getItemProps = useCallback((index: number, props: HTMLAttributes<HTMLElement> = {}): HTMLAttributes<HTMLElement> & { ref: Ref<HTMLElement>; 'data-reel-index': number } => {
    const style: CSSProperties = { scrollSnapAlign: 'start', minHeight: '100%', ...props.style };
    return { ...props, ref: (node: HTMLElement | null) => { itemRefs.current[index] = node; }, 'data-reel-index': index, style };
  }, []);
  return { activeIndex, getRootProps, getItemProps };
}
