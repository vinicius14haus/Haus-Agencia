"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    number: "1",
    title: "Comunica\u00e7\u00e3o empresarial",
    items: ["Folders e banners", "Apresenta\u00e7\u00e3o comercial", "Propostas licitat\u00f3rias"],
  },
  {
    number: "2",
    title: "Experi\u00eancia de marca",
    items: ["Brindes personalizados", "Identidade visual", "Papelaria corporativa"],
  },
  {
    number: "3",
    title: "Marketing digital",
    items: ["Social media e tr\u00e1fego pago", "Cria\u00e7\u00e3o de e-books", "Landing pages", "E-mail marketing"],
  },
  {
    number: "4",
    title: "Editorial",
    items: ["Capa e projeto gr\u00e1fico", "Edi\u00e7\u00e3o de livros e revistas"],
  },
  {
    number: "5",
    title: "Conte\u00fado e dire\u00e7\u00e3o criativa",
    items: ["Conceito e campanha", "Roteiros e textos", "Dire\u00e7\u00e3o de arte", "Produ\u00e7\u00e3o de pe\u00e7as"],
  },
  {
    number: "6",
    title: "Estrat\u00e9gia e posicionamento",
    items: ["Diagn\u00f3stico de marca", "Planejamento de comunica\u00e7\u00e3o", "Tom de voz", "Calend\u00e1rio editorial"],
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll<HTMLElement>("[data-services-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("services-reveal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicos" ref={sectionRef} className="services-flow px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-36 lg:pt-0">
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="services-list">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-line services-reveal"
              data-services-reveal
              style={{ transitionDelay: `${index * 18}ms` }}
            >
              <span className="service-line-number" aria-hidden="true">{service.number}</span>
              <div className="service-line-content">
                <p className="service-line-copy">
                  <strong>{service.title}.</strong> {service.items.join(", ")}.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
