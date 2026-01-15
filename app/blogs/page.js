"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, X, ArrowRight, ArrowLeft, Loader2, Tag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

const BlogPage = () => {
  const { lang } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const dict = {
    ar: {
      title: "المدونة",
      subtitle: "استكشف أحدث المقالات، النصائح، والتحديثات من فريق عملنا.",
      readMore: "اقرأ المزيد",
      close: "إغلاق",
      status: "مقال جديد",
      empty: "لا توجد مقالات حالياً.",
    },
    en: {
      title: "Our Blog",
      subtitle: "Explore the latest articles, tips, and updates from our team.",
      readMore: "Read More",
      close: "Close",
      status: "New Post",
      empty: "No articles found.",
    },
  };

  const t = dict[lang] || dict["ar"];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedBlog ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBlog]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      lang === "ar" ? "ar-EG" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  return (
    <main className="min-h-screen bg-white" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* --- Hero Section --- */}
      <section className="bg-slate-400 pt-40 pb-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-800 font-bold text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* --- Blogs Grid --- */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-amber-500 mb-4" size={48} />
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBlog(blog)}
                className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={blog.images_urls?.[0] || "/placeholder-blog.jpg"}
                    alt={lang === "ar" ? blog.title : blog.title_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold text-amber-600 shadow-sm flex items-center gap-1">
                    <Tag size={12} /> {blog.category || "General"}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                    <Calendar size={14} />
                    {formatDate(blog.created_at)}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-amber-600 transition-colors">
                    {lang === "ar" ? blog.title : blog.title_en || blog.title}
                  </h3>
                  <p className="text-slate-500 line-clamp-3 mb-6 flex-grow">
                    {lang === "ar"
                      ? blog.description
                      : blog.description_en || blog.description}
                  </p>

                  <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:gap-4 transition-all">
                    {t.readMore}
                    {lang === "ar" ? (
                      <ArrowLeft size={18} />
                    ) : (
                      <ArrowRight size={18} />
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-xl">{t.empty}</p>
          </div>
        )}
      </section>

      {/* --- Content Modal --- */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-slate-900/98 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-7xl h-full md:h-auto max-h-[100dvh] md:max-h-[90vh] bg-white md:rounded-[3rem] overflow-y-auto lg:overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className={`fixed md:absolute top-4 ${
                  lang === "ar" ? "left-4" : "right-4"
                } z-[150] p-3 bg-white/90 rounded-full shadow-xl hover:text-red-500 transition-all`}
              >
                <X size={24} />
              </button>

              {/* Mobile Header (Title at top for mobile only) */}
              <div className="block lg:hidden p-8 pb-0 pt-16 text-start">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
                    {t.status}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
                  {lang === "ar"
                    ? selectedBlog.title
                    : selectedBlog.title_en || selectedBlog.title}
                </h2>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar size={14} /> {formatDate(selectedBlog.created_at)}
                </div>
              </div>

              {/* Images Container */}
              <div className="w-full lg:w-2/3 bg-slate-50 p-4 md:p-8 lg:overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {selectedBlog.images_urls?.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm bg-white"
                    >
                      <Image src={url} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Content */}
              <div
                className={`w-full lg:w-1/3 flex flex-col bg-white border-t lg:border-t-0 ${
                  lang === "ar" ? "lg:border-r" : "lg:border-l"
                } border-slate-100`}
              >
                <div className="p-8 md:p-12 lg:overflow-y-auto text-start">
                  {/* Desktop Header (Hidden on mobile) */}
                  <div className="hidden lg:block">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-amber-600 font-bold text-xs uppercase tracking-widest">
                        {t.status}
                      </span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                      {lang === "ar"
                        ? selectedBlog.title
                        : selectedBlog.title_en || selectedBlog.title}
                    </h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                      <Calendar size={16} />{" "}
                      {formatDate(selectedBlog.created_at)}
                    </div>
                  </div>

                  {/* Shared Description */}
                  <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                    {lang === "ar"
                      ? selectedBlog.description
                      : selectedBlog.description_en || selectedBlog.description}
                  </p>

                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-amber-500 transition-all"
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
    </main>
  );
};

export default BlogPage;
