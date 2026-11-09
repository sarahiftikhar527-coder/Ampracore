import React, { useEffect } from "react";

import ErpCrmHero from "./sections/ErpCrmHero";
import ErpCrmWorkflow from "./sections/ErpCrmWorkflow";
import ErpCrmWhy from "./sections/ErpCrmWhy";
import ErpCrmInsights from "./sections/ErpCrmInsights";
import ErpCrmModules from "./sections/ErpCrmModules";
import ErpCrmTracking from "./sections/ErpCrmTracking";


import "./erpcrm.css";

export default function ErpCrmPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main className="ec">
      <ErpCrmHero />
      <ErpCrmWorkflow />
      <ErpCrmWhy />
      <ErpCrmInsights />
      <ErpCrmModules />
      <ErpCrmTracking />
  
    </main>
  );
}