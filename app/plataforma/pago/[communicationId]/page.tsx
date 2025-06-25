import type { Metadata } from "next"
import { notFound } from "next/navigation"
import PlatformHeader from "@/components/platform/platform-header"
import PaymentForm from "@/components/payment/payment-form"

export const metadata: Metadata = {
  title: "Procesar Pago - Plataforma de Congresos",
  description: "Completa el pago de tu inscripción al congreso",
}

// Simulación de datos que vendrían del backend
const getCommunicationForPayment = (id: string) => {
  const communications = [
    {
      id: "1",
      title: "Avances en Cardiología Intervencionista",
      type: "poster",
      status: "draft",
      paymentStatus: "pending",
      amount: 8.0,
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
        },
        {
          id: "2",
          name: "Dra. María García",
          email: "maria@email.com",
          institution: "Centro Médico Nacional",
          role: "coautor",
        },
      ],
      user: {
        id: "1",
        name: "Dr. Juan Pérez",
        email: "juan@email.com",
        phone: "+34 600 123 456",
        institution: "Hospital Universitario",
        address: {
          street: "Calle Mayor 123",
          city: "Madrid",
          postalCode: "28001",
          country: "España",
        },
        taxId: "12345678A",
      },
    },
  ]

  return communications.find((c) => c.id === id)
}

export default function PaymentProcessPage({ params }: { params: { communicationId: string } }) {
  const communication = getCommunicationForPayment(params.communicationId)

  if (!communication) {
    notFound()
  }

  // Solo permitir pago si está pendiente
  if (communication.paymentStatus !== "pending") {
    notFound()
  }

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Procesar Pago</h1>
          <p className="text-muted-foreground">Completa el pago de tu inscripción para la comunicación científica</p>
        </div>

        <PaymentForm communication={communication} />
      </div>
    </div>
  )
}
