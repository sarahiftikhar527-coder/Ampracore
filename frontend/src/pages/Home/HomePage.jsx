import React, { useEffect } from "react";
import Hero from "./sections/Hero/Hero.jsx";
import Services from "./sections/Services/services.jsx";
import ScrollColorReveal from "./sections/ScrollColorReveal/ScrollColorReveal";
import WhatWeDo from "./sections/WhatWeDo/WhatWeDo.jsx";
import MissionVision from "./sections/MissionVision/MissionVision.jsx";
import ServicesShowcase from "./sections/ServicesShowcase/ServicesShowcase.jsx";
import InsightsUpdates from "./sections/InsightsUpdates/InsightsUpdates.jsx";
import Contact from "../../pages/Contact/Contact.jsx";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Ampracore | Building the Future of Digital Innovation";
  }, []);

  return (
    <main className="home-page">
      <Hero />
      <Services />
      <ScrollColorReveal />
      <WhatWeDo />
      <MissionVision />
      <ServicesShowcase />
      <InsightsUpdates />
      <Contact />
      {/* Baaki sections yahan add karo:
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
      */}
    </main>
  );
}