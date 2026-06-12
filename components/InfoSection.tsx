"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MAPS_URL =
  "https://www.google.com/maps/place/Carnes+asadas+%22La+Santa%22/@19.7899146,-99.2052065,17z/data=!4m15!1m8!3m7!1s0x85d22144a709d719:0x2f858325c6bb3f37!2sCarnes+asadas+%22La+Santa%22!8m2!3d19.7899146!4d-99.2026316!10e9!16s%2Fg%2F11t9n2k3gx!3m5!1s0x85d22144a709d719:0x2f858325c6bb3f37!8m2!3d19.7899146!4d-99.2026316!16s%2Fg%2F11t9n2k3gx?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D";

const highlights = [
  {
    name: "Molcajete de Asada",
    desc: "Nuestro clásico: carne asada al punto, servida al estilo tradicional.",
  },
  {
    name: "Molcajete Mar y Tierra",
    desc: "La combinación perfecta entre mar y carne, en una sola experiencia.",
  },
  {
    name: "Cerveza Grande Modelo",
    desc: "El acompañamiento ideal para una noche entre amigos y familia.",
  },
];

export default function InfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visitanos"
      ref={sectionRef}
      className="relative w-full bg-carbon-950 px-6 py-24 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div
          ref={(el) => {
            itemsRef.current[0] = el;
          }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest2 text-ember-400 sm:text-sm">
            Visítanos
          </p>
          <h2 className="font-display text-4xl tracking-widest2 text-stone-50 sm:text-5xl lg:text-6xl">
            CARNES ASADAS LA SANTA
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-stone-400">
            <span className="text-ember-400">★ 4.3</span>
            <span>· 60 reseñas</span>
            <span className="hidden sm:inline">· $200–300 por persona</span>
          </div>
        </div>

        {/* Menu highlights */}
        <div
          ref={(el) => {
            itemsRef.current[1] = el;
          }}
          className="mb-16 grid gap-6 sm:grid-cols-3"
        >
          {highlights.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-stone-800 bg-carbon-900 p-6 transition-colors duration-300 hover:border-ember-500/40"
            >
              <h3 className="font-display text-xl tracking-wide text-stone-50 sm:text-2xl">
                {item.name}
              </h3>
              <p className="mt-3 text-sm font-light text-stone-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Location & hours */}
        <div
          ref={(el) => {
            itemsRef.current[2] = el;
          }}
          className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-stone-800 bg-carbon-900 p-8 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-widest2 text-ember-400">
              Dirección
            </p>
            <p className="mt-2 max-w-xs text-sm font-light text-stone-300">
              Avenida Miguel Hidalgo Nte. 30, Pueblo Nuevo, 54660 Coyotepec, Méx.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest2 text-ember-400">
              Horario
            </p>
            <p className="mt-2 text-sm font-light text-stone-300">Abrimos a las 3:00 PM</p>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ember-500/60 px-8 py-3 text-sm font-medium uppercase tracking-widest2 text-stone-50 transition-colors duration-300 hover:border-ember-400"
          >
            <span className="absolute inset-0 -z-10 translate-y-full bg-ember-500 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative transition-colors duration-300 group-hover:text-carbon-950">
              Cómo llegar
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
