import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/app/app-provider";
import SlideSession from "@/components/slide-sesstion";
const inter = Inter({ subsets: ["vietnamese"] });
import type { Viewport } from "next";
import Header from "@/components/HeaderWrapper";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Product",
    default: "Product",
  },
  description:
    "Web bán hàng được tạo bởi lê tuấn anh. Với nhiều mặt hàng tha hồ mà lựa chọn. Tuấn anh luôn là thương hiệu số 1 tại việt nam",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Header/>
            {children}
            {/* component SlideSession phụ trách việc Tự động gia hạn thời gian hết hạn session */}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
