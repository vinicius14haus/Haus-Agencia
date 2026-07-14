"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    title: "Comunicação empresarial",
    items: ["Folders e banners", "Apresentação comercial", "Propostas licitatórias"],
  },
  {
    number: "02",
    title: "Experiência de marca",
    items: ["Brindes personalizados", "Identidade visual", "Papelaria corporativa"],
  },
  {
    number: "03",
    title: "Marketing digital",
    items: ["Social media e tráfego pago", "Criação de e-books", "Landing pages", "E-mail marketing"],
  },
  {
    number: "04",
    title: "Editorial",
    items: ["Capa e projeto gráfico", "Edição de livros e revistas"],
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
    <section ref={sectionRef} className="services-flow px-5 pb-24 pt-12 sm:px-8 lg:px-10 lg:pb-36 lg:pt-20">
      <div className="mx-auto w-full max-w-[1500px]">
        <header className="services-intro services-reveal" data-services-reveal>
          <span className="services-mark" aria-label="Haus">haus</span>
          <h2>
            Marcas que n&atilde;o pedem aten&ccedil;&atilde;o.<br />
            <span>Elas ocupam espa&ccedil;o.</span>
          </h2>
        </header>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-card services-reveal"
              data-services-reveal
              style={{ transitionDelay: `${120 + index * 110}ms` }}
            >
              <span className="service-card-number">{service.number}</span>
              <h3>{service.title}</h3>
              <ul>
                {service.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
