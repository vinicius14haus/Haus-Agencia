"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const bridgeImages = [
  {
    src: "/portfolio/bridge-slide-01.png",
    alt: "Site da NPG Capital apresentado em notebook",
  },
  {
    src: "/portfolio/bridge-slide-02.png",
    alt: "Livro Como Montar o Time dos Sonhos do Condominio",
  },
  {
    src: "/portfolio/bridge-slide-03.png",
    alt: "Site da Editora Haus apresentado em notebook",
  },
];

export function PortfolioBridgeCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? bridgeImages.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % bridgeImages.length);
  };

  return (
    <section className="portfolio-bridge" aria-label="Destaque NPG Capital">
      <article className="portfolio-bridge-card">
        <div
          className="portfolio-bridge-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {bridgeImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="portfolio-bridge-slide"
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>

        <div className="portfolio-bridge-controls" aria-label="Navegar imagens NPG Capital">
          <button type="button" onClick={goToPrevious} aria-label="Imagem anterior">
            <ChevronLeft size={24} strokeWidth={2.2} />
          </button>
          <button type="button" onClick={goToNext} aria-label="Proxima imagem">
            <ChevronRight size={24} strokeWidth={2.2} />
          </button>
        </div>
      </article>
    </section>
  );
}
