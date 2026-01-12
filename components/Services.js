"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, LayoutPanelLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Services = () => {
  const { lang } = useLanguage();

  const services = [
    {
      title: lang === "ar" ? "الديكورات الداخلية" : "Interior Design",
      description:
        lang === "ar"
          ? "نبتكر مساحات داخلية تجمع بين الأناقة والعملية، مع اهتمام دقيق بتوزيع الإضاءة والألوان والخامات."
          : "We create interior spaces that combine elegance and functionality, with meticulous attention to lighting, colors, and materials.",
      image: "/services/interior.jpg",
      link: "/services/interior",
    },
    {
      title: lang === "ar" ? "الديكورات الخارجية" : "Exterior Design",
      description:
        lang === "ar"
          ? "نصمم واجهات خارجية تعكس فخامة المبنى وتتحمل الظروف المناخية مع الحفاظ على المظهر الجمالي الفريد."
          : "We design exterior facades that reflect the building's luxury and withstand climatic conditions while maintaining a unique aesthetic.",
      image: "/services/outdoor.jpg",
      link: "/services/outdoor",
    },
    {
      title: lang === "ar" ? "تنسيق الحدائق" : "Landscaping",
      description:
        lang === "ar"
          ? "نحول المساحات الخارجية إلى واحات خضراء متكاملة تشمل الجلسات، أنظمة الري، وتوزيع النباتات الهندسي."
          : "We transform outdoor spaces into integrated green oases including seating areas, irrigation systems, and geometric plant distribution.",
      image: "/services/landscaping.jpg",
      link: "/services/landscaping",
    },
    {
      title: lang === "ar" ? "خزائن الملابس" : "Walk-in Closets",
      description:
        lang === "ar"
          ? "حلول تخزين ذكية وتصاميم عصرية لخزائن الملابس (Dressing Rooms) تستغل المساحات بذكاء ورقي."
          : "Smart storage solutions and modern designs for walk-in closets (Dressing Rooms) that utilize space with intelligence and sophistication.",
      image: "/services/closets.jpg",
      link: "/services/closets",
    },
  ];

  return (
    <section
      className="py-24 bg-slate-50/50"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-amber-600 font-bold mb-4"
            >
              <LayoutPanelLeft size={20} />
              <span>
                {lang === "ar"
                  ? "ماذا نقدم في البيت المتألق؟"
                  : "What do we offer at Al-Bayt Al-Mutaaliq?"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-slate-900"
            >
              {lang === "ar" ? (
                <>
                  خدمات متكاملة تغطي{" "}
                  <span className="text-amber-500">كافة احتياجاتك</span>{" "}
                  المعمارية والجمالية
                </>
              ) : (
                <>
                  Integrated services covering{" "}
                  <span className="text-amber-500">all your needs</span>{" "}
                  architectural and aesthetic
                </>
              )}
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-slate-500 md:max-w-xs text-lg leading-relaxed ${
              lang === "ar" ? "border-r-2 pr-4" : "border-l-2 pl-4"
            } border-amber-200`}
          >
            {lang === "ar"
              ? "نحن نجمع بين فن التصميم ودقة التنفيذ لنقدم لك تجربة فريدة في بناء وتجميل مسكنك."
              : "We combine the art of design with execution precision to offer you a unique experience in building and beautifying your home."}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-3 bg-white border-2 border-slate-200 text-slate-700 px-12 py-4 rounded-full font-black text-lg hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <span>
              {lang === "ar" ? "استكشف كافة الخدمات" : "Explore All Services"}
            </span>
            {lang === "ar" ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
