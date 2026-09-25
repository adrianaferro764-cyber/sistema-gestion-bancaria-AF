"use server";

import { guardarConsulta } from "@/lib/storage";

export interface ContactActionResult {
  exito: boolean;
  mensaje: string;
  errores?: {
    nombre?: string;
    correo?: string;
    consulta?: string;
  };
}

export async function enviarContactoAction(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const nombre = formData.get("nombre")?.toString().trim() || "";
  const correo = formData.get("correo")?.toString().trim() || "";
  const consulta = formData.get("consulta")?.toString().trim() || "";

  const errores: ContactActionResult["errores"] = {};

  if (!nombre || nombre.length < 3) {
    errores.nombre = "Por favor ingresa tu nombre completo (mínimo 3 caracteres).";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo || !emailRegex.test(correo)) {
    errores.correo = "Ingresa un correo electrónico corporativo o personal válido.";
  }

  if (!consulta || consulta.length < 10) {
    errores.consulta = "Por favor describe tu consulta detalladamente (mínimo 10 caracteres).";
  }

  if (Object.keys(errores).length > 0) {
    return {
      exito: false,
      mensaje: "Por favor revisa los campos requeridos.",
      errores,
    };
  }

  const resultado = await guardarConsulta({
    nombre,
    correo,
    consulta,
  });

  return {
    exito: resultado.exito,
    mensaje: resultado.mensaje,
  };
}
