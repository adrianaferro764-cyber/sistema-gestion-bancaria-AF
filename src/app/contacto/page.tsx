import { getSucursales } from "@/lib/storage";
import ContactInfo from "@/components/contacto/ContactInfo";
import ContactForm from "@/components/contacto/ContactForm";

export const metadata = {
  title: "Contáctanos | BBVA Colombia - Regional Caldas",
  description:
    "Comunícate con la oficina BBVA La Dorada - Caldas o envía tus dudas y solicitudes a nuestros asesores financieros.",
};

export default async function ContactoPage() {
  const sucursales = await getSucursales();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Columna Izquierda: Información de Sedes y Canales (Página 6) */}
        <div className="lg:col-span-6">
          <ContactInfo sucursales={sucursales} />
        </div>

        {/* Columna Derecha: Formulario de Contacto (Página 6) */}
        <div className="lg:col-span-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
