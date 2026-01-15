"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Briefcase,
  Plus,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

const LatestProjects = () => {
  const { lang } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const dict = {
    ar: {
      heading: "أحدث",
      headingAccent: "إنجازاتنا",
      subheading:
        "نستعرض لكم مجموعة مختارة من آخر المشاريع التي تم تنفيذها بدقة واحترافية عالية.",
      viewAll: "مشاهدة جميع المشاريع",
      details: "عرض التفاصيل",
      status: "مشروع مكتمل",
      contactBtn: "تواصل معنا لهذا المشروع",
      close: "إغلاق المعرض",
      loading: "جاري التحميل...",
      emptyTitle: "نعمل على مشاريع جديدة",
      emptyDesc:
        "معرض أعمالنا قيد التحديث لإضافة آخر إبداعاتنا. يمكنك التواصل معنا لبدء مشروعك الخاص الآن.",
      startProject: "ابدأ مشروعك معنا",
    },
    en: {
      heading: "Our Latest",
      headingAccent: "Achievements",
      subheading:
        "A curated selection of our most recent projects, executed with precision and high professionalism.",
      viewAll: "View All Projects",
      details: "View Details",
      status: "Completed Project",
      contactBtn: "Contact us for this project",
      close: "Close Gallery",
      loading: "Loading...",
      emptyTitle: "Great Things are Coming",
      emptyDesc:
        "We are currently curating our latest works. In the meantime, feel free to contact us to discuss your vision.",
      startProject: "Start Your Project",
    },
  };

  const t = dict[lang] || dict["ar"];

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProjects();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-amber-500" size={40} />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {t.heading}{" "}
              <span className="text-amber-500">{t.headingAccent}</span>
            </h2>
            <p className="text-slate-500 max-w-xl text-lg">{t.subheading}</p>
          </div>
          {projects.length > 0 && (
            <Link
              href="/projects"
              className="flex items-center gap-2 text-amber-600 font-bold hover:gap-4 transition-all"
            >
              {t.viewAll}
              {lang === "ar" ? (
                <ArrowLeft size={20} />
              ) : (
                <ArrowRight size={20} />
              )}
            </Link>
          )}
        </div>

        {/* --- Content Logic --- */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-md border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  <Image
                    src={project.images_urls?.[0] || "/placeholder-project.jpg"}
                    alt={lang === "ar" ? project.title : project.title_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                    <h3 className="text-white text-2xl font-bold mb-3">
                      {lang === "ar"
                        ? project.title
                        : project.title_en || project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <Maximize2 size={18} /> {t.details}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* --- ENHANCED EMPTY STATE --- */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-200 p-12 md:p-24 text-center"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl text-amber-500 mb-8">
                <Briefcase size={40} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">
                {t.emptyTitle}
              </h3>
              <p className="text-slate-500 text-lg mb-10">{t.emptyDesc}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-amber-500 transition-all active:scale-95 shadow-xl"
              >
                <Plus size={20} />
                {t.startProject}
              </Link>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none">
              <div className="grid grid-cols-4 gap-4 transform -rotate-12 scale-150">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-900 rounded-2xl"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* --- Modal Window (Optimized) --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/98 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-7xl h-full md:h-auto max-h-[100dvh] md:max-h-[90vh] bg-white md:rounded-[3rem] overflow-y-auto lg:overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className={`fixed md:absolute top-4 ${
                  lang === "ar" ? "left-4" : "right-4"
                } z-[150] p-3 bg-white/90 backdrop-blur text-slate-900 rounded-full shadow-2xl border border-slate-200 hover:text-red-500 transition-all`}
              >
                <X size={24} />
              </button>

              <div className="w-full lg:w-2/3 bg-slate-50 p-4 md:p-8 lg:overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {selectedProject.images_urls?.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-sm bg-white"
                    >
                      <Image
                        src={url}
                        alt=""
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`w-full lg:w-1/3 flex flex-col bg-white border-t lg:border-t-0 ${
                  lang === "ar" ? "lg:border-r" : "lg:border-l"
                } border-slate-100`}
              >
                <div className="p-8 md:p-12 lg:overflow-y-auto text-start">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-1.5 w-8 bg-amber-500 rounded-full" />
                    <span className="text-amber-600 font-bold text-xs tracking-widest uppercase">
                      {t.status}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                    {lang === "ar"
                      ? selectedProject.title
                      : selectedProject.title_en || selectedProject.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap mb-8">
                    {lang === "ar"
                      ? selectedProject.description
                      : selectedProject.description_en ||
                        selectedProject.description}
                  </p>
                  <div className="flex flex-col gap-4 pt-6 border-t border-slate-50">
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2 bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 transition-all shadow-xl active:scale-[0.98]"
                    >
                      {t.contactBtn}
                    </Link>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-full text-slate-400 font-bold py-2 hover:text-red-500 transition-all text-sm"
                    >
                      {t.close}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestProjects;
