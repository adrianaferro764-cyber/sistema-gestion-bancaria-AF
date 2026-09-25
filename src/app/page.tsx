import Link from "next/link";
import { getProductos } from "@/lib/storage";
import ProductCard from "@/components/productos/ProductCard";
import SystemFlow from "@/components/home/SystemFlow";
import {
  ArrowRight,
  Calculator,
  ShieldCheck,
  Building,
  TrendingUp,
  Percent,
} from "lucide-react";

export default async function HomePage() {
  const productos = await getProductos();

  return (
    <div className="space-y-16 pb-16">
      {/* SECCIÓN HERO (Páginas 1 y 2 del documento de diseño) */}
      <section className="relative bg-gradient-to-br from-bbva-dark via-bbva-navy to-[#00284D] text-white py-16 sm:py-24 overflow-hidden">
        {/* Elementos geométricos de fondo */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-bbva-blue/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-bbva-light/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-bbva-light border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                <span>Propuesta de Sistema de Información • Regional Caldas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Bienvenido a <span className="text-bbva-light">BBVA</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed">
                Encuentra productos y realiza tus simulaciones financieras de manera fácil y rápida.
              </p>

              {/* Botón [ CONOCER NUESTROS PRODUCTOS ] exactamente como el documento */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-bbva-navy hover:bg-gray-100 font-bold text-base tracking-wide transition-all shadow-lg hover:shadow-xl group"
                >
                  <span>[ CONOCER NUESTROS PRODUCTOS ]</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/simuladores/credito"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-bbva-blue/40 hover:bg-bbva-blue/60 border border-blue-400/40 text-white font-semibold text-base transition-colors"
                >
                  <Calculator className="w-5 h-5 text-bbva-light" />
                  <span>Simular Crédito</span>
                </Link>
              </div>

              {/* Micro-puntos de valor */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-blue-800/60 text-left">
                <div>
                  <div className="text-2xl font-black text-white">5+</div>
                  <div className="text-xs text-gray-300">Líneas de producto</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-bbva-light">100%</div>
                  <div className="text-xs text-gray-300">Simulación en línea</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">0$</div>
                  <div className="text-xs text-gray-300">Costo de consulta</div>
                </div>
              </div>
            </div>

            {/* Tarjeta Visual Destacada (Simulador interactivo rápido) */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-bold text-bbva-light uppercase tracking-wider">
                    Simulación Rápida
                  </span>
                  <span className="text-[11px] text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                    Tasa desde 14.5% E.A.
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <span className="text-xs text-gray-300 block">Ejemplo referencial de crédito:</span>
                    <div className="text-2xl font-extrabold text-white mt-1">
                      $ 20.000.000 COP
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-bbva-dark/60 rounded-xl p-3 text-xs border border-white/10">
                    <div>
                      <span className="text-gray-400 block">Plazo estimado</span>
                      <span className="font-bold text-white text-sm">48 meses</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Cuota mensual aprox.</span>
                      <span className="font-bold text-bbva-light text-sm">$ 578.432 COP</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2.5">
                    <Link
                      href="/simuladores/credito"
                      className="w-full py-3 px-4 rounded-lg bg-bbva-light hover:bg-sky-400 text-bbva-dark text-center font-bold text-sm transition-all shadow-md"
                    >
                      Personalizar mi simulación
                    </Link>
                    <Link
                      href="/simuladores/cdt"
                      className="w-full py-2 px-4 rounded-lg bg-transparent hover:bg-white/10 text-white text-center font-medium text-xs transition-colors border border-white/20"
                    >
                      Calcular rentabilidad en CDT (Desde $500.000)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PRODUCTOS DESTACADOS (Página 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-bbva-blue font-bold">
              Portafolio Financiero
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-bbva-navy tracking-tight mt-1">
              Nuestros productos financieros
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Selecciona el producto que mejor se adapte a tus proyectos personales o familiares.
            </p>
          </div>
          <Link
            href="/productos"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-bbva-navy hover:text-bbva-blue transition-colors self-start sm:self-auto"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grilla de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      {/* SECCIÓN FLUJO DEL SISTEMA (Página 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SystemFlow />
      </section>

      {/* SECCIÓN CANALES Y OFICINA LA DORADA (Página 6 Teaser) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-bbva-navy to-bbva-blue rounded-2xl p-8 sm:p-12 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-bbva-light font-bold">
              Atención Presencial y Virtual
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              ¿Deseas formalizar tu solicitud en Caldas?
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed">
              Visítanos en la Oficina BBVA La Dorada o contáctanos a través de la Línea Gratuita Nacional 01 8000 912 227 para radicar tus documentos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/contacto"
              className="py-3 px-6 rounded-xl bg-white text-bbva-navy hover:bg-gray-100 font-bold text-sm text-center transition-all shadow-md"
            >
              Ir a Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
