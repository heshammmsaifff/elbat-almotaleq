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
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "خدماتنا", href: "/services" },
    { name: "معلومات عنا", href: "/about" },
    { name: "المشاريع", href: "/projects" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: "#", label: "انستغرام" },
    { icon: <Facebook size={20} />, href: "#", label: "فيسبوك" },
    { icon: <Twitter size={20} />, href: "#", label: "تويتر" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* العمود الأول: الشعار والتعريف */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="البيت المتألق"
                width={150}
                height={60}
                className="object-contain bg-white/15 rounded-3xl p-2 brightness-200"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              مؤسسة سعودية متخصصة في تحويل المساحات إلى تحف فنية. خبراء في
              الديكورات الداخلية، الخارجية، وتنسيق الحدائق بأعلى معايير الجودة.
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
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-500 hover:translate-x-[-5px] inline-block transition-all duration-300"
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
              معلومات التواصل
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm">المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm" dir="ltr">
                  +966 50 --- ----
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-amber-500 shrink-0" size={20} />
                <span className="text-sm">info@albaytalmutaaliq.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} البيت المتألق للمقاولات والديكور. جميع
            الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
