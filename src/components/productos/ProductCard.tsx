"use client";

import Link from "next/link";
import { ProductoFinanciero } from "@/types";
import {
  Home,
  BadgeDollarSign,
  Car,
  TrendingUp,
  CreditCard,
  ArrowRight,
  Percent,
} from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  producto: ProductoFinanciero;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const [modalAbierto, setModalAbierto] = useState(false);

  // Mapear icono
  const renderIcono = () => {
    const props = { className: "w-10 h-10 text-bbva-navy stroke-[1.5]" };
    switch (producto.icono) {
      case "Home":
        return <Home {...props} />;
      case "BadgeDollarSign":
        return <BadgeDollarSign {...props} />;
      case "Car":
        return <Car {...props} />;
      case "TrendingUp":
        return <TrendingUp {...props} />;
      case "CreditCard":
        return <CreditCard {...props} />;
      default:
        return <BadgeDollarSign {...props} />;
    }
  };

  // Determinar enlace al simulador
  const getSimuladorLink = () => {
    if (producto.id === "cdt") {
      return "/simuladores/cdt";
    }
    if (producto.categoria === "credito") {
      return `/simuladores/credito?tipo=${producto.id}`;
    }
    return "/contacto";
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-bbva-border p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center group">
        <div>
          {/* Contenedor del icono centrado */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-bbva-soft flex items-center justify-center group-hover:scale-105 transition-transform">
            {renderIcono()}
          </div>

          {/* Título del producto */}
          <h3 className="text-lg font-bold text-bbva-navy mb-2 min-h-[3rem] flex items-center justify-center">
            {producto.nombre}
          </h3>

          {/* Descripción textual del documento */}
          <p className="text-sm text-gray-600 mb-4 min-h-[2.5rem] leading-relaxed">
            {producto.descripcion}
          </p>

          {/* Badge de tasa referencial */}
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-bbva-navy text-xs font-semibold mb-6">
            <Percent className="w-3 h-3 text-bbva-light" />
            <span>
              {producto.categoria === "inversion"
                ? `Rentabilidad: ${producto.tasaEA}% E.A.`
                : producto.categoria === "ahorro"
                ? `Tasa hasta: ${producto.tasaEA}% E.A.`
                : `Tasa desde: ${producto.tasaEA}% E.A.`}
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setModalAbierto(true)}
            className="w-full py-2.5 px-4 rounded-lg bg-bbva-navy hover:bg-bbva-dark text-white text-sm font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            [ Más información ]
          </button>

          {producto.categoria !== "ahorro" && (
            <Link
              href={getSimuladorLink()}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-bbva-navy hover:text-bbva-blue transition-colors"
            >
              <span>Ir al Simulador</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Modal de Detalle de Producto */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-bbva-soft">
                  {renderIcono()}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-bbva-navy">{producto.nombre}</h4>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {producto.categoria === "credito"
                      ? "Línea de Crédito"
                      : producto.categoria === "inversion"
                      ? "Inversión a Plazo Fijo"
                      : "Producto de Ahorro"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {producto.descripcionDetallada || producto.descripcion}
              </p>

              <div className="bg-bbva-soft rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-200/60">
                  <span className="text-gray-600 font-medium">Tasa referencial anual:</span>
                  <span className="font-bold text-bbva-navy">{producto.tasaEA}% E.A.</span>
                </div>
                {producto.plazosMeses && (
                  <div className="flex justify-between py-1 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">Plazos disponibles:</span>
                    <span className="font-bold text-bbva-navy">
                      Desde {producto.plazosMeses[0]} hasta {producto.plazosMeses[producto.plazosMeses.length - 1]} meses
                    </span>
                  </div>
                )}
                {producto.plazosDias && (
                  <div className="flex justify-between py-1 border-b border-gray-200/60">
                    <span className="text-gray-600 font-medium">Plazos en días:</span>
                    <span className="font-bold text-bbva-navy">
                      {producto.plazosDias.join(", ")} días
                    </span>
                  </div>
                )}
                {producto.montoMinimo > 0 && (
                  <div className="flex justify-between py-1">
                    <span className="text-gray-600 font-medium">Monto mínimo:</span>
                    <span className="font-bold text-bbva-navy">
                      ${producto.montoMinimo.toLocaleString("es-CO")} COP
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h5 className="text-xs font-bold text-bbva-navy uppercase tracking-wider mb-2">
                  Beneficios destacados:
                </h5>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {producto.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-bbva-light font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setModalAbierto(false)}
                className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              <Link
                href={getSimuladorLink()}
                onClick={() => setModalAbierto(false)}
                className="flex-1 py-2.5 px-4 rounded-lg bg-bbva-navy hover:bg-bbva-dark text-white text-sm font-semibold text-center transition-colors shadow-sm"
              >
                {producto.categoria === "ahorro" ? "Contactar asesor" : "Simular producto"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
