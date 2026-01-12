"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Paintbrush, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { lang } = useLanguage();
  return (
    <section
      className="relative p-10 min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 pt-20"
      dir={lang}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transform scale-105 animate-[slow-pan_30s_infinite_alternate_ease-in-out]"
          style={{ backgroundImage: "url('/hero1.jpg')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/1" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 mt-6 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-sm font-bold shadow-sm"
        >
          {lang == "ar"
            ? "فخامة التصميم ودقة التنفيذ"
            : "Luxurious design and precise execution"}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-8"
        >
          <span className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            {lang == "ar" ? "البيت المتألق" : "The Shining House"}
          </span>{" "}
          <br />
          <span className="text-slate-800">
            {lang == "ar"
              ? "للمقاولات والديكور الداخلي"
              : "For Contracting and Interior Decoration"}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-medium"
        >
          {lang == "ar"
            ? "نحن لا نبني جدراناً فقط، بل نصنع مساحات تنبض بالحياة. خبرة تمتد لسنوات في المقاولات العامة وأرقى حلول التصميم الداخلي."
            : "We don't just build walls; we create vibrant spaces. Years of experience in general contracting and top-tier interior design solutions."}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-amber-200 active:scale-95 text-center"
          >
            {lang == "ar" ? "ابدأ مشروعك الآن" : "Start Now!"}
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto bg-white border-2 border-slate-200 hover:border-amber-500 hover:text-amber-600 text-slate-700 px-10 py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-sm text-center"
          >
            {lang == "ar" ? "مشاهدة أعمالنا" : "View our work"}
          </Link>
        </motion.div>

        {/* Quick Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-slate-200 pt-10"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-2xl shadow-md text-amber-500">
              <Building2 size={28} />
            </div>
            <span className="font-bold text-slate-800 uppercase tracking-wider text-sm">
              {lang == "ar" ? "مقاولات عامة" : "General Contracting"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-white rounded-2xl shadow-md text-amber-500">
              <Paintbrush size={28} />
            </div>
            <span className="font-bold text-slate-800 uppercase tracking-wider text-sm">
              {lang == "ar" ? "تصميم داخلي" : "Interior design"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
