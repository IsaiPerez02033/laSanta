"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Galería", href: "#galeria" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Visítanos", href: "#visitanos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed left-1/2 top-4 z-[60] w-[92%] max-w-4xl -translate-x-1/2 rounded-full border transition-all duration-500 sm:top-6 ${
        scrolled
          ? "border-white/25 bg-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-ember-500/30 sm:h-9 sm:w-9">
            <Image src="/images/logo.jpeg" alt="La Santa" fill sizes="36px" className="object-cover" />
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 sm:ml-10 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-widest2 text-stone-300 transition-colors duration-300 hover:text-ember-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/525567471935"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ember-500/60 px-4 py-2 text-xs font-medium uppercase tracking-widest2 text-stone-50 transition-colors duration-300 hover:bg-ember-500 hover:text-carbon-950"
          >
            Reservar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Menú"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center text-stone-100 sm:hidden"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 sm:hidden ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pb-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-xs font-medium uppercase tracking-widest2 text-stone-300 transition-colors duration-300 hover:text-ember-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/525567471935"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-ember-500/60 px-4 py-2 text-center text-xs font-medium uppercase tracking-widest2 text-stone-50 transition-colors duration-300 hover:bg-ember-500 hover:text-carbon-950"
          >
            Reservar
          </a>
        </div>
      </div>
    </nav>
  );
}
