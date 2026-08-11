import { useCallback, useEffect, useRef, useState } from 'react';
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import type { MediaItem } from '@headless-media/media-core';

export function useLightbox() {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const open = useCallback((item: MediaItem) => { previousFocus.current = document.activeElement as HTMLElement | null; setActiveItem(item); }, []);
  const close = useCallback(() => { setActiveItem(null); requestAnimationFrame(() => previousFocus.current?.focus()); }, []);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!activeItem) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => dialogRef.current?.focus());
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow; };
  }, [activeItem, close]);
  return {
    activeItem,
    isOpen: Boolean(activeItem),
    open,
    close,
    dialogRef,
    getDialogProps: (props: HTMLAttributes<HTMLDivElement> = {}): HTMLAttributes<HTMLDivElement> & { ref: typeof dialogRef } => ({ role: 'dialog', 'aria-modal': true, tabIndex: -1, ...props, ref: dialogRef }),
    getCloseButtonProps: (props: ButtonHTMLAttributes<HTMLButtonElement> = {}): ButtonHTMLAttributes<HTMLButtonElement> => ({ type: 'button', 'aria-label': 'Close', onClick: close, ...props }),
  };
}
