import { ArrowUpRight } from "lucide-react";

const menuItems = [
  { label: "In&iacute;cio", href: "/", page: "home" },
  { label: "Ag&ecirc;ncia", href: "/agencia", page: "agency" },
  { label: "Portf&oacute;lio", href: "/#next" },
  { label: "Servi&ccedil;os", href: "/#servicos" },
  { label: "Contato", href: "/#contato" },
];

type FloatingNavProps = {
  current?: "home" | "agency";
};

export function FloatingNav({ current = "home" }: FloatingNavProps) {
  return (
    <header className="site-topbar">
      <nav className="site-topbar-inner" aria-label="Navegacao principal">
        <a href="#" className="site-topbar-brand" aria-label="Haus">
          <span className="site-topbar-logo" aria-hidden="true" />
        </a>

        <div className="site-topbar-links">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={item.page === current ? "page" : undefined}
              dangerouslySetInnerHTML={{ __html: item.label }}
            />
          ))}
        </div>

        <a className="site-topbar-cta" href="https://wa.me/5541992690737">
          <span>Vamos conversar</span>
          <ArrowUpRight size={15} strokeWidth={2.2} />
        </a>
      </nav>
    </header>
  );
}
