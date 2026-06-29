import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Sidebar from "@/src/shared/components/layout/Sidebar/Sidebar";
import Header from "@/src/shared/components/layout/Header/Header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quibenne - Painel administrativo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Header />
        <div style={{ display: "flex", flex: "1", minHeight: "0" }}>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
