"use client";

import Image from "next/image";
import VideoSequence from "./VideoSequence";
import LogoReveal from "./LogoReveal";
import InfoSection from "./InfoSection";
import Gallery from "./Gallery";
import AboutSection from "./AboutSection";
import SocialLinks from "./SocialLinks";
import Navbar from "./Navbar";

export default function ScrollExperience() {
  return (
    <div className="relative">
      <Navbar />

      {/* Intro */}
      <section id="inicio" className="relative flex h-screen-dvh w-full flex-col items-center justify-center bg-carbon-950 px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest2 text-ember-400 sm:text-sm">
          Bienvenido a
        </p>
        <div className="relative h-32 w-32 overflow-hidden rounded-full border border-ember-500/30 shadow-[0_0_60px_rgba(255,107,26,0.35)] sm:h-44 sm:w-44 lg:h-56 lg:w-56">
          <Image
            src="/images/logo.jpeg"
            alt="Asadero"
            fill
            sizes="(max-width: 640px) 128px, (max-width: 1024px) 176px, 224px"
            className="object-cover"
            priority
          />
        </div>
        <p className="mt-6 max-w-md text-sm font-light text-stone-400 sm:text-base">
          Somos un establecimiento que brinda un servicio de molcajetes de carne asada y cortes de carne de producción local comprometidos de brindar un buen servicio a nuestros comensales.
        </p>
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-stone-500">
          <span className="text-xs uppercase tracking-widest2">Desplázate para comenzar</span>
          <span className="h-10 w-px animate-pulse bg-ember-500" />
        </div>
      </section>

      {/* Cinematic video sequence (pinned scenes) */}
      <VideoSequence />

      {/* Final logo reveal + CTA */}
      <LogoReveal />

      {/* Gallery */}
      <Gallery />

      {/* About us */}
      <AboutSection />

      {/* Restaurant info: menu, location & hours */}
      <InfoSection />

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-carbon-950 px-6 py-10 text-center text-xs text-stone-500">
        <SocialLinks className="mb-6" />
        <p>
          © {new Date().getFullYear()} Carnes Asadas &quot;La Santa&quot;. Todos los derechos
          reservados por{" "}
          <a
            href="https://portafolio-chi-tawny-37.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 underline transition-colors duration-300 hover:text-ember-400"
          >
            Aram Perez
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
