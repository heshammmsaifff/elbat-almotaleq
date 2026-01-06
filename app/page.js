import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import LatestProjects from "@/components/LatestProjects";

export default function page() {
  return (
    <>
      <Hero />
      <Process />
      <Services />
      <LatestProjects />
      <Contact />
    </>
  );
}
