"use client";

import { motion } from "framer-motion";
import { Search, PenTool, HardHat, Sparkles } from "lucide-react";
import Link from "next/link";

const Process = () => {
  const steps = [
    {
      title: "اختر تصميمك",
      description:
        "هل أعجبك تصميم على Pinterest أو Instagram؟ شاركنا الصورة فقط.",
      icon: <Search className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "التخطيط الهندسي",
      description: "يقوم مهندسونا بمطابقة التصميم مع مساحة منزلك الفعلية.",
      icon: <PenTool className="w-8 h-8" />,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "التنفيذ المتقن",
      description: "نبدأ العمل بأجود الخامات الوطنية والعالمية لضمان الدقة.",
      icon: <HardHat className="w-8 h-8" />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "البيت المتألق",
      description: "نسلمك منزلك كما حلمت به تماماً، متألقاً وبأعلى جودة.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-slate-900 mb-6"
          >
            كيف نحول <span className="text-amber-500">حلمك</span> إلى واقع؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            في البيت المتألق، نتبع مساراً واضحاً يضمن لك الحصول على النتيجة التي
            أبهرتك في الصور، مع مراعاة أدق التفاصيل الفنية والجمالية.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-12 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div
                className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-6 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 border border-white`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base px-4">
                {step.description}
              </p>

              {/* Step Number Badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-xs font-black text-slate-400 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Inside Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-linear-to-r from-slate-900 to-slate-800 text-center text-white"
        >
          <h4 className="text-xl md:text-2xl font-bold mb-4">
            هل تملك صورة لتصميم معين؟
          </h4>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            أرسلها لنا عبر الواتساب الآن وسيقوم مهندسونا بدراستها وتقديم استشارة
            مجانية لك حول كيفية تنفيذها.
          </p>
          <Link
            href="https://wa.me/201092141964"
            target="_blank"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold transition-all active:scale-95 shadow-lg shadow-amber-500/20"
          >
            أرسل صورتك الآن
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
