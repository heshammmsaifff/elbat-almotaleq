"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  Maximize2,
  Loader2,
  Sparkles,
  LayoutGrid,
  Filter,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // جلب كافة المشاريع
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="text-center">
          <Loader2
            className="animate-spin text-amber-500 mb-4 mx-auto"
            size={50}
          />
          <p className="text-slate-500 font-bold">جاري تحميل معرض الأعمال...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header القسم العلوي */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Sparkles size={16} />
            <span>فخر الصناعة والتنفيذ</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            معرض <span className="text-amber-500">مشاريعنا</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            استكشف مجموعة من المشاريع التي قمنا بتنفيذها، حيث تجتمع الدقة
            الهندسية مع الفن المعماري الحديث.
          </p>
        </div>

        {/* شبكة المشاريع أو رسالة فارغة */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
            <LayoutGrid size={60} className="mx-auto text-slate-200 mb-6" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              المعرض قيد التحديث
            </h2>
            <p className="text-slate-500">
              نحن بصدد رفع مجموعة من المشاريع الجديدة، انتظرونا قريباً!
            </p>
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
                {/* بطاقة المشروع */}
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <Image
                    src={project.images_urls?.[0] || "/placeholder.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay عند المرور */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 right-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-black text-white mb-3">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-amber-400 font-bold">
                        <Maximize2 size={18} />
                        <span>مشاهدة التفاصيل</span>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* زر الإغلاق */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-xl"
              >
                <X size={24} />
              </button>

              {/* معرض صور المشروع داخل المودال */}
              <div className="w-full lg:w-2/3 h-[350px] lg:h-auto relative bg-slate-100 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid grid-cols-1 gap-4">
                  {selectedProject.images_urls?.map((img, i) => (
                    <div
                      key={i}
                      className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm"
                    >
                      <Image
                        src={img}
                        alt={`صورة ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* تفاصيل المشروع */}
              <div className="w-full lg:w-1/3 p-8 lg:p-12 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="inline-block px-4 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-black mb-4">
                    مشروع مكتمل
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="w-16 h-1 bg-amber-500 rounded-full mb-8"></div>
                  <p className="text-slate-600 leading-relaxed text-lg mb-8">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-500 text-sm mb-1">
                      هل أعجبك هذا العمل؟
                    </p>
                    <p className="text-slate-800 font-bold mb-4">
                      يمكننا تنفيذ تصميم مماثل لك تماماً.
                    </p>
                    <a
                      href={`https://wa.me/201092141964?text=أريد استشارة بخصوص مشروع: ${selectedProject.title}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                    >
                      اطلب استشارة عبر واتساب
                    </a>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full text-slate-400 font-bold hover:text-slate-600 transition-colors"
                  >
                    رجوع للمعرض
                  </button>
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
