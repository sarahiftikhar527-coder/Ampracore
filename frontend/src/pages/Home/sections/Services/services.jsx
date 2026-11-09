
import React, { useState } from "react";
import "./services.css";

const services = [
  { title: "Cocobeanz" },
  { title: "Euro-Installations" },
  { title: "Meximo" },
  { title: "Strategic Innovations" },
  { title: "Rosslyn Gardens" },
  { title: "Enable" },
  { title: "Virtue Mechanics" },
  { title: "DigiAmplify" },
  { title: "Ampracore" }
];

function ServiceRow({
  services: rowServices,
  direction = "left",
  rowName,
  duration = 44,
}) {
  const [isPaused, setIsPaused] = useState(false);

  const repeatedServices = [
    ...rowServices,
    ...rowServices,
    ...rowServices,
    ...rowServices,
  ];

  return (
    <div
      className={`svc-row ${isPaused ? "is-paused" : ""}`}
      aria-label={rowName}
    >
      <div
        className={`svc-track ${
          direction === "right"
            ? "svc-track-right"
            : "svc-track-left"
        }`}
        style={{ "--svc-duration": `${duration}s` }}
      >
        {repeatedServices.map(({ title }, index) => (
          <button
            key={`${title}-${index}`}
            type="button"
            className="svc-card"
            onClick={() => setIsPaused((current) => !current)}
            aria-pressed={isPaused}
            aria-label={`${title} - ${
              isPaused ? "Resume scrolling" : "Pause scrolling"
            }`}
          >
            <span className="svc-title">{title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const secondRow = [
    ...services.slice(4),
    ...services.slice(0, 4),
  ];

  return (
    <section className="svc-section" id="services">
      <div className="svc-marquee">
        <ServiceRow
          services={services}
          direction="left"
          rowName="Services scrolling left"
          duration={44}
        />

        <ServiceRow
          services={secondRow}
          direction="right"
          rowName="Services scrolling right"
          duration={50}
        />
      </div>
    </section>
  );
}
