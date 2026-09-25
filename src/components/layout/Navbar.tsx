"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown, Landmark, Calculator } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [simulatorsOpen, setSimulatorsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-bbva-border shadow-sm">
      {/* Top subtle blue accent bar */}
      <div className="h-1 bg-bbva-navy w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo BBVA */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 text-bbva-navy focus:outline-none focus:ring-2 focus:ring-bbva-blue rounded-md p-1"
            >
              <div className="bg-bbva-navy text-white font-extrabold text-2xl tracking-tighter px-3 py-1 rounded">
                BBVA
              </div>
              <div className="hidden sm:flex flex-col border-l border-gray-300 pl-3">
                <span className="text-xs font-semibold text-bbva-dark uppercase tracking-wider">
                  Simulador Financiero
                </span>
                <span className="text-[10px] text-gray-500">Regional Caldas</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                isActive("/") && pathname === "/"
                  ? "text-bbva-navy bg-bbva-soft border-b-2 border-bbva-navy"
                  : "text-gray-700 hover:text-bbva-navy hover:bg-gray-50"
              }`}
            >
              Inicio
            </Link>

            <Link
              href="/productos"
              className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                isActive("/productos")
                  ? "text-bbva-navy bg-bbva-soft border-b-2 border-bbva-navy"
                  : "text-gray-700 hover:text-bbva-navy hover:bg-gray-50"
              }`}
            >
              Productos
            </Link>

            {/* Dropdown Simuladores */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSimulatorsOpen(!simulatorsOpen)}
                onBlur={() => setTimeout(() => setSimulatorsOpen(false), 200)}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded transition-colors ${
                  pathname.startsWith("/simuladores")
                    ? "text-bbva-navy bg-bbva-soft border-b-2 border-bbva-navy"
                    : "text-gray-700 hover:text-bbva-navy hover:bg-gray-50"
                }`}
              >
                <span>Simuladores</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    simulatorsOpen ? "rotate-180 text-bbva-navy" : "text-gray-500"
                  }`}
                />
              </button>

              {simulatorsOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/simuladores/credito"
                    onClick={() => setSimulatorsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-bbva-soft hover:text-bbva-navy transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-bbva-navy" />
                    <div>
                      <div className="font-semibold">Simulador de Crédito</div>
                      <div className="text-[11px] text-gray-500">Vivienda, Vehículo, Libre Inversión</div>
                    </div>
                  </Link>
                  <Link
                    href="/simuladores/cdt"
                    onClick={() => setSimulatorsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-bbva-soft hover:text-bbva-navy transition-colors"
                  >
                    <Landmark className="w-4 h-4 text-bbva-navy" />
                    <div>
                      <div className="font-semibold">Simulador de CDT</div>
                      <div className="text-[11px] text-gray-500">Rentabilidad desde $500.000</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contacto"
              className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                isActive("/contacto")
                  ? "text-bbva-navy bg-bbva-soft border-b-2 border-bbva-navy"
                  : "text-gray-700 hover:text-bbva-navy hover:bg-gray-50"
              }`}
            >
              Contacto
            </Link>

            {/* Quick access action button */}
            <div className="pl-4">
              <Link
                href="/simuladores/credito"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded text-sm font-medium text-white bg-bbva-navy hover:bg-bbva-dark transition-all shadow-sm"
              >
                Simular ahora
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-bbva-navy hover:bg-gray-100 focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/" ? "bg-bbva-soft text-bbva-navy font-bold" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/productos" ? "bg-bbva-soft text-bbva-navy font-bold" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Productos
          </Link>
          <div className="pt-2 pb-1 border-t border-gray-100">
            <span className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Simuladores
            </span>
            <Link
              href="/simuladores/credito"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 mt-1 rounded-md text-base font-medium ${
                pathname === "/simuladores/credito" ? "bg-bbva-soft text-bbva-navy font-bold" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Simulador de Crédito
            </Link>
            <Link
              href="/simuladores/cdt"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/simuladores/cdt" ? "bg-bbva-soft text-bbva-navy font-bold" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Simulador de CDT
            </Link>
          </div>
          <Link
            href="/contacto"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === "/contacto" ? "bg-bbva-soft text-bbva-navy font-bold" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
}
