export type CategoriaProducto = "credito" | "inversion" | "ahorro";

export interface ProductoFinanciero {
  id: string;
  nombre: string;
  categoria: CategoriaProducto;
  icono: string;
  descripcion: string;
  descripcionDetallada?: string;
  tasaEA: number;
  plazosMeses?: number[];
  plazoDefault?: number;
  plazosDias?: number[];
  plazoDefaultDias?: number;
  montoMinimo: number;
  montoMaximo: number;
  montoDefault: number;
  beneficios: string[];
}

export interface SimulacionCreditoEntrada {
  monto: number;
  plazoMeses: number;
  tipoCredito: string;
  tasaEA: number;
}

export interface SimulacionCreditoResultado {
  valorSolicitado: number;
  plazoMeses: number;
  tasaEA: number;
  tasaMesVencido: number;
  cuotaMensualAprox: number;
  totalInteresesAprox: number;
  totalPagarAprox: number;
}

export interface SimulacionCdtEntrada {
  monto: number;
  plazoDias: number;
  tasaEA: number;
}

export interface SimulacionCdtResultado {
  montoInvertido: number;
  plazoDias: number;
  plazoMesesAprox: number;
  tasaEA: number;
  rendimientoEstimado: number;
  retencionFuenteEstimada: number;
  valorFinalEstimado: number;
}

export interface ConsultaContacto {
  id: string;
  nombre: string;
  correo: string;
  consulta: string;
  fecha: string;
  estado: "Pendiente" | "Atendido";
}

export interface OficinaInfo {
  nombre: string;
  departamento: string;
  municipio: string;
  direccion: string;
  horario: string;
  servicios: string[];
}

export interface CanalAtencion {
  nombre: string;
  numero?: string;
  descripcion: string;
}

export interface SucursalesData {
  oficinaPrincipal: OficinaInfo;
  lineasAtencion: CanalAtencion[];
  canalesDigitales: CanalAtencion[];
}
