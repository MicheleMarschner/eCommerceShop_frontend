

import { Inter } from "next/font/google";
// layout.js (Server Component by default)
import ClientLayout from './ClientLayout';
import { CartContextProvider } from "./components/CartContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce Shop",
  description: "Online electronics shop",
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
