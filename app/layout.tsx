import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carnes Asadas \"La Santa\" — Experiencia Gastronómica Premium",
  description:
    "Molcajetes de carne asada y cortes de producción local en Coyotepec. Una experiencia cinematográfica del fuego al plato.",
  icons: {
    icon: "/images/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-body antialiased bg-carbon-950 text-stone-100">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
