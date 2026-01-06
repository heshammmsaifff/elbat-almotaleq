import { Cairo } from "next/font/google";
import "./globals.css";

// إعداد خط Cairo
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "البيت المتألق | للمقاولات العامة والديكورات الداخلية",
    template: "%s | البيت المتألق",
  },
  description:
    "شركة البيت المتألق رائدة في مجال المقاولات العامة، الترميم، والتصميم الداخلي الفاخر. نحول أحلامكم إلى واقع ملموس بدقة وإتقان.",
  keywords: [
    "مقاولات",
    "ديكورات داخلية",
    "البيت المتألق",
    "بناء",
    "ترميم",
    "تصميم داخلي",
    "السعودية",
    "مصر",
  ],
  authors: [{ name: "البيت المتألق" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    // icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "البيت المتألق للمقاولات والديكور",
    description:
      "إتقان في البناء وفن في التصميم. خدمات متكاملة للمقاولات العامة والديكورات.",
    url: "https://your-domain.com",
    siteName: "البيت المتألق",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.className}>
      <body className="antialiased bg-white text-slate-900">{children}</body>
    </html>
  );
}
