"use client";

import { useState, useTransition } from "react";
import { ProductoFinanciero, SimulacionCreditoResultado } from "@/types";
import {
  calcularSimulacionCredito,
  formatearMonedaCOP,
} from "@/lib/financial-math";
import { ArrowRight, Calculator, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface CreditSimulatorProps {
  productosCredito: ProductoFinanciero[];
  initialTipo?: string;
}

export default function CreditSimulator({
  productosCredito,
  initialTipo,
}: CreditSimulatorProps) {
  // Encontrar el producto inicial o por defecto 'libre-inversion'
  const productoInicial =
    productosCredito.find((p) => p.id === initialTipo) ||
    productosCredito.find((p) => p.id === "libre-inversion") ||
    productosCredito[0];

  const [tipoCredito, setTipoCredito] = useState<string>(
    productoInicial?.id || "libre-inversion"
  );
  const [monto, setMonto] = useState<number>(20000000);
  const [montoTexto, setMontoTexto] = useState<string>("20.000.000");
  const [plazoMeses, setPlazoMeses] = useState<number>(48);
  const [tasaEA, setTasaEA] = useState<number>(productoInicial?.tasaEA || 18.2);

  // Resultado del cálculo inicial
  const [resultado, setResultado] = useState<SimulacionCreditoResultado>(() => {
    return calcularSimulacionCredito({
      monto: 20000000,
      plazoMeses: 48,
      tipoCredito: productoInicial?.id || "libre-inversion",
      tasaEA: productoInicial?.tasaEA || 18.2,
    });
  });

  const [simulado, setSimulado] = useState<boolean>(true);
  const [, startTransition] = useTransition();

  // Opciones de plazo según el producto seleccionado
  const productoActual = productosCredito.find((p) => p.id === tipoCredito);
  const plazosDisponibles = productoActual?.plazosMeses || [
    12, 24, 36, 48, 60, 72, 84, 120,
  ];

  // Manejador al cambiar de tipo de crédito
  const handleCambioTipo = (nuevoTipo: string) => {
    setTipoCredito(nuevoTipo);
    const prod = productosCredito.find((p) => p.id === nuevoTipo);
    if (prod) {
      setTasaEA(prod.tasaEA);
      if (prod.plazosMeses && !prod.plazosMeses.includes(plazoMeses)) {
        setPlazoMeses(prod.plazoDefault || prod.plazosMeses[0]);
      }
    }
  };

  // Manejador del input de monto con formato visual
  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    const num = Number(rawVal);
    setMonto(num);
    setMontoTexto(num > 0 ? num.toLocaleString("es-CO") : "");
  };

  // Ejecutar simulación
  const handleSimular = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    startTransition(() => {
      const res = calcularSimulacionCredito({
        monto,
        plazoMeses,
        tipoCredito,
        tasaEA,
      });
      setResultado(res);
      setSimulado(true);
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-bbva-border shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Panel Izquierdo: Formulario de Entrada (Página 4 del documento) */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-bbva-soft text-bbva-navy">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-bbva-navy tracking-tight">
                Simulador de Crédito
              </h2>
              <p className="text-xs text-gray-500">
                Calcula tu cuota mensual estimada según tus necesidades de financiación
              </p>
            </div>
          </div>

          <form onSubmit={handleSimular} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* ¿Cuánto necesitas? */}
              <div>
                <label
                  htmlFor="monto"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  ¿Cuánto necesitas?
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-base font-bold">$</span>
                  </div>
                  <input
                    type="text"
                    id="monto"
                    value={montoTexto}
                    onChange={handleMontoChange}
                    placeholder="20.000.000"
                    className="block w-full rounded-lg border border-gray-300 pl-8 pr-4 py-3 text-base text-gray-900 font-medium focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors"
                    required
                  />
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                  <span>Mínimo: {formatearMonedaCOP(productoActual?.montoMinimo || 1000000)}</span>
                </div>
              </div>

              {/* Plazo en meses */}
              <div>
                <label
                  htmlFor="plazo"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Plazo
                </label>
                <select
                  id="plazo"
                  value={plazoMeses}
                  onChange={(e) => setPlazoMeses(Number(e.target.value))}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 font-medium focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors bg-white"
                >
                  {plazosDisponibles.map((meses) => (
                    <option key={meses} value={meses}>
                      {meses} meses ({Math.floor(meses / 12)} {meses / 12 === 1 ? "año" : "años"}
                      {meses % 12 !== 0 ? ` y ${meses % 12} m` : ""})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tasa de interés */}
              <div>
                <label
                  htmlFor="tasa"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tasa de interés
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <input
                    type="number"
                    step="0.01"
                    id="tasa"
                    value={tasaEA}
                    onChange={(e) => setTasaEA(Number(e.target.value))}
                    className="block w-full rounded-lg border border-gray-300 pl-4 pr-10 py-3 text-base text-gray-900 font-medium focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors"
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm font-bold">% E.A.</span>
                  </div>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  Equivalente a {(resultado.tasaMesVencido || 0).toFixed(2)}% M.V.
                </p>
              </div>

              {/* Tipo de crédito */}
              <div>
                <label
                  htmlFor="tipoCredito"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Tipo de crédito
                </label>
                <select
                  id="tipoCredito"
                  value={tipoCredito}
                  onChange={(e) => handleCambioTipo(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 font-medium focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors bg-white"
                >
                  {productosCredito.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botón de Acción Principal */}
            <div>
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-lg bg-bbva-navy hover:bg-bbva-dark text-white font-bold text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>[ SIMULAR CRÉDITO ]</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Panel Derecho: Tarjeta de Resultado (Fiel a la vista de la Página 4) */}
        <div className="bg-bbva-dark text-white p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-bbva-navy relative overflow-hidden">
          {/* Fondo sutil decorativo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-bbva-navy/30 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="border-b border-blue-900/60 pb-4 mb-6">
              <span className="text-xs uppercase tracking-widest text-bbva-light font-bold">
                BBVA Simulación
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Resultado de la simulación
              </h3>
            </div>

            <div className="space-y-4">
              {/* Valor solicitado */}
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-300 text-sm">Valor solicitado:</span>
                <span className="text-lg font-bold text-white tracking-wide">
                  {formatearMonedaCOP(resultado.valorSolicitado)}
                </span>
              </div>

              {/* Plazo */}
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-300 text-sm">Plazo:</span>
                <span className="text-base font-semibold text-blue-200">
                  {resultado.plazoMeses} meses
                </span>
              </div>

              {/* Tasa */}
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-300 text-sm">Tasa:</span>
                <span className="text-base font-semibold text-blue-200">
                  {resultado.tasaEA}% E.A. ({resultado.tasaMesVencido}% M.V.)
                </span>
              </div>

              {/* Cuota aproximada destacada */}
              <div className="bg-bbva-navy/50 border border-bbva-blue/40 rounded-xl p-5 mt-4">
                <span className="text-xs text-blue-200 block mb-1">
                  Cuota mensual aproximada:
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-bbva-light block tracking-tight">
                  {formatearMonedaCOP(resultado.cuotaMensualAprox)}
                </span>
                <div className="mt-2 text-[11px] text-gray-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Incluye capital e intereses proyectados</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800 space-y-4">
            {/* Nota legal textual del documento */}
            <div className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed bg-blue-950/40 p-3 rounded-lg border border-blue-900/40">
              <Info className="w-4 h-4 text-bbva-light shrink-0 mt-0.5" />
              <p>
                <strong>Resultado únicamente informativo.</strong> Las condiciones finales están sujetas a estudio y aprobación de la entidad.
              </p>
            </div>

            <Link
              href="/contacto"
              className="w-full inline-flex items-center justify-center py-3 px-4 rounded-lg bg-bbva-light hover:bg-sky-400 text-bbva-dark font-bold text-sm transition-all shadow-md"
            >
              Solicitar asesoría para este crédito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
