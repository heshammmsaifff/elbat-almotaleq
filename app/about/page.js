"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ShieldCheck,
  Target,
  Lightbulb,
  Users,
  Award,
  HardHat,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const AboutPage = () => {
  const { lang } = useLanguage();

  const stats = [
    {
      label: lang === "ar" ? "مشروع مكتمل" : "Completed Projects",
      value: "+150",
      icon: <Award className="text-amber-500" size={"50px"} />,
    },
    {
      label: lang === "ar" ? "عميل سعيد" : "Happy Clients",
      value: "+120",
      icon: <Users className="text-blue-500" size={"50px"} />,
    },
    {
      label: lang === "ar" ? "سنة خبرة" : "Years of Experience",
      value: "+10",
      icon: <ShieldCheck className="text-emerald-500" size={"50px"} />,
    },
    {
      label: lang === "ar" ? "مهندس وخبير" : "Engineers & Experts",
      value: "+25",
      icon: <HardHat className="text-purple-500" size={"50px"} />,
    },
  ];

  const values = [
    {
      title: lang === "ar" ? "الجودة والإتقان" : "Quality & Mastery",
      desc:
        lang === "ar"
          ? "نلتزم بأعلى المعايير العالمية في اختيار المواد ودقة التنفيذ لضمان استدامة أعمالنا."
          : "We adhere to the highest international standards in material selection and execution precision to ensure the sustainability of our work.",
      icon: <ShieldCheck size={32} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: lang === "ar" ? "الابتكار في التصميم" : "Innovation in Design",
      desc:
        lang === "ar"
          ? "لا نكتفي بالتقليد، بل نبتكر حلولاً تصميمية فريدة تعكس شخصية صاحب المكان."
          : "We don't just imitate; we create unique design solutions that reflect the personality of the space owner.",
      icon: <Lightbulb size={32} />,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: lang === "ar" ? "تلبية الرؤية" : "Fulfilling the Vision",
      desc:
        lang === "ar"
          ? "نحن بارعون في تحويل أي تصميم تراه على الإنترنت إلى واقع ملموس في منزلك."
          : "We are experts at turning any design you see online into a tangible reality in your home.",
      icon: <Target size={32} />,
      color: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <main
      className="min-h-screen bg-white pt-24 pb-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Section 1: Hero About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              {lang === "ar" ? (
                <>
                  نحن في <span className="text-amber-500">البيت المتألق</span>{" "}
                  <br />
                  نصنع للمكان روحاً وقصة
                </>
              ) : (
                <>
                  At <span className="text-amber-500">The Shining House</span>{" "}
                  <br />
                  We create soul and story for spaces
                </>
              )}
            </h1>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                {lang === "ar" ? (
                  <>
                    تأسست مؤسسة <strong>البيت المتألق</strong> لتكون شريككم
                    الموثوق في رحلة بناء وتجميل مساحاتكم الخاصة. نحن مؤسسة
                    سعودية متخصصة في أعمال الديكور الداخلي والخارجي وتنسيق
                    الحدائق.
                  </>
                ) : (
                  <>
                    <strong>The Shining House</strong> was established to be
                    your trusted partner in the journey of building and
                    beautifying your private spaces. We are a Saudi institution
                    specialized in interior and exterior decoration and
                    landscaping.
                  </>
                )}
              </p>
              <p>
                {lang === "ar"
                  ? "نؤمن بأن كل زاوية في منزلك تستحق الاهتمام، لذلك نسخر خبرات مهندسينا ومصممينا لتحويل رؤيتكم إلى واقع يفوق التوقعات، معتمدين على أحدث التقنيات وأجود الخامات."
                  : "We believe that every corner of your home deserves attention. Therefore, we harness the expertise of our engineers and designers to turn your vision into a reality that exceeds expectations, relying on the latest technologies and finest materials."}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-500 ${
              lang === "ar"
                ? "rotate-2 hover:rotate-0"
                : "-rotate-2 hover:rotate-0"
            }`}
          >
            <Image
              src="/services/interior.jpg"
              alt={
                lang === "ar" ? "عن البيت المتألق" : "About Al-Bayt Al-Mutaaliq"
              }
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Stats */}
      <section className="bg-slate-900 py-20 my-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="inline-flex p-4 bg-slate-800 rounded-2xl mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            {lang === "ar" ? "قيمنا التي نحيا بها" : "The Values We Live By"}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            {lang === "ar"
              ? "المبادئ التي تحكم كل مسمار نضعه وكل خط نرسمه في مشاريعنا."
              : "The principles that govern every nail we drive and every line we draw in our projects."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div
                className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
              >
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                {value.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: Call to Action */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-amber-500 rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-amber-200 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {lang === "ar"
                ? "هل أنت جاهز لتجعل منزلك متألقاً؟"
                : "Are you ready to make your home shine?"}
            </h2>
            <p className="text-amber-100 text-lg mb-10 max-w-xl mx-auto">
              {lang === "ar"
                ? "فريقنا الهندسي في انتظارك لتقديم الاستشارة الأنسب لمساحتك وميزانيتك."
                : "Our engineering team is waiting for you to provide the best consultation for your space and budget."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white cursor-pointer text-amber-500 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">
                  {lang === "ar"
                    ? "احجز استشارتك الآن"
                    : "Book Your Consultation Now"}
                </button>
              </Link>
            </div>
          </div>
          {/* Decorative Circles */}
          <div
            className={`absolute top-0 ${
              lang === "ar" ? "right-0 -mr-32" : "left-0 -ml-32"
            } w-64 h-64 bg-amber-400 rounded-full -mt-32 opacity-50 shadow-inner`}
          ></div>
          <div
            className={`absolute bottom-0 ${
              lang === "ar" ? "left-0 -ml-20" : "right-0 -mr-20"
            } w-40 h-40 bg-amber-600 rounded-full -mb-20 opacity-50 shadow-inner`}
          ></div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
