"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Send, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "خدماتنا", href: "/services" },
    { name: "معلومات عنا", href: "/about" },
    { name: "المشاريع", href: "/projects" },
    { name: "تواصل معنا", href: "/contact", isButton: true },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        scrolled ? "py-2 mt-2" : "py-4 mt-0"
      }`}
      dir="rtl"
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-lg rounded-2xl border border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={130}
                height={50}
                className="object-contain h-auto w-24 md:w-32"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group px-4 py-2"
              >
                <span
                  className={`text-lg font-bold transition-colors duration-300 ${
                    link.isButton
                      ? "bg-amber-500 text-white px-7 py-2.5 rounded-full hover:bg-amber-600 shadow-md shadow-amber-200 block"
                      : scrolled
                      ? "text-gray-800 hover:text-amber-600"
                      : "text-gray-900 hover:text-amber-600"
                  }`}
                >
                  {link.name}
                </span>

                {!link.isButton && (
                  <span className="absolute bottom-1 right-4 left-4 h-0.5 bg-amber-500 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className={`p-2 rounded-xl transition-colors ${
                scrolled
                  ? "bg-amber-50 text-amber-600"
                  : "bg-white/20 text-gray-900 backdrop-blur-md border border-white/30"
              }`}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar System */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  className="object-contain"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-amber-50 text-gray-500 hover:text-amber-600 transition-colors"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Sidebar Links (Scrollable Area) */}
              {/* Note: Scrollbar styles moved to global CSS to avoid hydration error */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-6">
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl text-lg font-bold transition-all ${
                          link.isButton
                            ? "bg-amber-500 text-white shadow-lg shadow-amber-100 mt-4 active:scale-95"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-transparent hover:border-amber-100"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {link.name}
                        </span>
                        {link.isButton ? (
                          <Send size={18} />
                        ) : (
                          <ArrowLeft size={18} className="opacity-30" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <p className="text-sm text-gray-400 text-center font-medium">
                  © 2024 جميع الحقوق محفوظة
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
