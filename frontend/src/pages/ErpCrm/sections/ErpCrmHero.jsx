import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroPoints } from "../erpCrmData";
import "./ErpCrmHero.css";

const wheelImage = "/assets/images/erpcrm/wheel.webp";
const cubeImage = "/assets/images/erpcrm/cube.webp";
const halfsphereImage = "/assets/images/erpcrm/halfsphere.webp";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ErpCrmHero() {
  const shouldReduceMotion = useReducedMotion();

  const containerAnimation = shouldReduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
      };

  const itemAnimation = shouldReduceMotion
    ? {}
    : { variants: itemVariants };

  return (
    <section className="ec-hero">
      <div className="ec-wrap ec-hero-grid">
        <motion.div className="ec-hero-copy" {...containerAnimation}>
          <motion.span className="ec-eyebrow" {...itemAnimation}>
            Ampracore ERP / CRM
          </motion.span>

          <motion.h1 {...itemAnimation}>
            From Customers
            <br />
            to Production—
            <em>One Flow.</em>
          </motion.h1>

          <motion.p {...itemAnimation}>
            Connect ERP, CRM, and MRP in one streamlined ecosystem.
            Simplify operations, improve visibility, and automate
            everyday business workflows.
          </motion.p>

          <motion.div className="ec-actions" {...itemAnimation}>
            <a href="/contact" className="ec-btn ec-btn-red">
              Free Trial
            </a>

            <a href="/contact" className="ec-btn ec-btn-dark">
              Schedule a Demo
            </a>
          </motion.div>

          <motion.ul className="ec-hero-points" {...itemAnimation}>
            {heroPoints.map((point) => (
              <li key={point}>
                <i />
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="ec-hero-visual"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-label="ERP, CRM and production management visuals"
        >
          <div className="ec-hero-glow" />

          <div className="ec-object ec-wheel">
            <img src={wheelImage} alt="Rotating ERP workflow wheel" />
          </div>

          <div className="ec-object ec-cube">
            <img src={cubeImage} alt="Three-dimensional cube" />
          </div>

          <div className="ec-object ec-halfsphere">
            <img
              src={halfsphereImage}
              alt="Three-dimensional half sphere"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}