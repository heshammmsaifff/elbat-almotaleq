"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Calendar,
  Sparkles,
  Newspaper,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

const LatestBlogs = () => {
  const { lang } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const dict = {
    ar: {
      heading: "آخر",
      headingAccent: "المقالات",
      subheading: "اكتشف أحدث المقالات والنصائح من خبرائنا في المجال.",
      viewAll: "مشاهدة جميع المقالات",
      details: "قراءة المزيد",
      status: "مقال جديد",
      close: "إغلاق المقال",
      loading: "جاري التحميل...",
      date: "تاريخ النشر",
      emptyTitle: "مدونتنا قيد التجهيز",
      emptyDesc:
        "نحن نعمل على كتابة محتوى قيم يليق بكم. تابعنا قريباً لتكون أول من يقرأ أحدث نصائحنا وتقاريرنا.",
      notifyMe: "اشترك لتصلك التحديثات",
    },
    en: {
      heading: "Latest",
      headingAccent: "Articles",
      subheading:
        "Discover the latest insights, news, and tips from our experts.",
      viewAll: "View All Blogs",
      details: "Read More",
      status: "New Post",
      close: "Close Article",
      loading: "Loading...",
      date: "Published on",
      emptyTitle: "Our Blog is Brewing",
      emptyDesc:
        "We're currently crafting high-quality content for you. Stay tuned to be the first to read our latest insights and industry tips.",
      notifyMe: "Notify Me On Launch",
    },
  };

  const t = dict[lang] || dict["ar"];

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
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
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              {t.heading}{" "}
              <span className="text-amber-500">{t.headingAccent}</span>
            </h2>
            <p className="text-slate-500 max-w-xl text-lg">{t.subheading}</p>
          </div>
          {blogs.length > 0 && (
            <Link
              href="/blogs"
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
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedBlog(blog)}
                className="group cursor-pointer"
              >
                <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-md border border-slate-100 transition-all duration-500 group-hover:shadow-2xl">
                  <Image
                    src={blog.images_urls?.[0] || "/placeholder-blog.jpg"}
                    alt={lang === "ar" ? blog.title : blog.title_en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                    <span className="text-amber-400 text-sm font-bold mb-2 flex items-center gap-2">
                      <Calendar size={14} /> {formatDate(blog.created_at)}
                    </span>
                    <h3 className="text-white text-xl font-bold mb-3 line-clamp-2">
                      {lang === "ar" ? blog.title : blog.title_en || blog.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                      <BookOpen size={18} /> {t.details}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* --- ENHANCED EMPTY STATE --- */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-16 text-center"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <Newspaper size={200} className="text-white rotate-12" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-8">
                <Sparkles size={40} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                {t.emptyTitle}
              </h3>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                {t.emptyDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-slate-900 font-black rounded-2xl hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
                >
                  {t.notifyMe}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* --- Modal Window (remains same logic, optimized UI) --- */}
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
              <button
                onClick={() => setSelectedBlog(null)}
                className={`fixed md:absolute top-4 ${
                  lang === "ar" ? "left-4" : "right-4"
                } z-[150] p-3 bg-white/90 rounded-full shadow-xl hover:text-red-500 transition-all`}
              >
                <X size={24} />
              </button>

              {/* Mobile Header (Visible only on small screens) */}
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
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">
                      {lang === "ar"
                        ? selectedBlog.title
                        : selectedBlog.title_en || selectedBlog.title}
                    </h2>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                      <Calendar size={16} />{" "}
                      {formatDate(selectedBlog.created_at)}
                    </div>
                  </div>

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
    </section>
  );
};

export default LatestBlogs;
