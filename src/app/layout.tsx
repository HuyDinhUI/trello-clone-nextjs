import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/redux.provider";
import { ToastContainer } from "react-toastify";
import UserBootstrap from "@/providers/user.provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "400", "600"]
})

export const metadata: Metadata = {
  title: "Kanflow - Personal Kanban Task Manager",
  description: "Kanflow is a personal Kanban task management app built for productivity and smooth workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body
        className={`${manrope.variable} antialiased transition-colors`}
      >
        <ReduxProvider>
          <UserBootstrap/>
          {children}
        </ReduxProvider>
        <ToastContainer position="top-right" theme="colored" />
      </body>
    </html>
  );
}
