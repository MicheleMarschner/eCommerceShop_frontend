

import { Inter } from "next/font/google";
// layout.js (Server Component by default)
import ClientLayout from './ClientLayout';
import { CartContextProvider } from "./components/CartContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CartContextProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
      </CartContextProvider>
      </body>
    </html>
  );
}
