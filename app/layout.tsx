import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "خزانة الدروس الفقهية",
  description: "دروس شرح المتون الفقهية على مذهب الإمام الشافعي — تقديم د. لبيب نجيب عبدالله",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fefefe] text-[#1a1a2e]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
