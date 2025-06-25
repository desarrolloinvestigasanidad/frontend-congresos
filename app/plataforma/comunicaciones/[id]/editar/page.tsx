import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PlatformHeader from "@/components/platform/platform-header"
import EditCommunicationForm from "@/components/communications/edit-communication-form"

export const metadata: Metadata = {
  title: "Editar Comunicación - Plataforma de Congresos",
  description: "Modifica tu comunicación científica",
}

// Simulación de datos que vendrían del backend
const getCommunicationById = (id: string) => {
  const communications = [
    {
      id: "1",
      title: "Avances en Cardiología Intervencionista",
      abstract:
        "Este estudio presenta los últimos avances en técnicas de cardiología intervencionista, con especial énfasis en el tratamiento de cardiopatías congénitas. Se analizan los resultados de 50 casos tratados con la nueva técnica mínimamente invasiva desarrollada por nuestro equipo.",
      keywords: "cardiología, intervencionismo, cardiopatías congénitas",
      type: "poster",
      category: "Cardiología",
      status: "draft",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T14:45:00Z",
      congress: "congreso-2025",
      authors: [
        {
          id: "1",
          name: "Dr. Juan Pérez",
          email: "juan@email.com",
          institution: "Hospital Universitario",
          role: "principal",
          isRegistered: true,
        },
        {
          id: "2",
          name: "Dra. María García",
          email: "maria@email.com",
          institution: "Centro Médico Nacional",
          role: "coautor",
          isRegistered: true,
        },
      ],
      paymentStatus: "pending",
      files: {
        abstract: {
          name: "abstract-001.pdf",
          size: 1240000,
          url: "/files/abstract-001.pdf",
          uploadedAt: "2024-01-15T11:30:00Z",
        },
        poster: {
          name: "poster-001.pdf",
          size: 5240000,
          url: "/files/poster-001.pdf",
          uploadedAt: "2024-01-15T11:35:00Z",
        },
      },
    },
  ]

  return communications.find((c) => c.id === id)
}

export default function EditCommunicationPage({ params }: { params: { id: string } }) {
  const communication = getCommunicationById(params.id)

  if (!communication) {
    notFound()
  }

  // Solo permitir editar comunicaciones en estado borrador
  if (communication.status !== "draft") {
    notFound()
  }

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Editar Comunicación</h1>
          <p className="text-muted-foreground">
            Modifica los detalles de tu comunicación científica. Solo puedes editar comunicaciones en estado borrador.
          </p>
        </div>

        <EditCommunicationForm communication={communication} />
      </div>
    </div>
  )
}
