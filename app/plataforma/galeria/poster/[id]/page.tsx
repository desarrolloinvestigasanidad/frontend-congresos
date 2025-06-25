import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PlatformHeader from "@/components/platform/platform-header"
import PosterViewer from "@/components/gallery/poster-viewer"

export const metadata: Metadata = {
  title: "Visualizador de Poster - Congresos Médicos",
  description: "Visualiza y analiza posters científicos en detalle",
}

// Simulación de base de datos
const posters = [
  {
    id: "1",
    title: "Avances en tratamientos oncológicos personalizados",
    author: "Dra. María Rodríguez",
    institution: "Hospital Universitario La Paz",
    pdfUrl: "/posters/poster1.pdf",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    abstract:
      "Este estudio presenta los últimos avances en tratamientos oncológicos personalizados basados en perfiles genéticos de pacientes con cáncer de mama. Los resultados muestran una mejora significativa en la tasa de supervivencia y calidad de vida.",
    keywords: ["oncología", "medicina personalizada", "genética"],
    views: 245,
    downloads: 78,
    rating: 4.7,
    comments: [
      {
        id: "c1",
        user: "Dr. Juan Pérez",
        text: "Excelente trabajo, muy innovador.",
        timestamp: "2023-05-15T10:30:00Z",
      },
      {
        id: "c2",
        user: "Dra. Ana López",
        text: "Me gustaría conocer más sobre la metodología utilizada.",
        timestamp: "2023-05-16T14:22:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Nuevas técnicas quirúrgicas mínimamente invasivas",
    author: "Dr. Carlos Martínez",
    institution: "Clínica Universitaria de Navarra",
    pdfUrl: "/posters/poster2.pdf",
    thumbnailUrl: "/placeholder.svg?height=400&width=300",
    abstract:
      "Presentación de técnicas quirúrgicas innovadoras que reducen significativamente el tiempo de recuperación y las complicaciones postoperatorias en cirugías abdominales complejas.",
    keywords: ["cirugía", "mínimamente invasiva", "recuperación"],
    views: 189,
    downloads: 56,
    rating: 4.5,
    comments: [
      {
        id: "c3",
        user: "Dra. Laura Sánchez",
        text: "Implementamos esta técnica con excelentes resultados.",
        timestamp: "2023-06-01T09:15:00Z",
      },
    ],
  },
]

export default function PosterPage({ params }: { params: { id: string } }) {
  const poster = posters.find((p) => p.id === params.id)

  if (!poster) {
    notFound()
  }

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />
      <div className="container px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <PosterViewer poster={poster} />
      </div>
    </div>
  )
}
