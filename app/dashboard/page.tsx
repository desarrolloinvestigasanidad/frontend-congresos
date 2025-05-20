import type { Metadata } from "next"
import Image from "next/image"
import BackgroundPattern from "@/components/background-pattern"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard - Plataforma de Congresos Médicos",
  description: "Panel de control para la gestión de congresos médicos",
}

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <BackgroundPattern />

      {/* Header con logo y botón de cerrar sesión */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image src="/images/logo-congreso.png" alt="Logo Congresos Médicos" fill className="object-contain" />
            </div>
            <span className="font-bold text-primary">Congresos Médicos</span>
          </Link>

          <Link href="/login">
            <Button variant="outline" size="sm">
              Cerrar sesión
            </Button>
          </Link>
        </div>
      </header>

      {/* Contenido central */}
      <div className="container flex flex-col items-center justify-center text-center px-4 py-16 max-w-3xl">
        <div className="relative w-64 h-64 mb-8">
          <Image src="/medical-conference.png" alt="Congresos Médicos" fill className="object-contain" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Bienvenido a la Plataforma de Congresos</h1>

        <p className="text-xl text-muted-foreground mb-8">
          Tu portal para la gestión y participación en congresos médicos de alto nivel científico.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Explorar congresos
          </Button>
          <Button size="lg" variant="outline">
            Ver mi perfil
          </Button>
        </div>
      </div>
    </div>
  )
}
