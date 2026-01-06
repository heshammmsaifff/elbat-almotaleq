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

const AboutPage = () => {
  const stats = [
    {
      label: "مشروع مكتمل",
      value: "+150",
      icon: <Award className="text-amber-500" size={"50px"} />,
    },
    {
      label: "عميل سعيد",
      value: "+120",
      icon: <Users className="text-blue-500" size={"50px"} />,
    },
    {
      label: "سنة خبرة",
      value: "+10",
      icon: <ShieldCheck className="text-emerald-500" size={"50px"} />,
    },
    {
      label: "مهندس وخبير",
      value: "+25",
      icon: <HardHat className="text-purple-500" size={"50px"} />,
    },
  ];

  const values = [
    {
      title: "الجودة والإتقان",
      desc: "نلتزم بأعلى المعايير العالمية في اختيار المواد ودقة التنفيذ لضمان استدامة أعمالنا.",
      icon: <ShieldCheck size={32} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "الابتكار في التصميم",
      desc: "لا نكتفي بالتقليد، بل نبتكر حلولاً تصميمية فريدة تعكس شخصية صاحب المكان.",
      icon: <Lightbulb size={32} />,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "تلبية الرؤية",
      desc: "نحن بارعون في تحويل أي تصميم تراه على الإنترنت إلى واقع ملموس في منزلك.",
      icon: <Target size={32} />,
      color: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <main className="min-h-screen bg-white pt-24 pb-20" dir="rtl">
      {/* Section 1: Hero About */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              نحن في <span className="text-amber-500">البيت المتألق</span>{" "}
              <br />
              نصنع للمكان روحاً وقصة
            </h1>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                تأسست مؤسسة <strong>البيت المتألق</strong> لتكون شريككم الموثوق
                في رحلة بناء وتجميل مساحاتكم الخاصة. نحن مؤسسة سعودية متخصصة في
                أعمال الديكور الداخلي والخارجي وتنسيق الحدائق.
              </p>
              <p>
                نؤمن بأن كل زاوية في منزلك تستحق الاهتمام، لذلك نسخر خبرات
                مهندسينا ومصممينا لتحويل رؤيتكم إلى واقع يفوق التوقعات، معتمدين
                على أحدث التقنيات وأجود الخامات.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
          >
            <Image
              src="/services/interior.jpg" // استبدلها بصورة لمكتبكم أو فريق العمل
              alt="عن البيت المتألق"
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
            قيمنا التي نحيا بها
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            المبادئ التي تحكم كل مسمار نضعه وكل خط نرسمه في مشاريعنا.
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
              هل أنت جاهز لتجعل منزلك متألقاً؟
            </h2>
            <p className="text-amber-100 text-lg mb-10 max-w-xl mx-auto">
              فريقنا الهندسي في انتظارك لتقديم الاستشارة الأنسب لمساحتك
              وميزانيتك.
            </p>
            <div className="flex flex-col  sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white cursor-pointer text-amber-500 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">
                  احجز استشارتك الآن
                </button>
              </Link>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400 rounded-full -mr-32 -mt-32 opacity-50 shadow-inner"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-600 rounded-full -ml-20 -mb-20 opacity-50 shadow-inner"></div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
