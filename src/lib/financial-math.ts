import {
  SimulacionCreditoEntrada,
  SimulacionCreditoResultado,
  SimulacionCdtEntrada,
  SimulacionCdtResultado,
} from "@/types";

/**
 * Formatea un número en formato de moneda colombiana (COP)
 * Ejemplo: 20000000 -> "$ 20.000.000"
 */
export function formatearMonedaCOP(valor: number): string {
  if (isNaN(valor)) return "$ 0";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(valor));
}

/**
 * Convierte Tasa Efectiva Anual (E.A.) a Tasa Mes Vencido (M.V.)
 */
export function calcularTasaMesVencido(tasaEA: number): number {
  const eaDecimal = tasaEA / 100;
  const mvDecimal = Math.pow(1 + eaDecimal, 1 / 12) - 1;
  return Number((mvDecimal * 100).toFixed(2));
}

/**
 * Calcula la simulación de crédito usando el sistema de amortización francés (cuota fija mensual)
 */
export function calcularSimulacionCredito(
  datos: SimulacionCreditoEntrada
): SimulacionCreditoResultado {
  const { monto, plazoMeses, tasaEA } = datos;

  if (monto <= 0 || plazoMeses <= 0) {
    return {
      valorSolicitado: monto,
      plazoMeses,
      tasaEA,
      tasaMesVencido: 0,
      cuotaMensualAprox: 0,
      totalInteresesAprox: 0,
      totalPagarAprox: 0,
    };
  }

  // Tasa mes vencido
  const eaDecimal = tasaEA / 100;
  const tasaMensual = Math.pow(1 + eaDecimal, 1 / 12) - 1;

  let cuota = 0;
  if (tasaMensual > 0) {
    const factor = Math.pow(1 + tasaMensual, plazoMeses);
    cuota = (monto * (tasaMensual * factor)) / (factor - 1);
  } else {
    cuota = monto / plazoMeses;
  }

  const totalPagar = cuota * plazoMeses;
  const totalIntereses = totalPagar - monto;

  return {
    valorSolicitado: monto,
    plazoMeses,
    tasaEA,
    tasaMesVencido: Number((tasaMensual * 100).toFixed(2)),
    cuotaMensualAprox: Math.round(cuota),
    totalInteresesAprox: Math.round(totalIntereses),
    totalPagarAprox: Math.round(totalPagar),
  };
}

/**
 * Calcula la simulación de inversión en CDT
 * Basado en la tasa E.A. y el plazo en días
 */
export function calcularSimulacionCDT(
  datos: SimulacionCdtEntrada
): SimulacionCdtResultado {
  const { monto, plazoDias, tasaEA } = datos;

  if (monto <= 0 || plazoDias <= 0) {
    return {
      montoInvertido: monto,
      plazoDias,
      plazoMesesAprox: Math.round(plazoDias / 30),
      tasaEA,
      rendimientoEstimado: 0,
      retencionFuenteEstimada: 0,
      valorFinalEstimado: monto,
    };
  }

  const eaDecimal = tasaEA / 100;
  // Rentabilidad compuesta por días: (1 + EA)^(dias/365) - 1
  const rendimientoBruto = monto * (Math.pow(1 + eaDecimal, plazoDias / 365) - 1);
  
  // Retención en la fuente referencial para rendimientos financieros en Colombia (4%)
  const retencion = rendimientoBruto * 0.04;
  const rendimientoNeto = rendimientoBruto - retencion;
  const valorFinal = monto + rendimientoNeto;

  return {
    montoInvertido: monto,
    plazoDias,
    plazoMesesAprox: Math.round(plazoDias / 30),
    tasaEA,
    rendimientoEstimado: Math.round(rendimientoNeto),
    retencionFuenteEstimada: Math.round(retencion),
    valorFinalEstimado: Math.round(valorFinal),
  };
}
