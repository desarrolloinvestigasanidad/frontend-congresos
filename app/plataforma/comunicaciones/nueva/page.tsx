import type { Metadata } from "next"
import PlatformHeader from "@/components/platform/platform-header"
import NewCommunicationForm from "@/components/communications/new-communication-form"

export const metadata: Metadata = {
  title: "Nueva Comunicación - Plataforma de Congresos",
  description: "Crea una nueva comunicación científica para el congreso",
}

export default function NewCommunicationPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Nueva Comunicación</h1>
          <p className="text-muted-foreground">
            Crea una nueva comunicación científica para participar en el congreso médico
          </p>
        </div>

        <NewCommunicationForm />
      </div>
    </div>
  )
}
