"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Scene = {
  src: string;
  title: string;
  subtitle: string;
};

const scenes: Scene[] = [
  {
    src: "/videos/v1.mp4",
    title: "El origen del sabor.",
    subtitle: "Cortes seleccionados, calidad premium.",
  },
  {
    src: "/videos/v2.mp4",
    title: "El fuego despierta la experiencia.",
    subtitle: "Brasas vivas, técnica artesanal.",
  },
  {
    src: "/videos/v4.mp4",
    title: "Cada detalle importa.",
    subtitle: "Cocción precisa, paciencia y pasión.",
  },
  {
    src: "/videos/v3.mp4",
    title: "El punto perfecto.",
    subtitle: "Listo para servirse. Listo para disfrutarse.",
  },
];

export default function VideoSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videos = videoRefs.current;
    const texts = textRefs.current;
    const numScenes = scenes.length;

    // Ensure videos play (muted autoplay)
    videos.forEach((v) => {
      if (v) {
        v.play().catch(() => {});
      }
    });

    const ctx = gsap.context(() => {
      // Initial states
      videos.forEach((v, i) => {
        if (!v) return;
        gsap.set(v, {
          opacity: i === 0 ? 1 : 0,
          scale: i === 0 ? 1 : 1.08,
          filter: i === 0 ? "blur(0px)" : "blur(14px)",
        });
      });

      texts.forEach((t, i) => {
        if (!t) return;
        gsap.set(t, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
          filter: i === 0 ? "blur(0px)" : "blur(6px)",
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${window.innerHeight * (numScenes - 1) * 1.15}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      const overlap = 0.35;

      for (let i = 0; i < numScenes - 1; i++) {
        const pos = i;
        const current = videos[i];
        const next = videos[i + 1];
        const currentText = texts[i];
        const nextText = texts[i + 1];

        // Fade out current scene text slightly before transition
        if (currentText) {
          tl.to(
            currentText,
            { opacity: 0, y: -30, filter: "blur(6px)", duration: overlap, ease: "power2.in" },
            pos + 0.15
          );
        }

        // Crossfade videos
        if (current) {
          tl.to(
            current,
            { opacity: 0, scale: 0.97, filter: "blur(14px)", duration: overlap, ease: "power1.inOut" },
            pos + 0.3
          );
        }
        if (next) {
          tl.to(
            next,
            { opacity: 1, scale: 1, filter: "blur(0px)", duration: overlap, ease: "power1.inOut" },
            pos + 0.3
          );
        }

        // Fade in next scene text after transition
        if (nextText) {
          tl.fromTo(
            nextText,
            { opacity: 0, y: 40, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: overlap, ease: "power2.out" },
            pos + 0.65
          );
        }

        // Hold each scene for remaining duration
        tl.to({}, { duration: 1 - overlap }, pos + overlap);
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experiencia" ref={containerRef} className="relative h-screen-dvh w-full overflow-hidden bg-carbon-950">
      {scenes.map((scene, i) => (
        <video
          key={scene.src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          src={scene.src}
          muted
          loop
          playsInline
          autoPlay
          preload={i === 0 ? "auto" : "metadata"}
        />
      ))}

      <div className="vignette" />

      {/* Extra dark overlay + bottom gradient for text legibility on phones */}
      <div className="absolute inset-0 z-[5] bg-black/30 sm:hidden" />
      <div className="absolute inset-x-0 bottom-0 z-[5] h-3/4 bg-gradient-to-t from-black via-black/70 to-transparent sm:hidden" />

      {/* Watermark cover */}
      <div className="absolute left-[91%] top-[86%] z-30 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md sm:h-28 sm:w-28">
        <Image
          src="/images/logo_inv.jpg"
          alt=""
          fill
          sizes="80px"
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Brand mark */}
      <div className="absolute left-5 top-5 z-20 flex items-center gap-3 sm:left-10 sm:top-10">
        <span className="font-display text-xl tracking-widest2 text-stone-100 sm:text-3xl">
          LA SANTA
        </span>
      </div>

      {/* Scene texts */}
      <div className="absolute inset-x-0 bottom-24 z-10 px-5 sm:inset-0 sm:flex sm:items-center sm:justify-start sm:bottom-auto sm:px-10 lg:px-20">
        <div className="relative w-full sm:w-full">
          {scenes.map((scene, i) => (
            <div
              key={scene.title}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className={`absolute inset-x-0 bottom-0 max-w-[90%] sm:inset-auto sm:bottom-auto sm:max-w-xl ${
                i === 0 ? "sm:relative" : "sm:absolute"
              }`}
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-widest2 text-ember-400 sm:mb-3 sm:text-sm">
                {String(i + 1).padStart(2, "0")} / {String(numScenesLabel)}
              </p>
              <h2 className="scene-text font-display text-2xl leading-[1.15] tracking-wide text-stone-50 sm:text-6xl sm:leading-[1.05] lg:text-7xl">
                {scene.title}
              </h2>
              <p className="scene-text mt-2 line-clamp-2 max-w-md text-xs font-light text-stone-200 sm:mt-4 sm:line-clamp-none sm:text-base lg:text-lg">
                {scene.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 text-xs uppercase tracking-widest2 text-stone-400 sm:bottom-10 sm:left-10">
        <span className="hidden sm:inline">Desplázate</span>
        <span className="h-8 w-px animate-pulse bg-ember-500" />
      </div>
    </section>
  );
}

const numScenesLabel = "04";
