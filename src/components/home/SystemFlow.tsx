import {
  Home,
  Layers,
  MousePointerClick,
  Calculator,
  FileEdit,
  Cpu,
  BarChart3,
  MailCheck,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function SystemFlow() {
  const pasos = [
    {
      numero: "1",
      nombre: "INICIO",
      descripcion: "Explora la bienvenida e información institucional",
      icono: Home,
      href: "/",
    },
    {
      numero: "2",
      nombre: "PRODUCTOS",
      descripcion: "Accede al catálogo de soluciones financieras",
      icono: Layers,
      href: "/productos",
    },
    {
      numero: "3",
      nombre: "SELECCIONA PRODUCTO",
      descripcion: "Elige entre Créditos, CDT o Ahorros",
      icono: MousePointerClick,
      href: "/productos",
    },
    {
      numero: "4",
      nombre: "SIMULADOR",
      descripcion: "Carga el motor de cálculo según tu elección",
      icono: Calculator,
      href: "/simuladores/credito",
    },
    {
      numero: "5",
      nombre: "INGRESA DATOS",
      descripcion: "Digita monto, plazo y tasa de interés",
      icono: FileEdit,
      href: "/simuladores/credito",
    },
    {
      numero: "6",
      nombre: "CALCULA",
      descripcion: "Presiona el botón de simulación o cálculo",
      icono: Cpu,
      href: "/simuladores/credito",
    },
    {
      numero: "7",
      nombre: "RESULTADO",
      descripcion: "Visualiza cuota estimada o rendimientos",
      icono: BarChart3,
      href: "/simuladores/credito",
    },
    {
      numero: "8",
      nombre: "CONTACTO",
      descripcion: "Resuelve dudas o formaliza tu solicitud",
      icono: MailCheck,
      href: "/contacto",
    },
  ];

  return (
    <div id="flujo-sistema" className="py-12 bg-white rounded-2xl border border-bbva-border p-6 sm:p-10 shadow-sm">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-bbva-blue font-bold">
          Ruta de Experiencia de Usuario
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-bbva-navy mt-1 tracking-tight">
          Flujo del Sistema
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Recorrido sencillo para navegar y realizar simulaciones financieras de acuerdo con el diseño institucional.
        </p>
      </div>

      {/* Grid de pasos numerados */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 relative">
        {pasos.map((paso, idx) => {
          const Icon = paso.icono;
          return (
            <Link
              key={paso.numero}
              href={paso.href}
              className="group flex flex-col items-center text-center p-3 rounded-xl bg-bbva-soft/70 hover:bg-bbva-soft border border-bbva-border/60 transition-all hover:scale-105"
            >
              <div className="w-8 h-8 rounded-full bg-bbva-navy text-white text-xs font-black flex items-center justify-center mb-2 shadow-sm group-hover:bg-bbva-blue transition-colors">
                {paso.numero}
              </div>

              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-bbva-navy mb-2 shadow-xs">
                <Icon className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-extrabold text-bbva-navy tracking-tight uppercase">
                {paso.nombre}
              </span>

              <p className="text-[10px] text-gray-500 mt-1 leading-tight line-clamp-2">
                {paso.descripcion}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-bbva-navy hover:bg-bbva-dark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <span>Iniciar recorrido en Productos</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
