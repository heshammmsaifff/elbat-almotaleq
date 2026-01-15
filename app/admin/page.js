"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import imageCompression from "browser-image-compression";
import {
  Lock,
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  LogOut,
  Upload,
  Trash2,
  Loader2,
  Globe,
  BookOpen, // New icon for blogs
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("projects");

  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]); // Blogs State

  const [formData, setFormData] = useState({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const fetchData = async () => {
    try {
      const { data: msgData } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: prjData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      const { data: blgData } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      setMessages(msgData || []);
      setProjects(prjData || []);
      setBlogs(blgData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await supabase
        .from("app_pass")
        .select("password_hash")
        .eq("password_hash", password)
        .single();

      if (data) {
        setIsLoggedIn(true);
        sessionStorage.setItem("isAdmin", "true");
        fetchData();
      } else {
        setError("كلمة المرور غير صحيحة!");
      }
    } catch (err) {
      setError("فشل الاتصال بقاعدة البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  // Generic Image Processing
  const processAndUploadImages = async (folder) => {
    const uploadedUrls = [];
    const compressionOptions = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      fileType: "image/webp",
    };

    for (const file of selectedFiles) {
      try {
        const compressedFile = await imageCompression(file, compressionOptions);
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.webp`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("projects") // Using your existing bucket
          .upload(filePath, compressedFile, {
            contentType: "image/webp",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("projects").getPublicUrl(filePath);
        uploadedUrls.push(publicUrl);
      } catch (err) {
        console.error("Image processing error:", err);
      }
    }
    return uploadedUrls;
  };

  // Handle Add (Project or Blog)
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0)
      return alert("يرجى اختيار صورة واحدة على الأقل");

    setLoading(true);
    const table = activeTab === "projects" ? "projects" : "blogs";
    const folder = activeTab === "projects" ? "project-images" : "blog-images";

    try {
      const imageUrls = await processAndUploadImages(folder);
      const { error } = await supabase.from(table).insert([
        {
          title: formData.title_ar,
          title_en: formData.title_en,
          description: formData.description_ar,
          description_en: formData.description_en,
          images_urls: imageUrls,
        },
      ]);

      if (error) throw error;

      alert(
        activeTab === "projects"
          ? "تم رفع المشروع بنجاح"
          : "تم نشر المقال بنجاح"
      );
      setFormData({
        title_ar: "",
        title_en: "",
        description_ar: "",
        description_en: "",
      });
      setSelectedFiles([]);
      fetchData();
    } catch (error) {
      alert("حدث خطأ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Logic
  const deleteItem = async (item, type) => {
    const confirmMsg =
      type === "projects"
        ? "هل أنت متأكد من حذف المشروع؟"
        : "هل أنت متأكد من حذف المقال؟";
    if (!confirm(confirmMsg)) return;

    setLoading(true);
    try {
      if (item.images_urls?.length > 0) {
        const folder = type === "projects" ? "project-images" : "blog-images";
        const filesToRemove = item.images_urls.map((url) => {
          const parts = url.split(`${folder}/`);
          return `${folder}/${parts[parts.length - 1]}`;
        });
        await supabase.storage.from("projects").remove(filesToRemove);
      }
      const { error } = await supabase.from(type).delete().eq("id", item.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      alert("خطأ أثناء الحذف: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-slate-100 flex items-center justify-center p-4"
        dir="rtl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-200"
        >
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-center text-slate-900 mb-8">
            دخول الإدارة
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="أدخل كلمة المرور"
              autoFocus
              className={`w-full p-4 bg-slate-50 border ${
                error ? "border-red-500" : "border-slate-200"
              } rounded-xl outline-none focus:ring-2 focus:ring-amber-500 text-center font-bold`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-500 text-sm text-center font-bold animate-bounce">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-amber-500 transition-all flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "دخول"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative z-[100]"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-400 p-8 flex flex-col shadow-2xl md:sticky md:top-0 md:h-screen z-50">
        <div className="text-white font-black text-2xl mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} className="text-slate-900" />
          </div>
          لوحة التحكم
        </div>
        <nav className="space-y-3 flex-grow">
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
              activeTab === "projects"
                ? "bg-amber-500 text-slate-900"
                : "hover:bg-slate-800"
            }`}
          >
            <PlusCircle size={20} /> إدارة المشاريع
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
              activeTab === "blogs"
                ? "bg-amber-500 text-slate-900"
                : "hover:bg-slate-800"
            }`}
          >
            <BookOpen size={20} /> إدارة المدونة
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
              activeTab === "messages"
                ? "bg-amber-500 text-slate-900"
                : "hover:bg-slate-800"
            }`}
          >
            <MessageSquare size={20} /> الرسائل ({messages.length})
          </button>
        </nav>
        <button
          onClick={() => {
            sessionStorage.clear();
            setIsLoggedIn(false);
          }}
          className="flex items-center gap-3 p-4 hover:text-red-400 transition-all mt-10 font-bold"
        >
          <LogOut size={20} /> تسجيل الخروج
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {activeTab === "messages" ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-black">رسائل العملاء</h2>
              <div className="grid gap-4">
                {messages.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed text-slate-400 font-bold">
                    لا توجد رسائل حالياً
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-amber-500"></div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-black text-lg">{m.full_name}</h3>
                          <p className="text-amber-600 font-bold text-sm">
                            {m.phone_number}
                          </p>
                        </div>
                        <span className="text-slate-400 text-xs">
                          {new Date(m.created_at).toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                      <p className="text-slate-600 bg-slate-50 p-4 rounded-xl text-sm leading-relaxed">
                        {m.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Form Section */}
              <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
                <h2 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-3">
                  <PlusCircle className="text-amber-500" size={28} />
                  {activeTab === "projects"
                    ? "إضافة مشروع جديد"
                    : "إضافة مقال جديد"}
                </h2>
                <form onSubmit={handleAddItem} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-6 bg-slate-50 rounded-3xl border">
                      <div className="flex items-center gap-2 text-amber-600 font-bold">
                        <Globe size={18} /> بالعربية
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="العنوان"
                        className="w-full p-4 border rounded-2xl outline-none focus:border-amber-500"
                        value={formData.title_ar}
                        onChange={(e) =>
                          setFormData({ ...formData, title_ar: e.target.value })
                        }
                      />
                      <textarea
                        required
                        placeholder="الوصف أو محتوى المقال"
                        rows={5}
                        className="w-full p-4 border rounded-2xl outline-none focus:border-amber-500"
                        value={formData.description_ar}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description_ar: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div
                      className="space-y-4 p-6 bg-blue-50/50 rounded-3xl border"
                      dir="ltr"
                    >
                      <div className="flex items-center gap-2 text-blue-600 font-bold">
                        <Globe size={18} /> English
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="Title"
                        className="w-full p-4 border rounded-2xl outline-none focus:border-blue-500"
                        value={formData.title_en}
                        onChange={(e) =>
                          setFormData({ ...formData, title_en: e.target.value })
                        }
                      />
                      <textarea
                        required
                        placeholder="Description or Blog Content"
                        rows={5}
                        className="w-full p-4 border rounded-2xl outline-none focus:border-blue-500"
                        value={formData.description_en}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description_en: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="relative border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center bg-slate-50 hover:bg-amber-50 transition-all">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                      onChange={(e) =>
                        setSelectedFiles(Array.from(e.target.files))
                      }
                    />
                    <Upload className="text-amber-500 mb-2" size={32} />
                    <p className="font-bold text-slate-600">
                      اسحب الصور أو اضغط هنا
                    </p>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedFiles.map((file, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-amber-500 text-white rounded-lg text-xs font-bold"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    disabled={loading}
                    className="w-full md:w-auto bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-amber-500 transition-all shadow-lg"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" />
                    ) : activeTab === "projects" ? (
                      "نشر المشروع"
                    ) : (
                      "نشر المقال"
                    )}
                  </button>
                </form>
              </section>

              {/* List Section */}
              <section className="space-y-4">
                <h2 className="text-xl font-black">
                  {activeTab === "projects"
                    ? `المشاريع الحالية (${projects.length})`
                    : `المقالات الحالية (${blogs.length})`}
                </h2>
                <div className="grid gap-4">
                  {(activeTab === "projects" ? projects : blogs).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl flex items-center justify-between border shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-slate-100">
                          <Image
                            src={item.images_urls?.[0] || "/placeholder.jpg"}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">{item.title}</h3>
                          <p className="text-slate-400 text-xs">
                            {new Date(item.created_at).toLocaleDateString(
                              "ar-EG"
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteItem(item, activeTab)}
                        className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
