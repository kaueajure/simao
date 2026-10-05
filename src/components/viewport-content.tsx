'use client';
import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function ViewportContent({ children }: { children: ReactNode }) {
  const content = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const search = useSearchParams();
  const route = `${pathname}?${search.toString()}`;
  useLayoutEffect(() => {
    // Router navigation normally resets the document. The scroll surface is
    // now inside the frame, so reset it on a new page/filter instead.
    content.current?.scrollTo({ top: 0, left: 0 });
  }, [route]);
  return (
    <div ref={content} className="app-content">
      {children}
    </div>
  );
}
