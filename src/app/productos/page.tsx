import { getProductos } from "@/lib/storage";
import ProductCard from "@/components/productos/ProductCard";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Nuestros Productos Financieros | BBVA",
  description:
    "Conoce nuestro portafolio de créditos de vivienda, libre inversión, vehículos, CDT y cuentas de ahorro.",
};

export default async function ProductosPage() {
  const productos = await getProductos();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Encabezado Principal (Página 3) */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-bbva-blue font-bold">
          Portafolio de Soluciones
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-bbva-navy tracking-tight">
          Nuestros productos financieros
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Diseñados para brindarte la mejor tasa del mercado y acompañarte en cada una de tus metas personales, familiares y patrimoniales.
        </p>
      </div>

      {/* Grid de 5 productos del documento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      {/* Banner de acceso rápido a simuladores */}
      <div className="bg-bbva-soft rounded-2xl border border-bbva-border p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="text-lg font-bold text-bbva-navy">
            ¿Ya tienes un valor y plazo en mente?
          </h3>
          <p className="text-xs text-gray-600">
            Realiza tu simulación personalizada en segundos y conoce tu cuota estimada o el rendimiento neto garantizado.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/simuladores/credito"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bbva-navy hover:bg-bbva-dark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            <span>Simulador de Crédito</span>
          </Link>
          <Link
            href="/simuladores/cdt"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-bbva-navy text-bbva-navy hover:bg-gray-50 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>Simulador de CDT</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
