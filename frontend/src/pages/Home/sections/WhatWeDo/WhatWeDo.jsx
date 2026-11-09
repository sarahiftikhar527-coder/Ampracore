
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./WhatWeDo.css";

const services = [
  {
    number: "01",
    title: "Enterprise Solutions",
    description:
      "Our enterprise solutions are strategically designed to streamline operations, improve workflow efficiency, and support scalable business growth. We build smart systems that simplify resource management and enhance overall business performance through seamless integration.",
    features: [
      "Smart Business Integration",
      "Scalable Enterprise Solutions",
      "Streamlined Workflow Management",
      "Efficient Resource Planning",
      "Reliable System Performance",
      "Intelligent Process Control",
    ],
    image:
      "https://www.ampracore.com/assets/screenshots/enterprise-solutions.jpg",
    imageAlt:
      "Enterprise Solutions screen showcasing manufacturing data tracking and shop floor management",
    slug: "enterprise-solutions",
  },
  {
    number: "02",
    title: "Intelligent Automation",
    description:
      "Our AI automation solutions are designed to simplify complex business tasks, reduce manual effort, improve operational efficiency, and enhance overall business performance. We build intelligent systems that automate workflows, support faster decision-making, and ensure smarter business operations.",
    features: [
      "Smart Task Automation",
      "Workflow Optimization",
      "Intelligent Process Handling",
      "Reduced Manual Work",
      "Faster Decision Making",
      "AI-Driven Efficiency",
    ],
    image:
      "https://www.ampracore.com/assets/screenshots/intelligent-automation.jpg",
    imageAlt:
      "Intelligent Automation screen showing oscilloscope wave forms and advanced AI testing processes",
    slug: "intelligent-automation",
  },
  {
    number: "03",
    title: "Digital Platforms",
    description:
      "Our digital platforms are designed to deliver seamless mobile applications and efficient point of sale systems that enhance user experience and simplify business operations. We focus on creating modern, scalable, and reliable solutions that connect customers, streamline transactions, and improve overall digital performance.",
    features: [
      "Seamless User Experience",
      "Scalable Digital Solutions",
      "Smart Transaction Systems",
      "Integrated Business Platforms",
      "Modern Interface Design",
      "Efficient System Performance",
    ],
    image:
      "https://www.ampracore.com/assets/screenshots/digital-platforms.jpg",
    imageAlt: "Digital Platforms and business solutions",
    slug: "digital-platforms",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        section
          .querySelector(".wwd__header")
          ?.classList.add("is-visible");

        section.querySelectorAll(".wwd-card").forEach((card) => {
          card.classList.add("is-visible");
        });

        observer.disconnect();
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="wwd" id="what-we-do" ref={sectionRef}>
      <div className="wwd__container">

        <header className="wwd__header">
          <h2 className="wwd__heading">
            Explore Our <span>Expertise</span>
          </h2>

          <p className="wwd__subtitle">
            We deliver smart digital solutions designed to simplify
            operations, automate workflows, and drive business growth.
          </p>
        </header>

        <div className="wwd__grid">
          {services.map((service, index) => (
            <article
              className="wwd-card"
              key={service.number}
              style={{ "--i": index }}
            >
              <div className="wwd-card__content">

                <span className="wwd-card__number">
                  {service.number}
                </span>

                <h3 className="wwd-card__title">
                  {service.title}
                </h3>

                <p className="wwd-card__description">
                  {service.description}
                </p>

                <ul className="wwd-card__list">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <Link
                  className="wwd-card__link"
                  to={`/services/${service.slug}`}
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn more
                  <span aria-hidden="true">↗</span>
                </Link>

              </div>

              <div className="wwd-card__image">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                />
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
