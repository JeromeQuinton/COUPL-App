import { useEffect, useState, type RefObject } from "react";

/**
 * Returns true while the referenced element is intersecting the
 * viewport (with optional rootMargin). Uses IntersectionObserver
 * to avoid scroll-event cost. SSR-safe — returns true initially so
 * the sticky replica stays hidden until we've measured.
 */
export function useInView(
  ref: RefObject<Element | null>,
  options?: IntersectionObserverInit,
): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, options?.root, options?.rootMargin, options?.threshold]);

  return inView;
}
