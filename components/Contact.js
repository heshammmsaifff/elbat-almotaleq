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
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

const ContactPage = () => {
  const { lang } = useLanguage();
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
          email: formData.email || null,
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
    <div
      className="min-h-screen bg-slate-50 pt-32 pb-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            {lang === "ar" ? (
              <>
                تواصل <span className="text-amber-500">معنا</span>
              </>
            ) : (
              <>
                Contact <span className="text-amber-500">Us</span>
              </>
            )}
          </motion.h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            {lang === "ar"
              ? "نحن هنا للإجابة على استفساراتكم وتحويل أفكاركم إلى واقع. أرسل لنا رسالة وسنقوم بالرد عليك في أقرب وقت ممكن."
              : "We are here to answer your inquiries and turn your ideas into reality. Send us a message and we will get back to you as soon as possible."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* معلومات التواصل الجانبية */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                {lang === "ar" ? "معلومات الاتصال" : "Contact Information"}
              </h3>

              {/* قسم الاتصال الهاتفي */}
              <a
                href="tel:+966562602106"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">
                    {lang === "ar" ? "اتصل بنا" : "Call Us"}
                  </p>
                  <p
                    className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors"
                    dir="ltr"
                  >
                    +966 56 260 2106
                  </p>
                </div>
              </a>

              {/* قسم واتساب */}
              <a
                href="https://wa.me/966562602106"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">
                    {lang === "ar" ? "واتساب" : "WhatsApp"}
                  </p>
                  <p
                    className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors"
                    dir="ltr"
                  >
                    +966 56 260 2106
                  </p>
                </div>
              </a>

              {/* قسم البريد الإلكتروني */}
              <a
                href="mailto:info@albayt-almutaalek.com"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">
                    {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </p>
                  <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    info@albayt-almutaalek.com
                  </p>
                </div>
              </a>

              {/* قسم الموقع */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">
                    {lang === "ar" ? "المقر الرئيسي" : "Headquarters"}
                  </p>
                  <p className="font-bold text-slate-800 leading-relaxed">
                    {lang === "ar"
                      ? "المملكة العربية السعودية، الرياض"
                      : "Riyadh, Saudi Arabia"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* نموذج المراسلة */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-slate-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* الاسم */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-bold text-slate-700 ${
                        lang === "ar" ? "mr-2" : "ml-2"
                      }`}
                    >
                      {lang === "ar" ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value })
                      }
                      placeholder={
                        lang === "ar"
                          ? "أدخل اسمك الكريم"
                          : "Enter your full name"
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {/* رقم الجوال */}
                  <div className="space-y-2">
                    <label
                      className={`text-sm font-bold text-slate-700 ${
                        lang === "ar" ? "mr-2" : "ml-2"
                      }`}
                    >
                      {lang === "ar" ? "رقم الجوال *" : "Phone Number *"}
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
                      className={`w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}
                    />
                  </div>
                </div>

                {/* البريد الإلكتروني */}
                <div className="space-y-2">
                  <label
                    className={`text-sm font-bold text-slate-700 ${
                      lang === "ar" ? "mr-2" : "ml-2"
                    }`}
                  >
                    {lang === "ar"
                      ? "البريد الإلكتروني (اختياري)"
                      : "Email Address (Optional)"}
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
                  <label
                    className={`text-sm font-bold text-slate-700 ${
                      lang === "ar" ? "mr-2" : "ml-2"
                    }`}
                  >
                    {lang === "ar" ? "تفاصيل الرسالة *" : "Message Details *"}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={
                      lang === "ar"
                        ? "بماذا يمكننا مساعدتك؟"
                        : "How can we help you?"
                    }
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
                        {lang === "ar"
                          ? "تم إرسال رسالتك بنجاح، سنتواصل معك قريباً!"
                          : "Your message has been sent successfully, we will contact you soon!"}
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
                        {lang === "ar"
                          ? "عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً."
                          : "Sorry, an error occurred while sending. Please try again later."}
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
                      <span>
                        {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
                      </span>
                      <Send
                        size={20}
                        className={lang === "en" ? "rotate-180" : ""}
                      />
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
