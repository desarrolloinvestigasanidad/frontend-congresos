import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PlatformHeader from "@/components/platform/platform-header"
import { CheckCircle, Download, Mail, Calendar, CreditCard, FileText, Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Pago Confirmado - Plataforma de Congresos",
  description: "Tu pago ha sido procesado correctamente",
}

// Simulación de datos que vendrían del backend basados en el transaction ID
const getPaymentConfirmation = (txnId: string) => {
  return {
    transactionId: txnId,
    amount: 8.0,
    currency: "EUR",
    status: "completed",
    date: new Date().toISOString(),
    communication: {
      id: "1",
      title: "Avances en Cardiología Intervencionista",
      type: "poster",
      congress: "Congreso Nacional de Medicina 2025",
    },
    invoice: {
      number: "INV-2024-002",
      url: "/invoices/INV-2024-002.pdf",
    },
    nextSteps: [
      "Tu comunicación ha sido enviada para revisión",
      "Recibirás un email de confirmación en los próximos minutos",
      "El comité científico revisará tu trabajo",
      "Te notificaremos el resultado de la revisión",
    ],
  }
}

export default function PaymentConfirmationPage({
  searchParams,
}: {
  searchParams: { txn?: string }
}) {
  const txnId = searchParams.txn

  if (!txnId) {
    return (
      <div className="relative min-h-screen bg-background">
        <PlatformHeader />
        <div className="container px-4 py-8 md:px-6 max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-muted-foreground mb-6">No se encontró información del pago</p>
          <Link href="/plataforma/pago">
            <Button>Volver a Pagos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const confirmation = getPaymentConfirmation(txnId)

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-3xl mx-auto">
        {/* Header de confirmación */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">¡Pago Confirmado!</h1>
          <p className="text-lg text-muted-foreground">Tu inscripción ha sido procesada correctamente</p>
        </div>

        {/* Detalles del pago */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Detalles del Pago
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">ID de Transacción</p>
                <p className="font-mono font-semibold">{confirmation.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-semibold">
                  {new Date(confirmation.date).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Importe</p>
                <p className="font-semibold text-lg text-green-600">
                  €{confirmation.amount.toFixed(2)} {confirmation.currency}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completado
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-1">Comunicación</p>
              <p className="font-semibold">{confirmation.communication.title}</p>
              <p className="text-sm text-muted-foreground">{confirmation.communication.congress}</p>
            </div>
          </CardContent>
        </Card>

        {/* Próximos pasos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Próximos Pasos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {confirmation.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-semibold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-2">Descargar Factura</h3>
              <p className="text-sm text-muted-foreground mb-4">Factura Nº {confirmation.invoice.number}</p>
              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 mx-auto mb-3 text-green-600" />
              <h3 className="font-semibold mb-2">Confirmación por Email</h3>
              <p className="text-sm text-muted-foreground mb-4">Enviada a tu correo electrónico</p>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Reenviar Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Navegación */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/plataforma/comunicaciones">
            <Button variant="outline" className="w-full md:w-auto">
              <FileText className="w-4 h-4 mr-2" />
              Ver Mis Comunicaciones
            </Button>
          </Link>
          <Link href="/plataforma">
            <Button className="w-full md:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Ir al Dashboard
            </Button>
          </Link>
        </div>

        {/* Información adicional */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-800 mb-2">¡Inscripción completada con éxito!</p>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Tu comunicación está ahora en proceso de revisión</li>
                  <li>Tienes acceso completo al congreso</li>
                  <li>Los coautores recibirán acceso automáticamente</li>
                  <li>Podrás descargar certificados tras el evento</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
