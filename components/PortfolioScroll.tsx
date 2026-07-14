"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Livro Ailton Tertuliano",
    image: "/portfolio/livro-ailton.png",
  },
  {
    title: "NPG Capital",
    description: "Presenca digital para uma garantidora condominial com autoridade, clareza e conversao.",
    layers: {
      foreground: "/portfolio/npg-capital-logo.png",
      background: "/portfolio/npg-faria-lima.jpg",
      foregroundType: "logo",
      backgroundType: "photo",
    },
  },
  {
    title: "Editora Haus",
    description: "Uma experiencia editorial com ritmo, catalogo visual e leitura de marca mais sofisticada.",
    layers: {
      foreground: "/portfolio/editora-notebook.png",
      background: "/portfolio/editora-sky.png",
    },
  },
  {
    title: "Projeto futuro 02",
    layers: {
      foreground: "/portfolio/haus-phone.png",
      background: "/portfolio/haus-phone-background.png",
      foregroundType: "phone",
    },
  },
  {
    title: "Revista Direito e Condominio",
    layers: {
      foreground: "/portfolio/revistas-condominio.png",
      background: "/portfolio/haus-phone-background.png",
      foregroundType: "magazines",
      backgroundTone: "steel",
    },
  },
  {
    title: "Agencia Haus",
    description: "Sistema visual proprietario para mostrar criacao, estrategia e execucao no mesmo gesto.",
    image: "/portfolio/trafego-pago.png",
  },
  {
    title: "Ailton Tertuliano",
    description: "Site pessoal com narrativa direta, presenca profissional e foco em reputacao.",
  },
  {
    title: "Ailton Tertuliano - Lancamento",
    layers: {
      foreground: "/portfolio/ailton-notebook.png",
      background: "/portfolio/editora-sky.png",
      backgroundTone: "night",
    },
  },
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
          if (entry.isIntersecting) {
            entry.target
              .querySelector<HTMLElement>(".portfolio-reveal")
              ?.classList.add("portfolio-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="next"
      className="one-page-flow px-5 pb-10 pt-9 sm:px-8 lg:px-5 lg:pb-16 lg:pt-12"
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="portfolio-reveal-anchor" data-portfolio-reveal>
          <div className="flow-intro portfolio-reveal">
            <h2>Projetos mais recentes</h2>
          </div>
        </div>

        <div className="project-stack">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-card-anchor"
              data-portfolio-reveal
            >
              <article className={`project-card portfolio-reveal project-card-${index % 2 === 0 ? "right" : "left"}`}>
                {project.layers && (
                  <div
                    className={`project-card-layered ${project.layers.backgroundTone ? `project-card-layered--${project.layers.backgroundTone}` : ""}`}
                    style={project.layers.backgroundType === "photo" || project.layers.backgroundTone === "steel" ? undefined : { backgroundImage: `url(${project.layers.background})` }}
                  >
                    {project.layers.backgroundType === "photo" ? (
                      <div
                        className="project-card-photo-background"
                        style={{ backgroundImage: `url(${project.layers.background})` }}
                        aria-hidden="true"
                      />
                    ) : (
                      <div className="project-card-sky-track" aria-hidden="true">
                        <span style={{ backgroundImage: `url(${project.layers.background})` }} />
                        <span style={{ backgroundImage: `url(${project.layers.background})` }} />
                        <span style={{ backgroundImage: `url(${project.layers.background})` }} />
                        <span style={{ backgroundImage: `url(${project.layers.background})` }} />
                        <span style={{ backgroundImage: `url(${project.layers.background})` }} />
                        <span style={{ backgroundImage: `url(${project.layers.background})` }} />
                      </div>
                    )}
                    <img
                      className={project.layers.foregroundType === "phone" ? "project-card-phone" : project.layers.foregroundType === "logo" ? "project-card-logo" : project.layers.foregroundType === "magazines" ? "project-card-magazines" : "project-card-notebook"}
                      src={project.layers.foreground}
                      alt={project.layers.foregroundType === "phone" ? "Aplicativo da Haus apresentado em um celular" : project.layers.foregroundType === "logo" ? "Logo da NPG Capital" : project.layers.foregroundType === "magazines" ? "Capas da Revista Direito e Condominio" : "Site da Editora Haus apresentado em um notebook"}
                    />
                  </div>
                )}
                {project.image && (
                  <img
                    className="project-card-full-image"
                    src={project.image}
                    alt="Livro Como Montar o Time dos Sonhos do Condominio"
                  />
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
