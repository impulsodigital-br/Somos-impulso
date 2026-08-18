"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/site";
import SearchModal from "@/components/SearchModal";

export default function Header({ searchIndex }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header>
      <div className="header-inner">
        <Link href="/" className="logo-group" aria-label="Somos Impulso, página inicial">
          <Image src="/logo.jpg" alt="Somos Impulso" width={38} height={38} className="logo-img" priority />
        </Link>

        <nav aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar no site"
          >
            &#128269;
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav" aria-label="Navegação mobile">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} searchIndex={searchIndex} />
    </header>
  );
}
