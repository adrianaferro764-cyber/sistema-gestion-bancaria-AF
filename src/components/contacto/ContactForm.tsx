"use client";

import { useActionState, useEffect, useRef } from "react";
import { enviarContactoAction, ContactActionResult } from "@/actions/contact.actions";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const initialState: ContactActionResult = {
  exito: false,
  mensaje: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(enviarContactoAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.exito && formRef.current) {
      formRef.current.reset();
    }
  }, [state.exito]);

  return (
    <div className="bg-white rounded-2xl border border-bbva-border p-6 sm:p-8 lg:p-10 shadow-sm relative">
      <div className="border-b border-gray-100 pb-4 mb-6">
        <span className="text-xs uppercase tracking-widest text-bbva-blue font-bold">
          Formulario de Atención
        </span>
        <h3 className="text-xl font-bold text-bbva-navy mt-1">
          Envíanos tu consulta
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Diligencia tus datos y resolveremos tus inquietudes sobre productos o simulaciones.
        </p>
      </div>

      {state.mensaje && (
        <div
          className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-xs ${
            state.exito
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {state.exito ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold">{state.exito ? "¡Solicitud Recibida!" : "Error en el envío"}</div>
            <div>{state.mensaje}</div>
          </div>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-5">
        {/* Campo Nombre */}
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            placeholder="Ej. Juan Pérez González"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors"
          />
          {state.errores?.nombre && (
            <p className="text-xs text-red-500 mt-1">{state.errores.nombre}</p>
          )}
        </div>

        {/* Campo Correo */}
        <div>
          <label
            htmlFor="correo"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Correo:
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            required
            placeholder="Ej. juan.perez@correo.com"
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors"
          />
          {state.errores?.correo && (
            <p className="text-xs text-red-500 mt-1">{state.errores.correo}</p>
          )}
        </div>

        {/* Campo Consulta */}
        <div>
          <label
            htmlFor="consulta"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Consulta:
          </label>
          <textarea
            id="consulta"
            name="consulta"
            rows={5}
            required
            placeholder="Describe aquí tus dudas sobre montos, tasas, plazos o el producto de tu interés..."
            className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-bbva-navy focus:ring-1 focus:ring-bbva-navy transition-colors resize-none"
          />
          {state.errores?.consulta && (
            <p className="text-xs text-red-500 mt-1">{state.errores.consulta}</p>
          )}
        </div>

        {/* Botón [ ENVIAR ] según el documento */}
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-lg bg-bbva-navy hover:bg-bbva-dark text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>[ ENVIAR ]</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-gray-400 text-center">
          Tus datos serán procesados y almacenados con estricta confidencialidad según las políticas de privacidad de BBVA Colombia.
        </p>
      </form>
    </div>
  );
}
