"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
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
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative w-full bg-carbon-950 px-6 py-24 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div
          ref={(el) => {
            itemsRef.current[0] = el;
          }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest2 text-ember-400 sm:text-sm">
            Quiénes somos
          </p>
          <h2 className="font-display text-4xl tracking-widest2 text-stone-50 sm:text-5xl lg:text-6xl">
            NOSOTROS
          </h2>
        </div>

        <div
          ref={(el) => {
            itemsRef.current[1] = el;
          }}
          className="mt-10 space-y-6 text-sm font-light leading-relaxed text-stone-300 sm:text-base lg:text-lg"
        >
          <p>
            En Carnes Asadas &quot;La Santa&quot; creemos que una buena comida empieza con un buen
            corte. Por eso trabajamos en colaboración con{" "}
            <a
              href="https://www.facebook.com/profile.php?id=100061072536467"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ember-400 underline transition-colors duration-300 hover:text-ember-300"
            >
              Rancho Los Sauces
            </a>
            , seleccionados cuidadosamente para garantizar calidad, frescura y sabor en cada
            platillo.
          </p>
          <p>
            Nuestro objetivo es sorprender a cada comensal, ya sea con el punto perfecto de un
            molcajete, el aroma del fuego o el detalle en cada presentación. Buscamos que cada
            visita sea una experiencia memorable, donde la calidad del producto se note desde el
            primer bocado.
          </p>
          <p>
            Somos un negocio familiar, y eso se siente: en el trato cercano, en la calidez del
            lugar y en el cuidado con el que preparamos cada platillo. Nos esforzamos por ofrecer
            un servicio profesional sin perder la calidez de comer en casa, para que cada visita
            se sienta como una celebración entre familia y amigos.
          </p>
        </div>
      </div>
    </section>
  );
}
