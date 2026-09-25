import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BBVA Simulador Financiero | Regional Caldas",
  description:
    "Sistema de Información y Simulador Financiero BBVA para la planeación y consulta ágil de créditos de vivienda, vehículo, libre inversión, CDT y cuentas de ahorro en Caldas y La Dorada.",
  keywords: [
    "BBVA",
    "Simulador Financiero",
    "Crédito Vivienda",
    "Libre Inversión",
    "Crédito Vehículo",
    "CDT",
    "La Dorada",
    "Caldas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
