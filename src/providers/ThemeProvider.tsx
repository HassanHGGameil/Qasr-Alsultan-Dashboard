"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ProvidersTheme({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Only render the ThemeProvider on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid rendering anything on the server side to prevent class/style mismatch
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
}
