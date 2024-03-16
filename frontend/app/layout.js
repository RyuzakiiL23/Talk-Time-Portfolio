import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Chat",
  description: "Talk to friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
