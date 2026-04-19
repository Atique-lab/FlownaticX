import { lazy } from "react";
import Hero from "../components/Hero";

const Services = lazy(() => import("../components/Services"));
const Projects = lazy(() => import("../components/Projects"));
const Pricing = lazy(() => import("../components/Pricing"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const CTA = lazy(() => import("../components/CTA"));
const Contact = lazy(() => import("../components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Pricing />
      <Testimonials />
      <CTA />
      <Contact />
    </>
  );
}
