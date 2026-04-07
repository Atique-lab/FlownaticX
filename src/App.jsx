import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import BusinessTypes from "./components/BusinessTypes";
import Services from "./components/Services";
import UseCases from "./components/UseCases";
import Portfolio from "./components/Portfolio";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import FloatingCTA from "./components/FloatingCTA";


export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />
      <Stats />
      <BusinessTypes />
      <Services />
      <UseCases />
      <Portfolio />
      <Pricing />
      <Testimonials />
      <CTA />
      <FloatingCTA />
    </>
  );
}