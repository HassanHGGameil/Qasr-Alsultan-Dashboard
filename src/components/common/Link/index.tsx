'use client';
import { Link as NextIntlLink } from '@/i18n/routing';
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

type CustomLinkProps = {
  children: React.ReactNode;
  href: string;
  target?: string;
  locale?: string;
  prefetchDelay?: number;
  prefetch?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

const Link: FC<CustomLinkProps> = ({
  children,
  href,
  prefetchDelay = 100,
  locale,
  prefetch: initialPrefetch = false,
  ...rest
}) => {
  const [prefetching, setPrefetching] = useState(initialPrefetch);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const prefetchTimer = useRef<NodeJS.Timeout | null>(null);

  const startPrefetch = () => {
    cancelPrefetch(); // Clear any existing timer
    prefetchTimer.current = setTimeout(() => {
      setPrefetching(true);
    }, prefetchDelay);
  };

  const cancelPrefetch = () => {
    if (prefetchTimer.current) {
      clearTimeout(prefetchTimer.current);
      prefetchTimer.current = null;
    }
  };

  useEffect(() => {
    const linkElement = linkRef.current;
    
    if (!linkElement) return;

    const handleMouseEnter = () => startPrefetch();
    const handleMouseLeave = () => cancelPrefetch();
    const handleTouchStart = () => startPrefetch();

    linkElement.addEventListener('mouseenter', handleMouseEnter);
    linkElement.addEventListener('mouseleave', handleMouseLeave);
    linkElement.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      linkElement.removeEventListener('mouseenter', handleMouseEnter);
      linkElement.removeEventListener('mouseleave', handleMouseLeave);
      linkElement.removeEventListener('touchstart', handleTouchStart);
      cancelPrefetch();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefetchDelay]);

  return (
    <NextIntlLink
      href={href}
      ref={linkRef}
      prefetch={prefetching}
      locale={locale}
      onMouseDown={(e) => {
        if (e.button === 1) { // Middle mouse button
          setPrefetching(true);
        }
      }}
      {...rest}
    >
      {children}
    </NextIntlLink>
  );
};

export default Link;