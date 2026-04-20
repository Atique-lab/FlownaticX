import { lazy, Suspense } from "react";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import BusinessTypes from "./components/BusinessTypes";
import Services from "./components/Services";
const UseCases = lazy(() => import("./components/UseCases"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Pricing = lazy(() => import("./components/Pricing"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const CTA = lazy(() => import("./components/CTA"));
const FloatingCTA = lazy(() => import("./components/FloatingCTA"));


export default function App() {
  return (
    <div className="app-shell">
      <CursorGlow />
      <Navbar />
      <Hero />
      <Stats />
      <BusinessTypes />
      <Services />
      <Suspense fallback={null}>
        <UseCases />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <CTA />
        <FloatingCTA />
      </Suspense>
    </div>
  );
}
