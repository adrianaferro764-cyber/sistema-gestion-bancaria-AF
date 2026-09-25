import { SucursalesData } from "@/types";
import { Building2, Phone, Smartphone, Clock, MapPin, CheckCircle } from "lucide-react";

interface ContactInfoProps {
  sucursales: SucursalesData;
}

export default function ContactInfo({ sucursales }: ContactInfoProps) {
  const { oficinaPrincipal, lineasAtencion, canalesDigitales } = sucursales;

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-bbva-navy tracking-tight">
          Contáctanos
        </h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Estamos a tu disposición para brindarte asesoría financiera personalizada en el departamento de Caldas y a través de nuestros canales nacionales.
        </p>
      </div>

      {/* Oficina BBVA La Dorada - Caldas (Página 6) */}
      <div className="bg-white rounded-xl border border-bbva-border p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-bbva-soft text-bbva-navy shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-bold text-bbva-navy">
              {oficinaPrincipal.nombre}
            </h3>
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <MapPin className="w-4 h-4 text-bbva-light shrink-0 mt-0.5" />
              <span>{oficinaPrincipal.direccion}</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <Clock className="w-4 h-4 text-bbva-light shrink-0 mt-0.5" />
              <span>{oficinaPrincipal.horario}</span>
            </div>

            {oficinaPrincipal.servicios && oficinaPrincipal.servicios.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  Servicios disponibles:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-gray-600">
                  {oficinaPrincipal.servicios.map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Línea BBVA (Página 6) */}
      <div className="bg-white rounded-xl border border-bbva-border p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-bbva-soft text-bbva-navy shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-bbva-navy">
              Líneas Telefónicas BBVA
            </h3>
            <div className="mt-2 space-y-2">
              {lineasAtencion.map((linea, index) => (
                <div key={index} className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-bbva-blue text-sm">
                      {linea.numero}
                    </span>
                    <span className="text-gray-500">— {linea.nombre}</span>
                  </div>
                  <p className="text-gray-500 mt-0.5">{linea.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Canales Digitales (Página 6) */}
      <div className="bg-white rounded-xl border border-bbva-border p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-bbva-soft text-bbva-navy shrink-0">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-bbva-navy">
              Canales Digitales BBVA
            </h3>
            <div className="mt-2 space-y-2 text-xs text-gray-600">
              {canalesDigitales.map((canal, index) => (
                <div key={index}>
                  <strong className="text-gray-800">{canal.nombre}:</strong>{" "}
                  <span>{canal.descripcion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
