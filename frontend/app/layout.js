import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import dynamic from 'next/dynamic';

const SocketContextProvider = dynamic(
  () => import('../context/SocketContext').then((mod) => {
    return { default: mod.SocketContextProvider };
  }),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Chat",
  description: "Talk to friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SocketContextProvider>{children}</SocketContextProvider>
        </Providers>
      </body>
    </html>
  );
}