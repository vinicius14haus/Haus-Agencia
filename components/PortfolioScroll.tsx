"use client";
import { useEffect, useRef } from "react";

type Project = {
  title: string;
  image: string;
  size: string;
  titleImage?: string;
  titleLogoVariant?: string;
};

const projectColumns: Project[][] = [
  [
    {
      title: "NPG Capital",
      image: "/portfolio/portfolio-npg-capital-card.png",
      titleImage: "/portfolio/npg-logo.webp",
      size: "square",
    },
    {
      title: "Editora Haus",
      image: "/portfolio/portfolio-editora-haus-card.png",
      titleImage: "/haus-logo.png",
      titleLogoVariant: "haus",
      size: "square",
    },
  ],
  [
    {
      title: "Bonijuris",
      image: "/portfolio/portfolio-bonijuris-card.png",
      titleImage: "/portfolio/bonijuris-logo-white.png",
      titleLogoVariant: "bonijuris",
      size: "small",
    },
    {
      title: "Comunica&ccedil;&atilde;o Condominial",
      image: "/portfolio/portfolio-comunicacao-condominial-card.png",
      titleImage: "/portfolio/comunicacao-condominial-logo-white.png",
      titleLogoVariant: "comunicacao",
      size: "tall",
    },
  ],
  [
    {
      title: "Haus",
      image: "/portfolio/portfolio-haus-card.png",
      titleImage: "/haus-logo.png",
      titleLogoVariant: "haus",
      size: "square",
    },
    {
      title: "Ailton Tertuliano",
      image: "/portfolio/portfolio-ailton-tertuliano-card.png",
      size: "medium",
    },
  ],
];

export function PortfolioScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll<HTMLElement>("[data-portfolio-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("portfolio-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="next" className="portfolio-showcase">
      <div className="site-container portfolio-showcase-grid">
        {projectColumns.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className="portfolio-showcase-column">
            {column.map((project, projectIndex) => (
              <article
                key={project.title}
                className={`portfolio-showcase-card portfolio-showcase-card--${project.size} portfolio-reveal`}
                data-portfolio-reveal
                style={{ transitionDelay: `${(columnIndex + projectIndex) * 90}ms` }}
              >
                <div className="portfolio-showcase-media">
                  <img src={project.image} alt={project.title.replace(/&\w+;/g, "")} />
                </div>
                <div className="portfolio-showcase-info">
                  {project.titleImage ? (
                    <img
                      className={`portfolio-showcase-title-logo${project.titleLogoVariant ? ` portfolio-showcase-title-logo--${project.titleLogoVariant}` : ""}`}
                      src={project.titleImage}
                      alt={project.title}
                    />
                  ) : (
                    <h3 dangerouslySetInnerHTML={{ __html: project.title }} />
                  )}
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
