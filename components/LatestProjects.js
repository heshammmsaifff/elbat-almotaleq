"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Maximize2, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LatestProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

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

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-amber-500" size={40} />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {projects.length > 0 && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                أحدث <span className="text-amber-500">إنجازاتنا</span>
              </h2>
              <p className="text-slate-500 max-w-xl text-lg">
                نستعرض لكم مجموعة مختارة من آخر المشاريع التي تم تنفيذها بدقة
                واحترافية عالية.
              </p>
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 text-amber-600 font-bold hover:gap-4 transition-all"
            >
              مشاهدة جميع المشاريع <ArrowLeft size={20} />
            </Link>
          </div>
        )}

        {/* Empty State */}
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-20 px-6 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200"
          >
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Sparkles size={40} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">
              نحن جاهزون لبدء <span className="text-amber-500">قصة نجاح</span>{" "}
              جديدة معكم!
            </h3>
            <Link
              href="/contact"
              className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-amber-500 transition-all active:scale-95"
            >
              ابدأ مشروعك معنا الآن
            </Link>
          </motion.div>
        ) : (
          /* Projects Grid */
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
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Overlay Info: Always visible on mobile, hover on desktop */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent 
                                md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-all duration-300 flex flex-col justify-end p-8"
                  >
                    <h3 className="text-white text-2xl font-bold mb-3">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <Maximize2 size={18} /> عرض كامل الصور والتفاصيل
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- Modal --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 lg:p-10">
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
              className="relative w-full max-w-7xl max-h-[92vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 left-5 z-50 p-3 bg-white text-slate-900 rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-xl"
              >
                <X size={24} />
              </button>

              {/* Left Side: Image Gallery */}
              <div className="w-full lg:w-2/3 h-[50vh] lg:h-auto overflow-y-auto bg-slate-50 p-4 scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-slate-100">
                <div className="flex flex-col gap-6">
                  {selectedProject.images_urls?.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white"
                    >
                      <Image
                        src={url}
                        alt={`${selectedProject.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="w-full lg:w-1/3 p-8 lg:p-12 flex flex-col bg-white overflow-y-auto">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2 w-10 bg-amber-500 rounded-full" />
                    <span className="text-amber-600 font-bold text-sm tracking-widest uppercase">
                      مشروع مكتمل
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">
                    {selectedProject.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col gap-4">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-amber-500 transition-all shadow-lg hover:shadow-amber-200"
                  >
                    تواصل معنا لهذا المشروع
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-slate-400 font-bold py-2 hover:text-red-500 transition-all text-sm"
                  >
                    إغلاق المعرض
                  </button>
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
