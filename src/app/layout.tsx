import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/redux.provider";
import { ToastContainer } from "react-toastify";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "600"]
})

export const metadata: Metadata = {
  title: "Trello",
  description: "Jobs Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer position="top-right" theme="colored" />
      </body>
    </html>
  );
}
