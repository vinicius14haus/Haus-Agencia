"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const revealAfter = 700;

    const updateVisibility = () => {
      setIsVisible(window.scrollY >= revealAfter);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <nav
      className={`group/dock fixed bottom-5 left-1/2 z-[9999] isolate flex min-h-[68px] w-[min(calc(100%_-_24px),720px)] -translate-x-1/2 items-center justify-between gap-2 overflow-hidden rounded-full border border-white/60 bg-white/35 p-1.5 text-[#171b22] shadow-[0_20px_55px_rgba(34,18,48,.24),inset_0_1px_1px_rgba(255,255,255,.86)] backdrop-blur-[28px] transition-[transform,opacity,box-shadow,background-color] duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(87,0,111,.28),inset_0_1px_1px_rgba(255,255,255,.95)] sm:bottom-8 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[calc(100%_+_56px)] opacity-0"
      }`}
      aria-label="Navegacao principal"
      aria-hidden={!isVisible}
    >
      <span className="pointer-events-none absolute -left-8 top-0 h-full w-52 rounded-full bg-white/35 blur-2xl transition-transform duration-700 group-hover/dock:translate-x-20" />
      <span className="pointer-events-none absolute -right-12 bottom-[-38px] h-24 w-64 rounded-full bg-[#650080]/15 blur-2xl transition-transform duration-700 group-hover/dock:-translate-x-16" />

      <a
        href="#next"
        aria-label="Haus"
        className="group/logo relative z-10 grid h-14 w-[72px] shrink-0 place-items-center"
      >
        <span className="haus-dock-logo" aria-hidden="true" />
      </a>

      <a
        className="group/cta relative z-10 flex h-[50px] shrink-0 items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white/90 px-5 text-[13px] font-bold text-[#17131b] shadow-[0_8px_22px_rgba(40,24,48,.16)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_8px_rgba(255,255,255,.38)] max-sm:px-4 max-sm:text-[12px]"
        href="https://wa.me/5541992690737"
      >
        <span className="relative h-5 overflow-hidden leading-5">
          <span className="block transition-transform duration-300 group-hover/cta:-translate-y-full">
            Come&ccedil;ar uma ideia
          </span>
          <span className="absolute left-0 top-full block transition-transform duration-300 group-hover/cta:-translate-y-full">
            Come&ccedil;ar uma ideia
          </span>
        </span>
        <ArrowUpRight
          size={15}
          strokeWidth={2.2}
          className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
        />
      </a>
    </nav>
  );
}
