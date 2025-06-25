import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import PlatformHeader from "@/components/platform/platform-header"
import CommunicationDetail from "@/components/communications/communication-detail"
import { ArrowLeft, Edit, Trash2, Send, Download, CreditCard } from "lucide-react"

export const metadata: Metadata = {
  title: "Detalle de Comunicación - Plataforma de Congresos",
  description: "Ver detalles de tu comunicación científica",
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
      congress: {
        id: "congreso-2025",
        name: "Congreso Nacional de Medicina 2025",
        dates: "10-12 Noviembre 2025",
        location: "Madrid, España",
      },
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
      reviewComments: [],
      history: [
        {
          date: "2024-01-15T10:30:00Z",
          action: "created",
          user: "Dr. Juan Pérez",
          details: "Comunicación creada como borrador",
        },
        {
          date: "2024-01-15T11:35:00Z",
          action: "files_uploaded",
          user: "Dr. Juan Pérez",
          details: "Archivos subidos: abstract y poster",
        },
        {
          date: "2024-01-20T14:45:00Z",
          action: "updated",
          user: "Dr. Juan Pérez",
          details: "Actualización de información básica",
        },
      ],
    },
    {
      id: "2",
      title: "Nuevas Técnicas en Cirugía Mínimamente Invasiva",
      abstract:
        "Presentamos una revisión de las nuevas técnicas en cirugía mínimamente invasiva aplicadas a procedimientos abdominales complejos. Se incluye un análisis comparativo de resultados con técnicas tradicionales y un estudio de costes asociados.",
      keywords: "cirugía, mínimamente invasiva, laparoscopia",
      type: "video",
      category: "Técnicas Quirúrgicas",
      status: "submitted",
      createdAt: "2024-01-10T09:15:00Z",
      updatedAt: "2024-01-18T16:20:00Z",
      congress: {
        id: "congreso-2025",
        name: "Congreso Nacional de Medicina 2025",
        dates: "10-12 Noviembre 2025",
        location: "Madrid, España",
      },
      authors: [
        {
          id: "1",
          name: "Dr. Juan Pérez",
          email: "juan@email.com",
          institution: "Hospital Universitario",
          role: "principal",
          isRegistered: true,
        },
      ],
      paymentStatus: "paid",
      files: {
        abstract: {
          name: "abstract-002.pdf",
          size: 980000,
          url: "/files/abstract-002.pdf",
          uploadedAt: "2024-01-10T09:30:00Z",
        },
        video: {
          name: "video-002.mp4",
          size: 256000000,
          url: "/files/video-002.mp4",
          uploadedAt: "2024-01-10T10:15:00Z",
        },
      },
      reviewComments: [
        {
          date: "2024-01-25T11:20:00Z",
          reviewer: "Comité Científico",
          comment: "Video recibido correctamente. En proceso de revisión por el comité.",
          isPublic: true,
        },
      ],
      history: [
        {
          date: "2024-01-10T09:15:00Z",
          action: "created",
          user: "Dr. Juan Pérez",
          details: "Comunicación creada como borrador",
        },
        {
          date: "2024-01-10T10:15:00Z",
          action: "files_uploaded",
          user: "Dr. Juan Pérez",
          details: "Archivos subidos: abstract y video",
        },
        {
          date: "2024-01-18T16:20:00Z",
          action: "submitted",
          user: "Dr. Juan Pérez",
          details: "Comunicación enviada para revisión",
        },
        {
          date: "2024-01-18T16:25:00Z",
          action: "payment_completed",
          user: "Dr. Juan Pérez",
          details: "Pago completado: €8.00",
        },
      ],
    },
    {
      id: "3",
      title: "Protocolo de Emergencias en UCI",
      abstract:
        "Este trabajo presenta un nuevo protocolo de actuación en emergencias para Unidades de Cuidados Intensivos, desarrollado tras un estudio multicéntrico en 5 hospitales. Los resultados muestran una reducción significativa en los tiempos de respuesta y mejora en los resultados clínicos.",
      keywords: "UCI, emergencias, protocolos, cuidados intensivos",
      type: "oral",
      category: "Investigación Clínica",
      status: "accepted",
      createdAt: "2024-01-05T08:45:00Z",
      updatedAt: "2024-01-25T13:10:00Z",
      congress: {
        id: "congreso-2025",
        name: "Congreso Nacional de Medicina 2025",
        dates: "10-12 Noviembre 2025",
        location: "Madrid, España",
      },
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
          id: "3",
          name: "Dr. Carlos López",
          email: "carlos@email.com",
          institution: "Hospital General",
          role: "coautor",
          isRegistered: true,
        },
        {
          id: "4",
          name: "Dra. Ana Martín",
          email: "ana@email.com",
          institution: "Instituto de Investigación Médica",
          role: "coautor",
          isRegistered: true,
        },
      ],
      paymentStatus: "paid",
      files: {
        abstract: {
          name: "abstract-003.pdf",
          size: 1120000,
          url: "/files/abstract-003.pdf",
          uploadedAt: "2024-01-05T09:00:00Z",
        },
        presentation: {
          name: "presentation-003.pptx",
          size: 8500000,
          url: "/files/presentation-003.pptx",
          uploadedAt: "2024-01-05T09:15:00Z",
        },
      },
      reviewComments: [
        {
          date: "2024-01-15T10:30:00Z",
          reviewer: "Comité Científico",
          comment: "Comunicación en proceso de revisión.",
          isPublic: true,
        },
        {
          date: "2024-01-20T14:45:00Z",
          reviewer: "Dr. Martínez (Revisor)",
          comment:
            "Excelente trabajo. Metodología rigurosa y resultados bien presentados. Recomiendo su aceptación para presentación oral.",
          isPublic: false,
        },
        {
          date: "2024-01-25T13:00:00Z",
          reviewer: "Comité Científico",
          comment:
            "Su comunicación ha sido ACEPTADA para presentación oral. Se le asignará fecha y hora en las próximas semanas.",
          isPublic: true,
        },
      ],
      history: [
        {
          date: "2024-01-05T08:45:00Z",
          action: "created",
          user: "Dr. Juan Pérez",
          details: "Comunicación creada como borrador",
        },
        {
          date: "2024-01-05T09:15:00Z",
          action: "files_uploaded",
          user: "Dr. Juan Pérez",
          details: "Archivos subidos: abstract y presentación",
        },
        {
          date: "2024-01-07T11:30:00Z",
          action: "submitted",
          user: "Dr. Juan Pérez",
          details: "Comunicación enviada para revisión",
        },
        {
          date: "2024-01-07T11:35:00Z",
          action: "payment_completed",
          user: "Dr. Juan Pérez",
          details: "Pago completado: €8.00",
        },
        {
          date: "2024-01-25T13:10:00Z",
          action: "accepted",
          user: "Comité Científico",
          details: "Comunicación aceptada para presentación oral",
        },
      ],
      presentationDetails: {
        date: "2025-11-11",
        time: "10:30 - 11:00",
        room: "Sala Magna",
        chairperson: "Dr. Fernando Rodríguez",
      },
    },
  ]

  return communications.find((c) => c.id === id)
}

export default function CommunicationDetailPage({ params }: { params: { id: string } }) {
  const communication = getCommunicationById(params.id)

  if (!communication) {
    notFound()
  }

  // Determinar acciones disponibles según el estado
  const getAvailableActions = () => {
    const actions = []

    // Acciones comunes para todos los estados
    actions.push(
      <Link key="back" href="/plataforma/comunicaciones">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
      </Link>,
    )

    // Acciones específicas según estado
    if (communication.status === "draft") {
      actions.push(
        <Link key="edit" href={`/plataforma/comunicaciones/${communication.id}/editar`}>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </Link>,
        <Button key="delete" variant="outline" size="sm" className="text-red-600 hover:text-red-700">
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </Button>,
        <Button key="submit" className="bg-accent hover:bg-accent/90">
          <Send className="w-4 h-4 mr-2" />
          Enviar
        </Button>,
      )
    }

    if (communication.status === "draft" || communication.status === "submitted") {
      if (communication.paymentStatus === "pending") {
        actions.push(
          <Button key="pay" className="bg-green-600 hover:bg-green-700 text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Pagar Inscripción
          </Button>,
        )
      }
    }

    // Descargar archivos para cualquier estado
    if (Object.keys(communication.files).length > 0) {
      actions.push(
        <Button key="download" variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Descargar Archivos
        </Button>,
      )
    }

    return actions
  }

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Detalle de Comunicación</h1>
            <p className="text-muted-foreground">
              Visualiza todos los detalles de tu comunicación científica y su estado actual
            </p>
          </div>
          <div className="flex flex-wrap gap-2">{getAvailableActions()}</div>
        </div>

        <CommunicationDetail communication={communication} />
      </div>
    </div>
  )
}
