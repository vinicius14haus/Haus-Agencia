const services = [
  { key: "comunicacao", label: <>Comunica&ccedil;&atilde;o empresarial</> },
  { key: "sites", label: <>Cria&ccedil;&atilde;o de sites</> },
  { key: "marketing", label: <>Marketing digital</> },
  { key: "social", label: <>Social media e tr&aacute;fego pago</> },
  { key: "editorial", label: <>Editorial</> },
];

export function HeroZoom() {
  return (
    <section className="haus-institutional-hero relative overflow-hidden">
      <div className="hero-content-position site-container relative z-10 mx-auto w-full">
        <div className="hero-services-base">
          {services.map((service) => (
            <span key={service.key} className="hero-service-card">
              {service.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
