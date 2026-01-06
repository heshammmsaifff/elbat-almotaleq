"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase"; // تأكد من صحة المسار حسب مشروعك

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          email: formData.email || null, // البريد اختياري
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setFormData({ full_name: "", phone_number: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            تواصل <span className="text-amber-500">معنا</span>
          </motion.h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتكم وتحويل أفكاركم إلى واقع. أرسل لنا
            رسالة وسنقوم بالرد عليك في أقرب وقت ممكن.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* معلومات التواصل الجانبية */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                معلومات الاتصال
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">اتصل بنا</p>
                  <p className="font-bold text-slate-800" dir="ltr">
                    +966 50 XXX XXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">
                    البريد الإلكتروني
                  </p>
                  <p className="font-bold text-slate-800">
                    info@albaytalmutaaliq.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">المقر الرئيسي</p>
                  <p className="font-bold text-slate-800 leading-relaxed">
                    المملكة العربية السعودية، جدة
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* نموذج المراسلة */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-slate-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* الاسم */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 mr-2">
                      الاسم الكامل *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      placeholder="أدخل اسمك الكريم"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {/* رقم الجوال */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 mr-2">
                      رقم الجوال *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_number: e.target.value,
                        })
                      }
                      placeholder="05XXXXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-right"
                    />
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="example@mail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* الرسالة */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">
                    تفاصيل الرسالة *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="بماذا يمكننا مساعدتك؟"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* رسائل الحالة */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-100"
                    >
                      <CheckCircle2 size={20} />
                      <span className="text-sm font-bold">
                        تم إرسال رسالتك بنجاح، سنتواصل معك قريباً!
                      </span>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100"
                    >
                      <AlertCircle size={20} />
                      <span className="text-sm font-bold">
                        عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-amber-200 flex items-center justify-center gap-3 active:scale-95"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      <span>إرسال الرسالة</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
