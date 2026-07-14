"use client";

import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function HeroZoom() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const readScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      targetProgressRef.current = clamp(-rect.top / scrollable);
    };

    const animate = () => {
      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * 0.095;

      currentProgressRef.current = Math.abs(target - next) < 0.0005 ? target : next;
      setProgress(currentProgressRef.current);
      raf = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      readScroll();
    };

    readScroll();
    animate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pull = clamp(progress / 0.72);
  const reveal = clamp((progress - 0.42) / 0.24);
  const screenScale = 1 - pull * 0.58;
  const screenTranslateY = pull * 18;
  const screenRadius = pull * 34;
  const scrollOpacity = Math.max(0, 1 - progress / 0.2);
  return (
    <section ref={sectionRef} className="relative h-[340svh]">
      <div className="hero-stage sticky top-0 h-svh overflow-hidden">
        <div
          className="hero-reveal-copy"
          style={{
            opacity: reveal,
            transform: `scale(${0.98 + reveal * 0.02})`,
          }}
        >
          <div className="reveal-marquee reveal-marquee-a">
            <span>marcas que ocupam espa&ccedil;o</span>
            <span>presen&ccedil;a antes da escolha</span>
            <span>imagem com autoridade</span>
            <span>marcas que ocupam espa&ccedil;o</span>
          </div>
          <div className="reveal-marquee reveal-marquee-b" aria-hidden="true">
            <span>estrat&eacute;gia com est&eacute;tica</span>
            <span>digital que parece lideran&ccedil;a</span>
            <span>conte&uacute;do que sustenta reputa&ccedil;&atilde;o</span>
            <span>estrat&eacute;gia com est&eacute;tica</span>
          </div>
        </div>

        <div
          className="hero-screen"
          style={{
            borderRadius: `${screenRadius}px`,
            transform: `translate3d(0, ${screenTranslateY}px, 0) scale(${screenScale})`,
          }}
        >
          <div
            className="hero-bg-camera absolute inset-0"
            style={{
              transform: `scale(${1.02 + pull * 0.05})`,
            }}
          >
            <div className="hero-bg-carousel">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,229,28,.10),transparent_14%),linear-gradient(90deg,rgba(5,8,34,.58),rgba(12,20,80,.18)_50%,rgba(5,8,34,.54))]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20" />

          <div className="relative z-10 grid h-full w-full place-items-center text-center">
            <img
              src="/haus-logo.png"
              alt="Haus"
              className="haus-logo h-auto w-[min(48vw,560px)] max-sm:w-[min(72vw,420px)]"
            />

        </div>
        </div>

        <a
          href="#next"
          className="scroll-orbit"
          aria-label="Rolar para a proxima secao"
          style={{ opacity: scrollOpacity }}
        >
          <span className="scroll-orbit__center">
            <ArrowDown size={22} strokeWidth={2.5} />
          </span>
        </a>

      </div>
    </section>
  );
}
