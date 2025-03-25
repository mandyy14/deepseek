import MaintenancePage from "@/components/MaintenancePage"; // importe aqui
import AppContextProvider from "@/context/appContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import "./prism.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export const metadata = {
  title: "DeepSeek",
  description: "DeepSeek Project.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClerkProvider>
          <AppContextProvider>
            <Toaster
              toastOptions={{
                success: { style: { background: "black", color: "white" } },
                error: { style: { background: "black", color: "white" } },
              }}
            />
            {isMaintenance ? <MaintenancePage /> : children}
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
