'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

export function ScrollableTabs({
  active,
  label,
  className = '',
  children,
}: {
  active: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const navigation = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const nav = navigation.current;
    if (!nav) return;
    function showCurrent() {
      if (!nav) return;
      const current = nav.querySelector('[aria-current="page"]');
      if (!current) return;
      const bounds = nav.getBoundingClientRect();
      const item = current.getBoundingClientRect();
      // Desloca apenas a lista de abas; mantém a posição vertical da página.
      if (item.left < bounds.left) nav.scrollLeft -= bounds.left - item.left + 8;
      else if (item.right > bounds.right) nav.scrollLeft += item.right - bounds.right + 8;
    }
    showCurrent();
    const observer = new ResizeObserver(showCurrent);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [active]);
  return (
    <nav ref={navigation} className={`tabs ${className}`} aria-label={label}>
      {children}
    </nav>
  );
}
