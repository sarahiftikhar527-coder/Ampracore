import React, { useCallback, useEffect, useMemo, useState } from "react";
import { projects } from "../Portfolio/portfolioData";

import PortfolioHero from "./sections/PortfolioHero.jsx";
import PortfolioGrid from "./sections/PortfolioGrid.jsx";
import PortfolioCaseStudy from "./sections/PortfolioCaseStudy.jsx";


import "./portfolio.css";

export default function PortfolioPage() {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  const openIndex = visible.findIndex((p) => p.id === openId);
  const active = openIndex >= 0 ? visible[openIndex] : null;

  const close = useCallback(() => setOpenId(null), []);

  const go = useCallback(
    (step) => {
      if (openIndex < 0) return;
      const next = (openIndex + step + visible.length) % visible.length;
      setOpenId(visible[next].id);
    },
    [openIndex, visible]
  );

  const prev = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1), [go]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <main className="pf">
      <PortfolioHero />

      <section className="pf-work">
        <div className="pf-wrap">
        
          <PortfolioGrid
            projects={visible}
            filter={filter}
            onOpen={setOpenId}
          />
        </div>
      </section>

    
    </main>
  );
}