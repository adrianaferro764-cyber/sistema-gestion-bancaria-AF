import { getProductoById } from "@/lib/storage";
import CdtSimulator from "@/components/simuladores/CdtSimulator";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";

export const metadata = {
  title: "Simulador de CDT | BBVA Colombia",
  description:
    "Calcula los rendimientos de tu inversión a término fijo con el CDT BBVA desde $500.000.",
};

export default async function SimuladorCdtPage() {
  const productoCdt = (await getProductoById("cdt")) || {
    id: "cdt",
    nombre: "CDT",
    categoria: "inversion" as const,
    icono: "TrendingUp",
    descripcion: "Inversión a un plazo determinado con rentabilidad.",
    tasaEA: 10.5,
    montoMinimo: 500000,
    montoMaximo: 1000000000,
    montoDefault: 5000000,
    beneficios: [],
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Navegación y breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/productos"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-bbva-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo de productos</span>
        </Link>

        <Link
          href="/simuladores/credito"
          className="inline-flex items-center gap-2 text-xs font-bold text-bbva-blue hover:text-bbva-navy transition-colors bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
        >
          <Calculator className="w-4 h-4" />
          <span>¿Necesitas financiación? Ir al Simulador de Crédito</span>
        </Link>
      </div>

      {/* Componente del Simulador de CDT (Página 5) */}
      <CdtSimulator productoCdt={productoCdt} />
    </div>
  );
}
