"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { lang } = useLanguage();

  const navLinks = [
    { name: lang === "ar" ? "الرئيسية" : "Home", href: "/" },
    { name: lang === "ar" ? "خدماتنا" : "Services", href: "/services" },
    { name: lang === "ar" ? "معلومات عنا" : "About Us", href: "/about" },
    { name: lang === "ar" ? "المقالات" : "Blogs", href: "/blogs" },
    { name: lang === "ar" ? "المشاريع" : "Projects", href: "/projects" },
    { name: lang === "ar" ? "تواصل معنا" : "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "#",
      label: lang === "ar" ? "انستغرام" : "Instagram",
    },
    {
      icon: <Facebook size={20} />,
      href: "#",
      label: lang === "ar" ? "فيسبوك" : "Facebook",
    },
    {
      icon: <Twitter size={20} />,
      href: "#",
      label: lang === "ar" ? "تويتر" : "Twitter",
    },
    {
      icon: <FaWhatsapp size={20} />,
      href: "https://wa.me/966562602106",
      label: lang === "ar" ? "واتساب" : "WhatsApp",
    },
  ];

  return (
    <footer
      className="bg-slate-900 text-slate-300 pt-20 pb-10"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* العمود الأول: الشعار والتعريف */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt={lang === "ar" ? "البيت المتألق" : "Al-Bayt Al-Mutaaliq"}
                width={150}
                height={60}
                className="object-contain bg-white/15 rounded-3xl p-2 brightness-200"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {lang === "ar"
                ? "مؤسسة سعودية متخصصة في تحويل المساحات إلى تحف فنية. خبراء في الديكورات الداخلية، الخارجية، وتنسيق الحدائق بأعلى معايير الجودة."
                : "A Saudi institution specialized in transforming spaces into masterpieces. Experts in interior and exterior decorations, and landscaping with the highest quality standards."}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              {lang === "ar" ? "روابط سريعة" : "Quick Links"}
              <span
                className={`absolute -bottom-2 ${
                  lang === "ar" ? "right-0" : "left-0"
                } w-8 h-1 bg-amber-500 rounded-full`}
              ></span>
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`hover:text-amber-500 inline-block transition-all duration-300 
                      ${
                        lang === "ar"
                          ? "hover:translate-x-[-5px]"
                          : "hover:translate-x-[5px]"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: تواصل معنا */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              {lang === "ar" ? "معلومات التواصل" : "Contact Info"}
              <span
                className={`absolute -bottom-2 ${
                  lang === "ar" ? "right-0" : "left-0"
                } w-8 h-1 bg-amber-500 rounded-full`}
              ></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm">
                  {lang === "ar"
                    ? "المملكة العربية السعودية، الرياض"
                    : "Riyadh, Saudi Arabia"}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm" dir="ltr">
                  +966 56 260 2106
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm">info@albayt-almutaalek.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()}{" "}
            {lang === "ar"
              ? "البيت المتألق للمقاولات والديكور. جميع الحقوق محفوظة."
              : "Al-Bayt Al-Mutaaliq for Contracting & Decor. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
