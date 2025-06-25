import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import PlatformHeader from "@/components/platform/platform-header"
import CommunicationFilters from "@/components/communications/communication-filters"
import CommunicationCard from "@/components/communications/communication-card"
import { Plus, Search, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Mis Comunicaciones - Plataforma de Congresos",
  description: "Gestiona tus comunicaciones científicas, posters y videos",
}

// Datos simulados que vendrán del backend
const userCommunications = [
  {
    id: 1,
    title: "Avances en Cardiología Intervencionista",
    type: "poster",
    status: "draft",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    authors: [
      { id: 1, name: "Dr. Juan Pérez", role: "principal", email: "juan@email.com" },
      { id: 2, name: "Dra. María García", role: "coautor", email: "maria@email.com" },
    ],
    congress: "Congreso Nacional de Medicina 2025",
    paymentStatus: "pending",
    files: {
      poster: null,
      abstract: "abstract-001.pdf",
    },
  },
  {
    id: 2,
    title: "Nuevas Técnicas en Cirugía Mínimamente Invasiva",
    type: "video",
    status: "submitted",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    authors: [{ id: 1, name: "Dr. Juan Pérez", role: "principal", email: "juan@email.com" }],
    congress: "Congreso Nacional de Medicina 2025",
    paymentStatus: "paid",
    files: {
      video: "video-002.mp4",
      abstract: "abstract-002.pdf",
    },
  },
  {
    id: 3,
    title: "Protocolo de Emergencias en UCI",
    type: "oral",
    status: "accepted",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-25",
    authors: [
      { id: 1, name: "Dr. Juan Pérez", role: "principal", email: "juan@email.com" },
      { id: 3, name: "Dr. Carlos López", role: "coautor", email: "carlos@email.com" },
      { id: 4, name: "Dra. Ana Martín", role: "coautor", email: "ana@email.com" },
    ],
    congress: "Congreso Nacional de Medicina 2025",
    paymentStatus: "paid",
    files: {
      presentation: "presentation-003.pptx",
      abstract: "abstract-003.pdf",
    },
  },
]

const stats = {
  total: userCommunications.length,
  draft: userCommunications.filter((c) => c.status === "draft").length,
  submitted: userCommunications.filter((c) => c.status === "submitted").length,
  accepted: userCommunications.filter((c) => c.status === "accepted").length,
  rejected: userCommunications.filter((c) => c.status === "rejected").length,
}

export default function CommunicationsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Mis Comunicaciones</h1>
            <p className="text-muted-foreground">
              Gestiona tus comunicaciones científicas, posters y videos para congresos médicos
            </p>
          </div>
          <Link href="/plataforma/comunicaciones/nueva">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              <Plus className="w-5 h-5 mr-2" />
              Nueva Comunicación
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
              <div className="text-sm text-muted-foreground">Borradores</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
              <div className="text-sm text-muted-foreground">Enviadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
              <div className="text-sm text-muted-foreground">Aceptadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-muted-foreground">Rechazadas</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Buscar por título, autor o congreso..." className="pl-10" />
                </div>
              </div>
              <CommunicationFilters />
            </div>
          </CardContent>
        </Card>

        {/* Communications List */}
        {userCommunications.length > 0 ? (
          <div className="space-y-4">
            {userCommunications.map((communication) => (
              <CommunicationCard key={communication.id} communication={communication} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No tienes comunicaciones</h3>
              <p className="text-muted-foreground mb-6">Comienza creando tu primera comunicación científica</p>
              <Link href="/plataforma/comunicaciones/nueva">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <Plus className="w-5 h-5 mr-2" />
                  Crear Primera Comunicación
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
