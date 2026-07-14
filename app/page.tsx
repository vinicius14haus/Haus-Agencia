import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { HeroZoom } from "@/components/HeroZoom";
import { PortfolioScroll } from "@/components/PortfolioScroll";
import { FloatingNav } from "@/components/FloatingNav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ServicesSection } from "@/components/ServicesSection";

const contact = [
  { icon: Phone, text: "41 99269-0737", href: "tel:+5541992690737" },
  { icon: MessageCircle, text: "WhatsApp", href: "https://wa.me/5541992690737" },
  { icon: Instagram, text: "agencia.haus", href: "https://agencia.haus" },
  { icon: Mail, text: "contato@agencia.haus", href: "mailto:contato@agencia.haus" },
];

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main className="landing-shell text-[#14181e]">
        <HeroZoom />
        <PortfolioScroll />
        <ServicesSection />

        <section id="contato" className="contact-flow relative overflow-hidden px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="relative z-10 mx-auto grid min-h-[70svh] w-full max-w-7xl items-center gap-8 lg:grid-cols-[1fr_430px]">
            <h2 className="max-w-4xl text-[clamp(44px,7vw,96px)] font-black leading-[.86] tracking-[-0.05em]">
              Bora deixar sua marca inevit&aacute;vel?
            </h2>

            <div className="liquid-contact rounded-[32px] p-5">
              {contact.map(({ icon: Icon, text, href }) => (
                <a key={text} href={href} className="contact-line">
                  <Icon size={20} />
                  {text}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FloatingNav />
    </>
  );
}
