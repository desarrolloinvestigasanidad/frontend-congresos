import type { Metadata } from "next"
import PlatformHeader from "@/components/platform/platform-header"
import GalleryDashboard from "@/components/gallery/gallery-dashboard"

export const metadata: Metadata = {
  title: "Galería - Congresos Médicos",
  description: "Explora posters y videos de las comunicaciones científicas",
}

export default function GaleriaPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />
      <div className="container px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <GalleryDashboard />
      </div>
    </div>
  )
}
