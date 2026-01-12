// app/layout.js
import "./globals.css";
import { siteMetadata } from "./shared-metadata";
import ClientLayout from "./client-layout";

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>;
}
