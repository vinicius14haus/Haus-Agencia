import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FloatingNav } from "@/components/FloatingNav";

const principles = [
  {
    number: "01",
    title: "Clareza antes de tudo",
    text: "A gente encontra a mensagem que a sua marca precisa dizer e organiza cada ponto de contato ao redor dela.",
  },
  {
    number: "02",
    title: "Design com fun&ccedil;&atilde;o",
    text: "Cada escolha visual serve para tornar a experi&ecirc;ncia mais reconhec&iacute;vel, direta e consistente.",
  },
  {
    number: "03",
    title: "Presen&ccedil;a que continua",
    text: "N&atilde;o entregamos s&oacute; uma pe&ccedil;a. Criamos sistemas que acompanham a marca enquanto ela cresce.",
  },
];

export default function AgenciaPage() {
  return (
    <main className="agency-page">
      <section className="agency-hero">
        <div className="agency-hero-media" aria-hidden="true">
          <Image
            src="/portfolio/portfolio-agencia-haus.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className="agency-hero-content site-container">
          <span className="agency-eyebrow">A ag&ecirc;ncia</span>
          <h1>
            Estrat&eacute;gia para marcas que querem ocupar espa&ccedil;o.
          </h1>
          <p>
            A Haus une pensamento, design e comunica&ccedil;&atilde;o para transformar boas ideias em presen&ccedil;a de verdade.
          </p>
        </div>
      </section>

      <section className="agency-story">
        <div className="site-container agency-story-grid">
          <span className="agency-section-label">Quem somos</span>
          <div>
            <h2>
              Uma ag&ecirc;ncia para marcas que n&atilde;o querem apenas aparecer, mas ser lembradas.
            </h2>
            <p>
              Trabalhamos do posicionamento &agrave; execu&ccedil;&atilde;o: identidade, materiais comerciais, experi&ecirc;ncias editoriais, presen&ccedil;a digital e conte&uacute;do. Cada projeto come&ccedil;a entendendo o neg&oacute;cio e termina com uma marca mais n&iacute;tida, mais desej&aacute;vel e mais sua.
            </p>
          </div>
        </div>
      </section>

      <section className="agency-principles-section">
        <div className="site-container">
          <div className="agency-principles-heading">
            <span className="agency-section-label">Como pensamos</span>
            <p>O que orienta as escolhas da Haus em cada parceria.</p>
          </div>

          <div className="agency-principles">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3 dangerouslySetInnerHTML={{ __html: principle.title }} />
                <p dangerouslySetInnerHTML={{ __html: principle.text }} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="agency-contact">
        <div className="site-container agency-contact-inner">
          <div>
            <span className="agency-eyebrow">Vamos construir algo que fica</span>
            <h2>Sua pr&oacute;xima fase pode come&ccedil;ar aqui.</h2>
          </div>
          <a href="https://wa.me/5541992690737">
            Conversar com a Haus
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </a>
        </div>
      </section>

      <FloatingNav current="agency" />
    </main>
  );
}
