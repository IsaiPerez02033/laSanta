"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const images = Array.from({ length: 9 }, (_, i) => ({
  src: `/images/img${i + 1}.jpeg`,
  alt: `La Santa — galería ${i + 1}`,
}));

// Varying spans create an organic collage layout
const spanClasses = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.94, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="relative w-full bg-carbon-950 px-6 py-24 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest2 text-ember-400 sm:text-sm">
            La experiencia
          </p>
          <h2 className="font-display text-4xl tracking-widest2 text-stone-50 sm:text-5xl lg:text-6xl">
            GALERÍA
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 sm:[grid-auto-rows:14rem]">
          {images.map((img, i) => (
            <div
              key={img.src}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              onClick={() => setActive(i)}
              className={`group relative h-40 cursor-pointer overflow-hidden rounded-xl border border-stone-800 sm:h-full ${spanClasses[i]}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 ring-1 ring-inset ring-ember-500/0 transition-all duration-300 group-hover:ring-ember-500/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Cerrar"
            onClick={() => setActive(null)}
            className="absolute right-6 top-6 text-3xl font-light text-stone-300 transition-colors hover:text-ember-400"
          >
            ×
          </button>
          <button
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a === null ? a : (a - 1 + images.length) % images.length));
            }}
            className="absolute left-4 text-4xl font-light text-stone-300 transition-colors hover:text-ember-400 sm:left-10"
          >
            ‹
          </button>
          <div
            className="relative h-[70vh] w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              setActive((a) => (a === null ? a : (a + 1) % images.length));
            }}
            className="absolute right-4 text-4xl font-light text-stone-300 transition-colors hover:text-ember-400 sm:right-10"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
