'use client';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es">
      <body>
        <QueryClientProvider client={queryClient} >
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
