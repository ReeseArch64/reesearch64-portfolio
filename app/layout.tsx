import "./globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReeseArch64",
  description: "Portfolio Alan Guerra",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster
            richColors
            theme="system"
            className="dark:bg-gray-900 dark:text-white"
            toastOptions={{
              classNames: {
                toast: "dark:bg-gray-900 dark:text-white dark:border dark:border-gray-700",
                title: "dark:text-white",
                description: "dark:text-gray-300",
                actionButton: "dark:bg-purple-700 dark:text-white",
                cancelButton: "dark:bg-gray-800 dark:text-gray-300",
                success: "dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
                error: "dark:bg-red-900/20 dark:text-red-300 dark:border-red-800",
                warning: "dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800",
                info: "dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
