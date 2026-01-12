"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Paintbrush,
  TreePine,
  Home,
  Layers,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ServicesPage = () => {
  const { lang } = useLanguage();

  const allServices = [
    {
      id: "interior",
      title: lang === "ar" ? "الديكورات الداخلية" : "Interior Design",
      subtitle:
        lang === "ar"
          ? "نصنع الفخامة في كل زاوية"
          : "Creating luxury in every corner",
      description:
        lang === "ar"
          ? "نحن في البيت المتألق لا نصمم غرفاً فحسب، بل نصنع تجربة حياة. تشمل خدماتنا التصميم الداخلي السكني والتجاري، توزيع الإضاءة الذكي، واختيار الخامات التي تجمع بين الجمال والعملية."
          : "At Al-Bayt Al-Mutaaliq, we don't just design rooms; we create a living experience. Our services include residential and commercial interior design, smart lighting distribution, and selecting materials that blend beauty with functionality.",
      features:
        lang === "ar"
          ? ["تخطيط المساحات", "تصميم الأثاث المخصص", "تنسيق الألوان والإضاءة"]
          : [
              "Space Planning",
              "Custom Furniture Design",
              "Color & Lighting Coordination",
            ],
      image: "/services/interior.jpg",
      icon: <Paintbrush className="text-amber-500" size={32} />,
      bgColor: "bg-amber-50",
    },
    {
      id: "outdoor",
      title: lang === "ar" ? "الديكورات الخارجية" : "Exterior Design",
      subtitle:
        lang === "ar"
          ? "واجهات تعكس هويتكم"
          : "Facades that reflect your identity",
      description:
        lang === "ar"
          ? "واجهة منزلك هي الانطباع الأول. نقدم خدمات تصميم وتنفيذ الواجهات باستخدام أرقى المواد (بروفايل، حجر، بديل خشب). نركز على دمج العناصر المعمارية الحديثة مع مراعاة الظروف المناخية."
          : "Your home's facade is the first impression. We provide facade design and execution services using the finest materials (profile, stone, wood alternatives). We focus on integrating modern architectural elements while considering climate conditions.",
      features:
        lang === "ar"
          ? [
              "تصميم واجهات مودرن",
              "تركيب بديل الخشب والرخام",
              "إضاءة الواجهات الليلية",
            ]
          : [
              "Modern Facade Design",
              "Wood & Marble Alternatives",
              "Nighttime Facade Lighting",
            ],
      image: "/services/outdoor.jpg",
      icon: <Home className="text-blue-500" size={32} />,
      bgColor: "bg-blue-50",
    },
    {
      id: "landscaping",
      title: lang === "ar" ? "تنسيق الحدائق" : "Landscaping",
      subtitle:
        lang === "ar"
          ? "واحتكم الخاصة في قلب المنزل"
          : "Your private oasis at home",
      description:
        lang === "ar"
          ? "نحول الفناء الخارجي إلى متنفس طبيعي يبعث على الراحة. خدماتنا تشمل تصميم الحدائق المنزلية، تركيب العشب الصناعي، إنشاء الشلالات، وتصميم الجلسات الخارجية (البرجولات)."
          : "We transform your outdoor space into a natural retreat. Our services include home garden design, artificial turf installation, waterfall creation, and outdoor seating (pergolas) design.",
      features:
        lang === "ar"
          ? [
              "تصميم لاندسكيب متكامل",
              "تركيب مظلات وبرجولات",
              "أنظمة ضباب ورذاذ",
            ]
          : [
              "Integrated Landscape Design",
              "Pergolas & Shades",
              "Mist & Spray Systems",
            ],
      image: "/services/landscaping.jpg",
      icon: <TreePine className="text-emerald-500" size={32} />,
      bgColor: "bg-emerald-50",
    },
    {
      id: "closets",
      title: lang === "ar" ? "خزائن الملابس" : "Smart Closets",
      subtitle:
        lang === "ar"
          ? "حلول تخزين ذكية وأنيقة"
          : "Smart and elegant storage solutions",
      description:
        lang === "ar"
          ? "نصمم خزائن الملابس التي تجمع بين استغلال المساحات الصغير والمنظر الجمالي الفخم. نستخدم أجود أنواع الأخشاب والإكسسوارات العالمية لضمان سهولة الاستخدام."
          : "We design wardrobes that combine small space utilization with a luxurious aesthetic. We use the finest types of wood and international accessories to ensure ease of use and longevity.",
      features:
        lang === "ar"
          ? [
              "خزائن مبتكرة بذكاء",
              "إضاءة داخلية مستشعرة",
              "تقسيمات حسب الاحتياج",
            ]
          : [
              "Smart Innovative Closets",
              "Sensor Interior Lighting",
              "Customized Partitions",
            ],
      image: "/services/closets.jpg",
      icon: <Layers className="text-purple-500" size={32} />,
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <main
      className="min-h-screen bg-slate-50 pt-32 pb-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-amber-600 font-bold text-sm mb-6"
          >
            <CheckCircle size={16} />
            <span>
              {lang === "ar"
                ? "حلول هندسية وفنية متكاملة"
                : "Integrated Engineering & Art Solutions"}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6"
          >
            {lang === "ar" ? (
              <>
                خدماتنا في <span className="text-amber-500">البيت المتألق</span>
              </>
            ) : (
              <>
                Our Services at{" "}
                <span className="text-amber-500">Al-Bayt Al-Mutaaliq</span>
              </>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {lang === "ar"
              ? "نقدم حزمة واسعة من الخدمات التي تغطي كافة جوانب منزلك، من المخططات الأولية وحتى تسليم المفتاح، مع التركيز التام على الجودة والابتكار."
              : "We provide a wide range of services covering all aspects of your home, from initial layouts to turnkey delivery, with a total focus on quality and innovation."}
          </motion.p>
        </div>

        {/* Services List */}
        <div className="space-y-20">
          {allServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center bg-white p-6 lg:p-12 rounded-[3rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-shadow`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative h-[300px] md:h-[450px] rounded-[2.5rem] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div
                  className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-4`}
                >
                  {service.icon}
                </div>
                <h2 className="text-3xl font-black text-slate-900">
                  {service.title}
                </h2>
                <h3 className="text-amber-600 font-bold text-lg italic">
                  {service.subtitle}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-slate-700 font-medium"
                    >
                      <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={14} />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-slate-200"
                >
                  <span>
                    {lang === "ar"
                      ? "اطلب هذه الخدمة الآن"
                      : "Request This Service Now"}
                  </span>
                  {lang === "ar" ? (
                    <ChevronLeft size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              {lang === "ar"
                ? "هل لديك تصميم خاص تود تنفيذه؟"
                : "Do you have a custom design to execute?"}
            </h2>
            <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
              {lang === "ar"
                ? "لا تتردد في مشاركتنا أي صورة أو فكرة رأيتها، فريقنا متخصص في تحويل الصور المقتبسة إلى واقع حي في منزلك."
                : "Feel free to share any image or idea you've seen; our team specializes in turning reference photos into living reality in your home."}
            </p>
            <Link
              href="/contact"
              className="bg-amber-500 hover:bg-white hover:text-amber-600 text-white px-12 py-5 rounded-full font-black text-xl transition-all inline-block shadow-2xl"
            >
              {lang === "ar"
                ? "تواصل مع المهندس المسؤول"
                : "Contact the Project Engineer"}
            </Link>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div
              className={`absolute top-10 ${
                lang === "ar" ? "left-10" : "right-10"
              } w-64 h-64 border-8 border-white rounded-full`}
            ></div>
            <div
              className={`absolute bottom-10 ${
                lang === "ar" ? "right-10" : "left-10"
              } w-96 h-96 border-8 border-white rounded-full`}
            ></div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ServicesPage;
