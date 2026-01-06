"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, LayoutPanelLeft } from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "الديكورات الداخلية",
      description:
        "نبتكر مساحات داخلية تجمع بين الأناقة والعملية، مع اهتمام دقيق بتوزيع الإضاءة والألوان والخامات.",
      image: "/services/interior.jpg",
      link: "/services/interior",
    },
    {
      title: "الديكورات الخارجية",
      description:
        "نصمم واجهات خارجية تعكس فخامة المبنى وتتحمل الظروف المناخية مع الحفاظ على المظهر الجمالي الفريد.",
      image: "/services/outdoor.jpg",
      link: "/services/outdoor",
    },
    {
      title: "تنسيق الحدائق",
      description:
        "نحول المساحات الخارجية إلى واحات خضراء متكاملة تشمل الجلسات، أنظمة الري، وتوزيع النباتات الهندسي.",
      image: "/services/landscaping.jpg",
      link: "/services/landscaping",
    },
    {
      title: "خزائن الملابس",
      description:
        "حلول تخزين ذكية وتصاميم عصرية لخزائن الملابس (Dressing Rooms) تستغل المساحات بذكاء ورقي.",
      image: "/services/closets.jpg",
      link: "/services/closets",
    },
  ];
  return (
    <section className="py-24 bg-slate-50/50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header المحتوى البسيط قبل الخدمات */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-amber-600 font-bold mb-4"
            >
              <LayoutPanelLeft size={20} />
              <span>ماذا نقدم في البيت المتألق؟</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-slate-900"
            >
              خدمات متكاملة تغطي{" "}
              <span className="text-amber-500">كافة احتياجاتك</span> المعمارية
              والجمالية
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 md:max-w-xs text-lg leading-relaxed border-r-2 border-amber-200 pr-4"
          >
            نحن نجمع بين فن التصميم ودقة التنفيذ لنقدم لك تجربة فريدة في بناء
            وتجميل مسكنك.
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
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            استكشف كافة الخدمات
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
