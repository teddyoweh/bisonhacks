import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import AppProvider from "./context/appContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mile One - Shop with Videos",
  description: "Shop with videos, Your first mile towards business success and customer satisfaction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      <link rel="icon" href="2.png"/>
      </head>
      <AppProvider>
    
      <body className={inter.className}>
        
  

      <Nav/>
        {children}
      </body>
      </AppProvider>
    </html>
  );
}
