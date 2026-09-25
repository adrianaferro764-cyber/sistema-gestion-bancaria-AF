import fs from "fs/promises";
import path from "path";
import { ProductoFinanciero, SucursalesData, ConsultaContacto } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

async function leerJson<T>(nombreArchivo: string, defaultData: T): Promise<T> {
  try {
    const ruta = path.join(DATA_DIR, nombreArchivo);
    const contenido = await fs.readFile(ruta, "utf-8");
    return JSON.parse(contenido) as T;
  } catch (error) {
    console.error(`Error leyendo archivo ${nombreArchivo}:`, error);
    return defaultData;
  }
}

async function escribirJson<T>(nombreArchivo: string, datos: T): Promise<boolean> {
  try {
    const ruta = path.join(DATA_DIR, nombreArchivo);
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(ruta, JSON.stringify(datos, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error(`Error escribiendo archivo ${nombreArchivo}:`, error);
    return false;
  }
}

export async function getProductos(): Promise<ProductoFinanciero[]> {
  return leerJson<ProductoFinanciero[]>("productos.json", []);
}

export async function getProductoById(id: string): Promise<ProductoFinanciero | undefined> {
  const productos = await getProductos();
  return productos.find((p) => p.id === id);
}

export async function getSucursales(): Promise<SucursalesData> {
  return leerJson<SucursalesData>("sucursales.json", {
    oficinaPrincipal: {
      nombre: "Oficina BBVA La Dorada – Caldas",
      departamento: "Caldas",
      municipio: "La Dorada",
      direccion: "Calle 14 # 3-25, Centro",
      horario: "Lunes a Viernes de 8:00 a.m. a 4:30 p.m.",
      servicios: [],
    },
    lineasAtencion: [],
    canalesDigitales: [],
  });
}

export async function getConsultas(): Promise<ConsultaContacto[]> {
  return leerJson<ConsultaContacto[]>("consultas.json", []);
}

export async function guardarConsulta(
  nuevaConsulta: Omit<ConsultaContacto, "id" | "fecha" | "estado">
): Promise<{ exito: boolean; mensaje: string; consulta?: ConsultaContacto }> {
  try {
    const consultas = await getConsultas();
    const consultaCreada: ConsultaContacto = {
      id: `c-${Date.now()}`,
      nombre: nuevaConsulta.nombre.trim(),
      correo: nuevaConsulta.correo.trim(),
      consulta: nuevaConsulta.consulta.trim(),
      fecha: new Date().toISOString(),
      estado: "Pendiente",
    };

    consultas.unshift(consultaCreada);
    const guardado = await escribirJson("consultas.json", consultas);

    if (guardado) {
      return {
        exito: true,
        mensaje: "Tu consulta ha sido enviada con éxito. Un asesor de la oficina BBVA te contactará a la brevedad.",
        consulta: consultaCreada,
      };
    } else {
      return {
        exito: false,
        mensaje: "Error interno al guardar la consulta en el sistema.",
      };
    }
  } catch (err) {
    console.error("Error en guardarConsulta:", err);
    return {
      exito: false,
      mensaje: "Ocurrió un error inesperado al procesar la solicitud.",
    };
  }
}
