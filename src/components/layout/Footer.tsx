import Link from "next/link";
import { Phone, MapPin, Globe, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bbva-dark text-white border-t border-bbva-navy mt-auto">
      {/* Slogan banner as seen in the design document */}
      <div className="bg-bbva-navy py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-wider text-white">BBVA Colombia</span>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-sm text-gray-200">
              Soluciones financieras para acompañarte en tus proyectos
            </span>
          </div>
          <div className="text-xs text-blue-200">
            Regional Caldas • Oficina La Dorada
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Identidad */}
          <div className="space-y-4">
            <div className="text-2xl font-black tracking-tight text-white">BBVA</div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Plataforma de Simulación Financiera diseñada para la planeación y consulta ágil de soluciones de crédito e inversión en el departamento de Caldas.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-300">
              <ShieldCheck className="w-4 h-4 text-bbva-light" />
              <span>Simulaciones con parámetros vigentes</span>
            </div>
          </div>

          {/* Columna 2: Productos */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bbva-light mb-4">
              Nuestros Productos
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/simuladores/credito?tipo=vivienda" className="hover:text-white transition-colors">
                  Crédito de Vivienda
                </Link>
              </li>
              <li>
                <Link href="/simuladores/credito?tipo=libre-inversion" className="hover:text-white transition-colors">
                  Libre Inversión
                </Link>
              </li>
              <li>
                <Link href="/simuladores/credito?tipo=vehiculo" className="hover:text-white transition-colors">
                  Crédito de Vehículo
                </Link>
              </li>
              <li>
                <Link href="/simuladores/cdt" className="hover:text-white transition-colors">
                  Inversión en CDT
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Cuenta de Ahorros
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Simuladores */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bbva-light mb-4">
              Herramientas
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/simuladores/credito" className="hover:text-white transition-colors">
                  Simulador de Crédito
                </Link>
              </li>
              <li>
                <Link href="/simuladores/cdt" className="hover:text-white transition-colors">
                  Simulador de CDT (Desde $500.000)
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Canal de Asesoría y Consultas
                </Link>
              </li>
              <li>
                <Link href="/#flujo-sistema" className="hover:text-white transition-colors">
                  Flujo del Sistema
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Regional */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-bbva-light mb-4">
              Atención Regional
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bbva-light shrink-0 mt-0.5" />
                <span>Oficina BBVA La Dorada – Caldas (Calle 14 # 3-25, Centro)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bbva-light shrink-0" />
                <span>Línea Nacional: 01 8000 912 227</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-bbva-light shrink-0" />
                <span>Canales Digitales BBVA Móvil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-3">
          <p>© {new Date().getFullYear()} BBVA Colombia S.A. Todos los derechos reservados.</p>
          <p className="text-center sm:text-right text-gray-400">
            Resultado únicamente informativo. Las condiciones finales están sujetas a estudio y aprobación de la entidad.
          </p>
        </div>
      </div>
    </footer>
  );
}
