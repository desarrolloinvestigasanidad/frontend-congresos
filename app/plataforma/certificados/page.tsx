import type { Metadata } from "next"
import CertificatesDashboard from "@/components/certificates/certificates-dashboard"

export const metadata: Metadata = {
  title: "Certificados - Congresos Médicos",
  description: "Genera y descarga tus certificados de participación",
}

export default function CertificadosPage() {
  return <CertificatesDashboard />
}
