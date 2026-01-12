"use client";

import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

function LayoutContent({ children }) {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${cairo.variable} ${jakarta.variable} antialiased`}
    >
      <body
        className="antialiased bg-white text-slate-900 flex flex-col min-h-screen relative"
        style={{
          // تعيين الخط الافتراضي بناءً على اللغة المختارة
          fontFamily:
            lang === "ar" ? "var(--font-cairo)" : "var(--font-jakarta)",
        }}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />

        <button
          onClick={toggleLanguage}
          className="fixed top-1/4 -translate-y-1/2
          -left-7 sm:-left-7
          z-60
          bg-gray-600
          text-white font-semibold
          py-3 px-8 sm:px-8
          rounded-r-full
          shadow-lg shadow-black/25
          transition hover:bg-white/10 hover:text-black"
          title={lang === "ar" ? "Switch to English" : "تحويل للعربية"}
        >
          {lang === "ar" ? "EN" : "AR"}
        </button>
      </body>
    </html>
  );
}

export default function ClientLayout({ children }) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}
