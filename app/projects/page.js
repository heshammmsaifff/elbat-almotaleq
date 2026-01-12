"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Maximize2, Loader2, Sparkles, LayoutGrid } from "lucide-react";
import { supabase } from "@/lib/supabase";
// نفترض أن هذا هو مسار الـ Context الخاص بك
import { useLanguage } from "@/context/LanguageContext";

const ProjectsPage = () => {
  // استخدام السياق لجلب اللغة الحالية (ar أو en)
  const { lang } = useLanguage();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // نصوص الواجهة المترجمة
  const dict = {
    ar: {
      badge: "فخر الصناعة والتنفيذ",
      title: "معرض",
      titleAccent: "مشاريعنا",
      desc: "استكشف مجموعة من المشاريع التي قمنا بتنفيذها، حيث تجتمع الدقة الهندسية مع الفن المعماري الحديث.",
      loading: "جاري تحميل معرض الأعمال...",
      empty: "المعرض قيد التحديث",
      emptySub: "نحن بصدد رفع مجموعة من المشاريع الجديدة، انتظرونا قريباً!",
      viewDetails: "مشاهدة التفاصيل",
      status: "مشروع مكتمل",
      whatsapp: "اطلب استشارة عبر واتساب",
      back: "رجوع للمعرض",
      waText: "أريد استشارة بخصوص مشروع: ",
    },
    en: {
      badge: "Craftsmanship & Execution",
      title: "Gallery",
      titleAccent: "Projects",
      desc: "Explore a collection of our executed projects, where engineering precision meets modern architectural art.",
      loading: "Loading gallery...",
      empty: "Gallery under update",
      emptySub: "We are currently uploading new projects, stay tuned!",
      viewDetails: "View Details",
      status: "Completed Project",
      whatsapp: "Request Consultation via WhatsApp",
      back: "Back to Gallery",
      waText: "I would like a consultation regarding project: ",
    },
  };

  const t = dict[lang] || dict["ar"];

  // جلب كافة المشاريع
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*") // تأكد أن الجدول يحتوي على title_en و description_en
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // منع التمرير في الخلفية عند فتح المودال
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-center">
          <Loader2
            className="animate-spin text-amber-500 mb-4 mx-auto"
            size={50}
          />
          <p className="text-slate-500 font-bold">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-slate-50 pt-32 pb-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header القسم العلوي */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Sparkles size={16} />
            <span>{t.badge}</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            {lang === "ar" ? (
              <>
                {t.title}{" "}
                <span className="text-amber-500">{t.titleAccent}</span>
              </>
            ) : (
              <>
                <span className="text-amber-500">{t.titleAccent}</span>{" "}
                {t.title}
              </>
            )}
          </h1>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* شبكة المشاريع */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
            <LayoutGrid size={60} className="mx-auto text-slate-200 mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {t.empty}
            </h2>
            <p className="text-slate-500">{t.emptySub}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer"
              >
                <div className="relative h-[400px] md:h-[450px] rounded-[2.5rem] overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <Image
                    src={project.images_urls?.[0] || "/placeholder.jpg"}
                    alt={lang === "ar" ? project.title : project.title_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent transition-all duration-300`}
                  >
                    <div className="absolute bottom-0 right-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-black text-white mb-3">
                        {lang === "ar"
                          ? project.title
                          : project.title_en || project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-amber-400 font-bold">
                        <Maximize2 size={18} />
                        <span>{t.viewDetails}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- نافذة المشروع (Modal) --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-7xl h-full md:h-auto max-h-[100dvh] md:max-h-[90vh] bg-white md:rounded-[3rem] overflow-y-auto lg:overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* زر الإغلاق الثابت - يتم تغيير موقعه حسب اللغة */}
              <button
                onClick={() => setSelectedProject(null)}
                className={`fixed md:absolute top-4 ${
                  lang === "ar" ? "left-4" : "right-4"
                } z-[150] p-3 bg-white/90 backdrop-blur text-slate-900 rounded-full shadow-2xl border border-slate-100 hover:bg-amber-500 hover:text-white transition-all`}
              >
                <X size={24} />
              </button>

              {/* جانب الصور */}
              <div className="w-full lg:w-2/3 bg-slate-50 p-4 md:p-8 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-amber-500">
                <div className="flex flex-col gap-6">
                  {selectedProject.images_urls?.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-full aspect-[4/3] md:aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm bg-white"
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        priority={i === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* جانب التفاصيل */}
              <div
                className={`w-full lg:w-1/3 flex flex-col bg-white border-t lg:border-t-0 ${
                  lang === "ar" ? "lg:border-r" : "lg:border-l"
                } border-slate-100`}
              >
                <div className="p-8 md:p-10 lg:overflow-y-auto text-start">
                  <div className="inline-block px-4 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-black mb-4">
                    {t.status}
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                    {lang === "ar"
                      ? selectedProject.title
                      : selectedProject.title_en || selectedProject.title}
                  </h2>
                  <div className="w-16 h-1 bg-amber-500 rounded-full mb-8"></div>
                  <p className="text-slate-600 leading-relaxed text-lg mb-10 whitespace-pre-wrap">
                    {lang === "ar"
                      ? selectedProject.description
                      : selectedProject.description_en ||
                        selectedProject.description}
                  </p>

                  {/* منطقة الأزرار */}
                  <div className="space-y-4 pt-6 border-t border-slate-50">
                    <a
                      href={`https://wa.me/966562602106?text=${t.waText}${
                        lang === "ar"
                          ? selectedProject.title
                          : selectedProject.title_en || selectedProject.title
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 active:scale-95"
                    >
                      {t.whatsapp}
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-full text-slate-400 font-bold py-2 hover:text-red-500 transition-colors text-sm"
                    >
                      {t.back}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectsPage;
