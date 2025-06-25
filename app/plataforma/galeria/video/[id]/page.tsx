import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PlatformHeader from "@/components/platform/platform-header"
import VideoPlayer from "@/components/gallery/video-player"

export const metadata: Metadata = {
  title: "Reproductor de Video - Congresos Médicos",
  description: "Visualiza presentaciones y ponencias en video",
}

// Simulación de base de datos
const videos = [
  {
    id: "1",
    title: "Avances en Neurología 2023",
    presenter: "Dr. Alberto Fernández",
    institution: "Hospital Clínico San Carlos",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    description:
      "Presentación sobre los últimos avances en tratamientos neurológicos y técnicas de diagnóstico por imagen para enfermedades neurodegenerativas.",
    duration: "18:45",
    date: "2023-04-12",
    views: 312,
    likes: 87,
    tags: ["neurología", "diagnóstico", "investigación"],
    relatedVideos: ["2", "5"],
  },
  {
    id: "2",
    title: "Nuevos enfoques en Cardiología Intervencionista",
    presenter: "Dra. Elena Martín",
    institution: "Hospital Gregorio Marañón",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    thumbnailUrl: "/placeholder.svg?height=400&width=720",
    description:
      "Análisis de las técnicas más innovadoras en cardiología intervencionista y sus resultados en pacientes con patologías complejas.",
    duration: "24:10",
    date: "2023-03-28",
    views: 278,
    likes: 65,
    tags: ["cardiología", "intervención", "técnicas"],
    relatedVideos: ["1", "3"],
  },
]

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = videos.find((v) => v.id === params.id)

  if (!video) {
    notFound()
  }

  // Obtener videos relacionados
  const relatedVideos = video.relatedVideos.map((id) => videos.find((v) => v.id === id)).filter(Boolean)

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />
      <div className="container px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <VideoPlayer video={video} relatedVideos={relatedVideos} />
      </div>
    </div>
  )
}
