import { getProductos } from "@/lib/storage";
import CreditSimulator from "@/components/simuladores/CreditSimulator";
import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";

export const metadata = {
  title: "Simulador de Crédito | BBVA Colombia",
  description:
    "Simula tu crédito de vivienda, libre inversión o vehículo y calcula tu cuota mensual estimada.",
};

interface PageProps {
  searchParams: Promise<{ tipo?: string }>;
}

export default async function SimuladorCreditoPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const todosLosProductos = await getProductos();
  const productosCredito = todosLosProductos.filter((p) => p.categoria === "credito");

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
          href="/simuladores/cdt"
          className="inline-flex items-center gap-2 text-xs font-bold text-bbva-blue hover:text-bbva-navy transition-colors bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
        >
          <Landmark className="w-4 h-4" />
          <span>¿Buscas rentabilidad garantizada? Ir al Simulador de CDT</span>
        </Link>
      </div>

      {/* Componente del Simulador de Crédito (Página 4) */}
      <CreditSimulator
        productosCredito={productosCredito}
        initialTipo={resolvedParams.tipo}
      />
    </div>
  );
}
