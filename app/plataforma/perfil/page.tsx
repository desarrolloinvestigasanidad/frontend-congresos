import type { Metadata } from "next"
import PlatformHeader from "@/components/platform/platform-header"
import ProfileDashboard from "@/components/profile/profile-dashboard"

export const metadata: Metadata = {
  title: "Mi Perfil - Plataforma de Congresos",
  description: "Gestiona tu información personal y profesional",
}

// Simulación de datos del usuario que vendrían del backend
const getUserProfile = () => {
  return {
    id: "1",
    // Datos personales
    personalInfo: {
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan@email.com",
      phone: "+34 600 123 456",
      dateOfBirth: "1985-03-15",
      gender: "male",
      nationality: "española",
      profileImage: null,
    },
    // Datos profesionales
    professionalInfo: {
      title: "Dr.",
      specialization: "Cardiología",
      licenseNumber: "28/12345",
      institution: "Hospital Universitario La Paz",
      department: "Servicio de Cardiología",
      position: "Médico Adjunto",
      yearsExperience: 8,
      cv: "cv-juan-perez.pdf",
    },
    // Dirección
    address: {
      street: "Calle Mayor 123",
      city: "Madrid",
      state: "Madrid",
      postalCode: "28001",
      country: "España",
    },
    // Datos fiscales
    taxInfo: {
      taxId: "12345678A",
      companyName: null,
      vatNumber: null,
    },
    // Configuración de cuenta
    accountSettings: {
      language: "es",
      timezone: "Europe/Madrid",
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      twoFactorEnabled: false,
    },
    // Estadísticas
    stats: {
      communicationsSubmitted: 3,
      communicationsAccepted: 2,
      congressesAttended: 5,
      certificatesEarned: 7,
      memberSince: "2022-01-15",
    },
    // Actividad reciente
    recentActivity: [
      {
        id: "1",
        type: "communication_submitted",
        title: "Comunicación enviada",
        description: "Avances en Cardiología Intervencionista",
        date: "2024-01-20T14:45:00Z",
      },
      {
        id: "2",
        type: "payment_completed",
        title: "Pago completado",
        description: "Inscripción al Congreso Nacional de Medicina 2025",
        date: "2024-01-18T16:25:00Z",
      },
      {
        id: "3",
        type: "communication_accepted",
        title: "Comunicación aceptada",
        description: "Protocolo de Emergencias en UCI",
        date: "2024-01-15T10:30:00Z",
      },
    ],
    // Congresos
    congresses: [
      {
        id: "1",
        name: "Congreso Nacional de Medicina 2025",
        role: "Participante",
        status: "registered",
        date: "2025-11-10",
      },
      {
        id: "2",
        name: "Simposio de Cardiología 2024",
        role: "Ponente",
        status: "completed",
        date: "2024-06-15",
      },
    ],
  }
}

export default function ProfilePage() {
  const userProfile = getUserProfile()

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Gestiona tu información personal, profesional y configuración de cuenta
          </p>
        </div>

        <ProfileDashboard profile={userProfile} />
      </div>
    </div>
  )
}
