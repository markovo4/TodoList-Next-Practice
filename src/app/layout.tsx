import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {ReactQueryProvider} from "@/lib/ReatQueryProvider";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TodoList",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ReactQueryProvider>
          <ToastContainer/>
          {children}
      </ReactQueryProvider>
      </body>
    </html>
  );
}
