import type { Metadata } from "next"
import PlatformHeader from "@/components/platform/platform-header"
import PaymentDashboard from "@/components/payment/payment-dashboard"

export const metadata: Metadata = {
  title: "Pago de Inscripción - Plataforma de Congresos",
  description: "Gestiona el pago de tu inscripción al congreso médico",
}

// Simulación de datos del usuario que vendrían del backend
const getUserPaymentData = () => {
  return {
    user: {
      id: "1",
      name: "Dr. Juan Pérez",
      email: "juan@email.com",
      institution: "Hospital Universitario",
    },
    communications: [
      {
        id: "1",
        title: "Avances en Cardiología Intervencionista",
        type: "poster",
        status: "draft",
        paymentStatus: "pending",
        amount: 8.0,
        congress: "Congreso Nacional de Medicina 2025",
        coauthors: 1,
      },
      {
        id: "2",
        title: "Nuevas Técnicas en Cirugía Mínimamente Invasiva",
        type: "video",
        status: "submitted",
        paymentStatus: "paid",
        amount: 8.0,
        congress: "Congreso Nacional de Medicina 2025",
        coauthors: 0,
        paidAt: "2024-01-18T16:25:00Z",
        transactionId: "TXN-2024-001",
      },
    ],
    paymentHistory: [
      {
        id: "1",
        date: "2024-01-18T16:25:00Z",
        amount: 8.0,
        status: "completed",
        method: "card",
        transactionId: "TXN-2024-001",
        communicationTitle: "Nuevas Técnicas en Cirugía Mínimamente Invasiva",
        invoice: "INV-2024-001.pdf",
      },
    ],
    totalPending: 8.0,
    totalPaid: 8.0,
  }
}

export default function PaymentPage() {
  const paymentData = getUserPaymentData()

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Pago de Inscripción</h1>
          <p className="text-muted-foreground">
            Gestiona el pago de tus comunicaciones científicas. Solo el autor principal debe realizar el pago.
          </p>
        </div>

        <PaymentDashboard data={paymentData} />
      </div>
    </div>
  )
}
