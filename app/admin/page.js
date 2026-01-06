"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import imageCompression from "browser-image-compression"; // مكتبة ضغط الصور
import {
  Lock,
  LayoutDashboard,
  MessageSquare,
  PlusCircle,
  LogOut,
  Upload,
  Trash2,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  // حالات البيانات
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [selectedFiles, setSelectedFiles] = useState([]); // تخزين الملفات المختارة من الجهاز

  // --- 1. نظام تسجيل الدخول ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("app_pass")
      .select("password_hash")
      .eq("password_hash", password)
      .single();

    if (data) {
      setIsLoggedIn(true);
      sessionStorage.setItem("isAdmin", "true");
      fetchData();
    } else {
      alert("كلمة المرور غير صحيحة!");
    }
    setLoading(false);
  };

  const fetchData = async () => {
    const { data: msgData } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    const { data: prjData } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(msgData || []);
    setProjects(prjData || []);
  };

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  // --- 2. وظيفة معالجة ورفع الصور ---
  const uploadImagesToStorage = async () => {
    const uploadedUrls = [];
    const compressionOptions = {
      maxSizeMB: 0.8, // ضغط الصورة لتكون أقل من 1 ميجا
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };

    for (const file of selectedFiles) {
      try {
        // أ. ضغط الصورة قبل الرفع
        const compressedFile = await imageCompression(file, compressionOptions);

        // ب. إنشاء اسم فريد للملف
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `project-images/${Date.now()}_${fileName}`;

        // ج. الرفع إلى Bucket (projects)
        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(filePath, compressedFile);

        if (uploadError) throw uploadError;

        // د. الحصول على الرابط العمومي
        const {
          data: { publicUrl },
        } = supabase.storage.from("projects").getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      } catch (err) {
        console.error("خطأ في معالجة الصورة:", err);
      }
    }
    return uploadedUrls;
  };

  // --- 3. حفظ المشروع النهائي ---
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0)
      return alert("يرجى اختيار صورة واحدة على الأقل");

    setLoading(true);
    try {
      // رفع الصور أولاً والحصول على روابطها
      const imageUrls = await uploadImagesToStorage();

      // إدراج البيانات في الجدول
      const { error } = await supabase.from("projects").insert([
        {
          title: formData.title,
          description: formData.description,
          images_urls: imageUrls,
        },
      ]);

      if (error) throw error;

      alert("تم نشر المشروع بنجاح!");
      setFormData({ title: "", description: "" });
      setSelectedFiles([]);
      fetchData();
    } catch (error) {
      alert("حدث خطأ أثناء الحفظ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id, imageUrls) => {
    if (confirm("هل أنت متأكد من حذف هذا المشروع نهائياً؟")) {
      // ملاحظة: يفضل أيضاً حذف الصور من Storage هنا لزيادة التنظيف
      await supabase.from("projects").delete().eq("id", id);
      fetchData();
    }
  };

  // --- واجهة تسجيل الدخول ---
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-slate-100 flex items-center justify-center p-4"
        dir="rtl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-md border border-slate-200"
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
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-amber-500 transition-all flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "دخول"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col md:flex-row"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-400 p-8 flex flex-col shadow-2xl">
        <div className="text-white font-black text-2xl mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={20} className="text-slate-900" />
          </div>
          البيت المتألق
        </div>
        <nav className="space-y-3 flex-grow">
          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
              activeTab === "projects"
                ? "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20"
                : "hover:bg-slate-800"
            }`}
          >
            <PlusCircle size={20} /> إدارة المشاريع
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
              activeTab === "messages"
                ? "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20"
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

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        {activeTab === "projects" ? (
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Form Section */}
            <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="text-2xl font-black mb-8 text-slate-900 flex items-center gap-3">
                <PlusCircle className="text-amber-500" size={28} /> إضافة عمل
                جديد
              </h2>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 mr-2">
                    عنوان المشروع
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="مثال: ديكور داخلي فيلا مودرن"
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-amber-500 transition-all"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 mr-2">
                    وصف التفاصيل
                  </label>
                  <textarea
                    required
                    placeholder="اكتب تفاصيل المشروع وما تم تنفيذه..."
                    rows={4}
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-amber-500 transition-all"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Image Upload Area */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 mr-2">
                    صور المشروع (الرفع من الجهاز)
                  </label>
                  <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-amber-50 transition-all group cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) =>
                        setSelectedFiles(Array.from(e.target.files))
                      }
                    />
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="text-amber-500" size={28} />
                    </div>
                    <p className="font-bold text-slate-700">
                      اضغط أو اسحب الصور هنا
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      سيتم ضغط الصور تلقائياً للحفاظ على الأداء
                    </p>
                  </div>

                  {/* Preview Selected Files */}
                  {selectedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {selectedFiles.map((file, i) => (
                        <div
                          key={i}
                          className="px-4 py-2 bg-amber-500 text-slate-900 rounded-xl text-xs font-black flex items-center gap-2"
                        >
                          <ImageIcon size={14} /> {file.name.substring(0, 10)}
                          ...
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  disabled={loading}
                  className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-amber-500 hover:text-slate-900 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "رفع ونشر المشروع"
                  )}
                </button>
              </form>
            </section>

            {/* Projects Management List */}
            <section className="space-y-6">
              <h2 className="text-xl font-black text-slate-900 mr-2">
                المشاريع المنشورة حالياً ({projects.length})
              </h2>
              <div className="grid gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white p-5 rounded-3xl flex items-center justify-between border border-slate-200 group hover:border-amber-200 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 relative rounded-2xl overflow-hidden bg-slate-100">
                        <Image
                          src={p.images_urls[0] || "/placeholder.jpg"}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900">{p.title}</h3>
                        <p className="text-slate-400 text-xs mt-1">
                          {p.images_urls.length} صور مرفوعة
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Messages Tab Content */
          <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="text-2xl font-black mb-8 text-slate-900">
              بريد العملاء الوارد
            </h2>
            <div className="grid gap-6">
              {messages.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <MessageSquare
                    size={48}
                    className="mx-auto text-slate-200 mb-4"
                  />
                  <p className="text-slate-400 font-bold">
                    لا توجد رسائل جديدة حالياً
                  </p>
                </div>
              ) : (
                messages.map((m) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id}
                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-black text-xl text-slate-900 mb-1">
                          {m.full_name}
                        </h3>
                        <p className="text-amber-600 font-black flex items-center gap-2">
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                          {m.phone_number}
                        </p>
                      </div>
                      <span className="bg-slate-50 text-slate-400 px-4 py-2 rounded-full text-xs font-bold">
                        {new Date(m.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl text-slate-600 leading-relaxed text-sm">
                      {m.message}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
