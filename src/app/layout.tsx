import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fontyard — จองที่พักออนไลน์",
  description: "ค้นหาและจองโรงแรมที่ใช่ได้ง่ายๆ กับ Fontyard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="th">
      <body className={sarabun.variable}>
        <ReduxProvider>
          <NextAuthProvider session={session}>
            <TopMenu/>
            {children}
          </NextAuthProvider> 
        </ReduxProvider>
      </body>
    </html>
  );
}
