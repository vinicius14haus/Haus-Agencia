import { ArrowUpRight, Mail, MessageCircle, Phone, Quote } from "lucide-react";
import { HeroZoom } from "@/components/HeroZoom";
import { PortfolioScroll } from "@/components/PortfolioScroll";
import { FloatingNav } from "@/components/FloatingNav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ServicesSection } from "@/components/ServicesSection";

const conversationPaths = [
  {
    title: "Tenho um projeto em mente",
    text: "Quero tirar uma ideia do papel.",
    href: "https://wa.me/5541992690737?text=Ol%C3%A1%2C%20Haus!%20Tenho%20um%20projeto%20em%20mente%20e%20quero%20conversar.",
  },
  {
    title: "Quero evoluir minha marca",
    text: "Preciso melhorar o que j%C3%A1 existe.",
    href: "https://wa.me/5541992690737?text=Ol%C3%A1%2C%20Haus!%20Quero%20evoluir%20minha%20marca%20e%20entender%20os%20pr%C3%B3ximos%20passos.",
  },
  {
    title: "Ainda estou explorando",
    text: "Preciso de dire%C3%A7%C3%A3o para come%C3%A7ar.",
    href: "https://wa.me/5541992690737?text=Ol%C3%A1%2C%20Haus!%20Ainda%20estou%20explorando%20uma%20ideia%20e%20preciso%20de%20dire%C3%A7%C3%A3o.",
  },
];

// Copy provisória: substituir por depoimentos aprovados antes da publicação.
const testimonials = [
  {
    quote: "A Haus traduziu uma ideia que ainda estava muito aberta em uma marca clara, com personalidade e pronta para crescer.",
    name: "Cliente Haus",
    role: "Projeto de posicionamento e identidade",
  },
  {
    quote: "O processo foi leve, direto e muito bem conduzido. Em cada etapa, a gente entendia onde queria chegar — e por quê.",
    name: "Parceiro Haus",
    role: "Estratégia, conteúdo e direção criativa",
  },
  {
    quote: "Não foi só uma entrega visual. A marca ganhou consistência para se comunicar melhor em todos os pontos de contato.",
    name: "Cliente Haus",
    role: "Presença digital e comunicação de marca",
  },
];

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main className="landing-shell text-[#14181e]">
        <HeroZoom />
        <PortfolioScroll />
        <ServicesSection />

        <section className="testimonials-flow px-5 pb-10 pt-4 sm:px-8 lg:px-10 lg:pb-16 lg:pt-8" aria-labelledby="depoimentos-title">
          <div className="site-container mx-auto w-full">
            <div className="testimonials-heading">
              <h2 id="depoimentos-title">O que fica depois do projeto.</h2>
              <p>Quando estrat&eacute;gia e cria&ccedil;&atilde;o se encontram, a marca deixa de ser s&oacute; bonita e passa a fazer sentido.</p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map(({ quote, name, role }, index) => (
                <article key={quote} className={`testimonial-card ${index === 0 ? "testimonial-card-featured" : ""}`}>
                  <Quote className="testimonial-mark" size={28} strokeWidth={1.7} aria-hidden="true" />
                  <blockquote>&ldquo;{quote}&rdquo;</blockquote>
                  <footer>
                    <strong>{name}</strong>
                    <span>{role}</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="contact-flow px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
          <div className="site-container contact-panel mx-auto w-full">
            <div className="contact-copy">
              <h2 className="contact-title">
                Qual &eacute; o pr&oacute;ximo movimento da sua marca?
              </h2>
              <p>Escolha o ponto de partida. A conversa j&aacute; chega para a gente com o contexto certo.</p>
            </div>

            <div className="contact-actions">
              <div className="conversation-options" aria-label="Escolha como iniciar a conversa">
                {conversationPaths.map(({ title, text, href }) => (
                  <a key={title} href={href} className="conversation-option">
                    <span className="conversation-option-copy">
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </span>
                    <ArrowUpRight size={20} />
                  </a>
                ))}
              </div>

              <div className="contact-alternatives">
                <span>Prefere outro canal?</span>
                <a href="mailto:contato@agencia.haus"><Mail size={15} /> contato@agencia.haus</a>
                <a href="tel:+5541992690737"><Phone size={15} /> 41 99269-0737</a>
                <a href="https://wa.me/5541992690737"><MessageCircle size={15} /> WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FloatingNav current="home" />
    </>
  );
}
