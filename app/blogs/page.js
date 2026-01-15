"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Tag,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

const BlogPage = () => {
  const { lang } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const dict = {
    ar: {
      title: "المدونة",
      subtitle: "استكشف أحدث المقالات، النصائح، والتحديثات من فريق عملنا.",
      searchPlaceholder: "ابحث عن مقال...",
      categories: ["الكل", "تقنية", "تصميم", "أخبار"],
      readMore: "اقرأ المزيد",
      noResults: "لم يتم العثور على مقالات تطابق بحثك.",
      all: "الكل",
    },
    en: {
      title: "Our Blog",
      subtitle: "Explore the latest articles, tips, and updates from our team.",
      searchPlaceholder: "Search for an article...",
      categories: ["All", "Tech", "Design", "News"],
      readMore: "Read More",
      noResults: "No articles found matching your search.",
      all: "All",
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
        setFilteredBlogs(data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = blogs;

    if (searchQuery) {
      result = result.filter(
        (blog) =>
          blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.title_en?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory !== "All" && activeCategory !== "الكل") {
      result = result.filter((blog) => blog.category === activeCategory);
    }

    setFilteredBlogs(result);
  }, [searchQuery, activeCategory, blogs]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      lang === "ar" ? "ar-EG" : "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <main
      className="min-h-screen bg-slate-50"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* --- Hero Section --- */}
      <section className="bg-slate-500 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-black mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-black font-bold text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {/* --- Filter Bar --- */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/3">
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className={`w-full ${
                lang === "ar" ? "pr-12" : "pl-12"
              } py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-amber-500 transition-all`}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full no-scrollbar pb-2 md:pb-0">
            {t.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Blogs Grid --- */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-amber-500 mb-4" size={48} />
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
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

                  {/* For a full page, usually we link to a dynamic route like /blog/[id] */}
                  <Link
                    href={`/blog/${blog.id}`}
                    className="flex items-center gap-2 font-bold text-slate-900 group-hover:gap-4 transition-all"
                  >
                    {t.readMore}
                    {lang === "ar" ? (
                      <ArrowLeft size={18} />
                    ) : (
                      <ArrowRight size={18} />
                    )}
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-xl">{t.noResults}</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogPage;
