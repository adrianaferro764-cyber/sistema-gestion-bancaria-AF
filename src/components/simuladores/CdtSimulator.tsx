"use client";

import { useState } from "react";
import { ProductoFinanciero, SimulacionCdtResultado } from "@/types";
import {
  calcularSimulacionCDT,
  formatearMonedaCOP,
} from "@/lib/financial-math";
import { ArrowRight, Landmark, Info, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface CdtSimulatorProps {
  productoCdt: ProductoFinanciero;
}

export default function CdtSimulator({ productoCdt }: CdtSimulatorProps) {
  const [monto, setMonto] = useState<number>(5000000);
  const [montoTexto, setMontoTexto] = useState<string>("5.000.000");
  const [plazoDias, setPlazoDias] = useState<number>(360);
  const [tasaEA, setTasaEA] = useState<number>(productoCdt?.tasaEA || 10.5);
  const [errorMonto, setErrorMonto] = useState<string>("");

  const [resultado, setResultado] = useState<SimulacionCdtResultado>(() => {
    return calcularSimulacionCDT({
      monto: 5000000,
      plazoDias: 360,
      tasaEA: productoCdt?.tasaEA || 10.5,
    });
  });

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    const num = Number(rawVal);
    setMonto(num);
    setMontoTexto(num > 0 ? num.toLocaleString("es-CO") : "");

    if (num > 0 && num < 500000) {
      setErrorMonto("El monto mínimo requerido para CDT es de $500.000 COP.");
    } else {
      setErrorMonto("");
    }
  };

  const handleCalcular = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (monto < 500000) {
      setErrorMonto("El monto mínimo para aperturar un CDT en BBVA es de $500.000 COP.");
      return;
    }
    setErrorMonto("");
    const res = calcularSimulacionCDT({
      monto,
      plazoDias,
      tasaEA,
    });
    setResultado(res);
  };

  const opcionesPlazo = [
    { dias: 90, label: "90 días (3 meses)" },
    { dias: 180, label: "180 días (6 meses)" },
    { dias: 270, label: "270 días (9 meses)" },
    { dias: 360, label: "360 días (12 meses / 1 año)" },
    { dias: 540, label: "540 días (18 meses)" },
    { dias: 720, label: "720 días (24 meses / 2 años)" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-bbva-border shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Columna Izquierda: Formulario CDT (Página 5) */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-bbva-soft text-bbva-navy">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-bbva-navy tracking-tight">
                Simulador de CDT
              </h2>
              <p className="text-xs text-gray-500">
                Proyecta la rentabilidad garantizada de tu inversión a término fijo
              </p>
            </div>
          </div>

          <form onSubmit={handleCalcular} className="space-y-6">
            {/* Monto a Invertir */}
            <div>
              <label
                htmlFor="montoCdt"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Monto a invertir
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-base font-bold">$</span>
                </div>
                <input
                  type="text"
                  id="montoCdt"
                  value={montoTexto}
                  onChange={handleMontoChange}
                  placeholder="5.000.000"
                  className={`block w-full rounded-lg border pl-8 pr-4 py-3 text-base text-gray-900 font-medium focus:outline-none transition-colors ${
                    errorMonto
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-gray-300 focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy"
                  }`}
                  required
                />
              </div>

              {errorMonto ? (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMonto}</span>
                </div>
              ) : (
                <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                  <span>Monto mínimo según documento: $500.000 COP</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Plazo en Días */}
              <div>
                <label
                  htmlFor="plazoDias"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Plazo de inversión
                </label>
                <select
                  id="plazoDias"
                  value={plazoDias}
                  onChange={(e) => setPlazoDias(Number(e.target.value))}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 font-medium focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors bg-white"
                >
                  {opcionesPlazo.map((opt) => (
                    <option key={opt.dias} value={opt.dias}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tasa de Rentabilidad Estimada */}
              <div>
                <label
                  htmlFor="tasaCdt"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tasa estimada (% E.A.)
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    type="number"
                    step="0.01"
                    id="tasaCdt"
                    value={tasaEA}
                    onChange={(e) => setTasaEA(Number(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 pl-4 pr-10 py-3 text-base text-gray-900 font-medium focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors"
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm font-bold">% E.A.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón [ CALCULAR ] según el documento */}
            <div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-bbva-navy hover:bg-bbva-dark text-white font-bold text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>[ CALCULAR ]</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Respaldo de seguridad Fogafín */}
          <div className="mt-8 flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-xs text-gray-600">
              <span className="font-bold text-gray-800">Inversión 100% segura:</span> Protegida por el Seguro de Depósitos de Fogafín hasta por $50 millones de pesos.
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Resultado Estimado (Página 5) */}
        <div className="bg-bbva-dark text-white p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-bbva-navy relative overflow-hidden">
          <div className="space-y-6">
            <div className="border-b border-blue-900/60 pb-4">
              <span className="text-xs uppercase tracking-widest text-bbva-light font-bold">
                BBVA Inversión
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Resultado estimado
              </h3>
            </div>

            <div className="space-y-3.5">
              {/* Monto invertido */}
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-300 text-sm">Monto invertido:</span>
                <span className="text-base font-bold text-white">
                  {formatearMonedaCOP(resultado.montoInvertido)}
                </span>
              </div>

              {/* Plazo */}
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-300 text-sm">Plazo:</span>
                <span className="text-base font-semibold text-blue-200">
                  {resultado.plazoDias} días ({resultado.plazoMesesAprox} meses)
                </span>
              </div>

              {/* Rendimiento estimado */}
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-300 text-sm">Rendimiento estimado:</span>
                <span className="text-base font-bold text-emerald-400">
                  +{formatearMonedaCOP(resultado.rendimientoEstimado)}
                </span>
              </div>

              {/* Valor final estimado (caja destacada) */}
              <div className="bg-bbva-navy/50 border border-bbva-blue/40 rounded-xl p-5 mt-4">
                <span className="text-xs text-blue-200 block mb-1">
                  Valor final estimado:
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-bbva-light block tracking-tight">
                  {formatearMonedaCOP(resultado.valorFinalEstimado)}
                </span>
                <span className="text-[11px] text-gray-300 block mt-1">
                  (Capital inicial + Rendimiento neto)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 space-y-4">
            {/* Texto legal exacto de la página 5 */}
            <div className="text-xs text-gray-300 leading-relaxed bg-blue-950/40 p-3.5 rounded-lg border border-blue-900/40 space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-bbva-light shrink-0 mt-0.5" />
                <p>
                  <strong>Simulación informativa.</strong> La rentabilidad final dependerá de las condiciones vigentes del producto.
                </p>
              </div>
              <p className="text-[11px] text-gray-400 pl-6">
                BBVA informa que el CDT Online puede contratarse mediante sus canales digitales y actualmente tiene un monto mínimo de $500.000, aunque las condiciones pueden variar según el producto y canal.
              </p>
            </div>

            <Link
              href="/contacto"
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-lg bg-bbva-light hover:bg-sky-400 text-bbva-dark font-bold text-sm transition-all shadow-md"
            >
              Aperturar o solicitar asesoría
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
