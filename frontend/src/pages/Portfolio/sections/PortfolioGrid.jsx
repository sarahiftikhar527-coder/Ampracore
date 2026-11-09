import React from "react";
import { ArrowUpRight } from "lucide-react";
import { projects as allProjects } from "../portfolioData";
import { Img, Reveal } from "../PortfolioShared";
import "./PortfolioGrid.css";

export default function PortfolioGrid({ projects = [], onOpen }) {
  return (
    <div className="pf-grid">
      {projects.map((project, index) => (
        <Reveal
          key={project.id}
          delay={(index % 3) * 70}
          className="pf-cell"
        >
          <button
            type="button"
            className="pf-card"
            onClick={() => onOpen?.(project.id)}
            aria-label={`View ${project.title} project`}
          >
            <div className="pf-card-media">
              <Img
                src={project.image}
                alt={project.title}
                label={project.title}
              />

              <span className="pf-card-index">
                {String(
                  allProjects.findIndex((p) => p.id === project.id) + 1
                ).padStart(2, "0")}
              </span>

              <span className="pf-card-go" aria-hidden="true">
                <ArrowUpRight size={17} />
              </span>
            </div>

            <div className="pf-card-body">
              <h3>{project.title}</h3>

              <p>{project.short}</p>

              <ul className="pf-tags" aria-label="Technologies used">
                {project.stack.slice(0, 3).map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  );
}