import type { Metadata } from "next"
import PlatformHeader from "@/components/platform/platform-header"
import CinemaRoom from "@/components/cinema/cinema-room"

export const metadata: Metadata = {
  title: "Sala de Cine Virtual - Congresos Médicos",
  description: "Participa en sesiones de streaming en vivo con chat y moderación",
}

export default function SalaCinePage() {
  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />
      <div className="container px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <CinemaRoom />
      </div>
    </div>
  )
}
