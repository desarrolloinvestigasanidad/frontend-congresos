import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Plataforma | Congresos Médicos",
  description: "Plataforma de usuarios para participantes en congresos médicos",
}

export default function PlataformaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}
