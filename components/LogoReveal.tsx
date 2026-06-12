"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PARTICLE_COUNT = 24;

export default function LogoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(logoRef.current, { opacity: 0, scale: 0.7, filter: "blur(20px)" });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });
      gsap.set(headingRef.current, { opacity: 0, y: 30, filter: "blur(8px)" });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(particlesRef.current, { opacity: 0, y: 60, scale: 0.5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 15%",
          scrub: 1,
        },
      });

      tl.to(glowRef.current, { opacity: 0.9, scale: 1.2, duration: 1 }, 0)
        .to(
          particlesRef.current,
          {
            opacity: 0.6,
            y: -40,
            scale: 1,
            duration: 1,
            stagger: { each: 0.02, from: "random" },
          },
          0
        )
        .to(
          logoRef.current,
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
          0.15
        )
        .to(headingRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, 0.45)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
        .to(
          particlesRef.current,
          { opacity: 0, y: -120, duration: 0.8, stagger: { each: 0.015, from: "random" } },
          0.6
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen-dvh w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-carbon-950 via-black to-carbon-950 px-6 py-24 text-center"
    >
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-600/20 blur-[120px]"
      />

      {/* Smoke / particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const left = (i * 97) % 100;
          const size = 40 + ((i * 53) % 120);
          return (
            <div
              key={i}
              ref={(el) => {
                particlesRef.current[i] = el;
              }}
              className="absolute rounded-full bg-gradient-to-t from-ember-500/10 to-transparent blur-2xl"
              style={{
                left: `${left}%`,
                bottom: "-10%",
                width: `${size}px`,
                height: `${size}px`,
              }}
            />
          );
        })}
      </div>

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 mb-8">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border border-ember-500/30 shadow-[0_0_60px_rgba(255,107,26,0.35)] sm:h-44 sm:w-44">
          <Image
            src="/images/logo.jpeg"
            alt="Asadero logo"
            fill
            sizes="(max-width: 640px) 128px, 176px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Heading */}
      <div ref={headingRef} className="relative z-10">
        <h2 className="font-display text-5xl tracking-widest2 text-stone-50 sm:text-6xl lg:text-7xl">
          LA SANTA
        </h2>
        <p className="mt-4 text-sm font-light uppercase tracking-widest2 text-ember-400 sm:text-base">
          Carnes Asadas · Experiencia gastronómica premium
        </p>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="relative z-10 mt-12">
        <a
          href="https://wa.me/525567471935"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ember-500/60 px-10 py-4 text-sm font-medium uppercase tracking-widest2 text-stone-50 transition-colors duration-300 hover:border-ember-400"
        >
          <span className="absolute inset-0 -z-10 translate-y-full bg-ember-500 transition-transform duration-500 ease-out group-hover:translate-y-0" />
          <span className="relative transition-colors duration-300 group-hover:text-carbon-950">
            Reservar ahora
          </span>
        </a>
      </div>

      <p className="relative z-10 mt-10 max-w-md text-xs font-light text-stone-500 sm:text-sm">
        Cortes selectos, fuego vivo y una mesa que celebra cada detalle.
        Reserva tu experiencia y descúbrelo por ti mismo.
      </p>
    </section>
  );
}
