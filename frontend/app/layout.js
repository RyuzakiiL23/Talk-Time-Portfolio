"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import { ThemeProvider } from "@/components/theme-provider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div style={{ position: "absolute", top: "30px", right: "20px", zIndex: 9999 }}>
      <button onClick={toggleTheme}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  );
}
