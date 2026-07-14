"use client";

import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const phrases = ["Precisa de um site?", "Quer se destacar?", "Bora criar?"];

const menuItems = [
  { label: "Início", href: "#", thumb: "/haus-hero-background.png" },
  { label: "Portfólio", href: "#next", thumb: "/portfolio/portfolio-agencia-haus.png", tag: "Cases" },
  { label: "Serviços", href: "#", thumb: "/portfolio/design-grafico.png" },
  { label: "Sobre", href: "#", thumb: "/editora-haus.png" },
  { label: "Contato", href: "#contato", thumb: "/portfolio/resultados-carousel.png", tag: "WhatsApp" },
];

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const revealAfter = 700;

    const updateVisibility = () => {
      setIsVisible(window.scrollY >= revealAfter);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  useEffect(() => {
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      step += 1;
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      const delay = step % phrases.length === 0 ? 3000 : 1700;
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 1700);
    return () => clearTimeout(timer);
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMenuOpen(false), 1300);
  };

  useEffect(() => cancelClose, []);

  return (
    <nav
      className={`fixed bottom-5 left-1/2 z-[9999] flex w-[500px] max-w-[calc(100%-24px)] -translate-x-1/2 flex-col overflow-hidden rounded-[24px] bg-[#141414] text-white shadow-[0_20px_45px_rgba(0,0,0,.45)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] sm:bottom-8 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[calc(100%_+_56px)] opacity-0"
      }`}
      aria-label="Navegacao principal"
      aria-hidden={!isVisible}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <div className="flex h-16 shrink-0 items-center justify-between gap-4 py-1.5 pl-5 pr-3">
        <div className="flex min-w-0 items-center gap-5">
          <a href="#next" aria-label="Haus" className="grid h-7 w-10 shrink-0 place-items-center">
            <span className="haus-dock-logo" aria-hidden="true" />
          </a>

          <div className="relative h-[24px] min-w-0 overflow-hidden">
            <div
              className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ transform: `translateY(-${phraseIndex * 24}px)` }}
            >
              {phrases.map((phrase) => (
                <span key={phrase} className="h-[24px] whitespace-nowrap text-[20px] font-semibold leading-[24px] text-white">
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            className="flex h-10 items-center gap-2 rounded-[12px] bg-white px-4 text-[16px] font-medium text-[#17131b]"
            href="https://wa.me/5541992690737"
          >
            Vamos conversar
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>

          {!menuOpen && (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={false}
              className="grid h-9 w-9 shrink-0 place-items-center text-white"
            >
              <Plus size={20} strokeWidth={2.4} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="divide-y divide-white/10 border-t border-white/10">
            {menuItems.map(({ label, href, thumb, tag }) => (
              <a key={label} href={href} className="flex items-center gap-3 px-4 py-3">
                <img
                  src={thumb}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-[10px] object-cover"
                />
                <span className="flex-1 text-[17px] font-medium text-white">{label}</span>
                {tag && (
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-[13px] text-white/50">
                    {tag}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="flex h-12 items-center justify-between border-t border-white/10 px-4 text-[13px] text-white/50">
            <a href="https://agencia.haus">Instagram</a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              aria-expanded={true}
              className="grid h-8 w-8 shrink-0 place-items-center text-white"
            >
              <Minus size={18} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
