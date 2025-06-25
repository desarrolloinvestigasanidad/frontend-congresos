import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PlatformHeader from "@/components/platform/platform-header";
import InteractiveImageButtons from "@/components/platform/interactive-image-buttons";
import QuickStats from "@/components/platform/quick-stats";
import UpcomingEvents from "@/components/platform/upcoming-events";

export const metadata: Metadata = {
  title: "Plataforma - Congresos Médicos",
  description:
    "Accede a todas las funcionalidades de la plataforma de congresos médicos",
};

// Datos que vendrán del backend
const platformConfig = {
  heroImage: "/platform-design.jpg", // Imagen del diseñador gráfico
  title: "Plataforma de Congresos Médicos",
  subtitle: "Gestiona tu participación científica",
  // Botones con posiciones absolutas sobre la imagen
  imageButtons: [
    {
      id: 1,
      label: "Nueva Comunicación",
      href: "/plataforma/comunicaciones/nueva",
      position: { top: "25%", left: "15%" },
      variant: "primary",
      active: true,
    },
    {
      id: 2,
      label: "Mis Comunicaciones",
      href: "/plataforma/comunicaciones",
      position: { top: "45%", left: "70%" },
      variant: "secondary",
      active: true,
    },
    {
      id: 3,
      label: "Pagar Inscripción",
      href: "/plataforma/pago",
      position: { top: "70%", left: "30%" },
      variant: "accent",
      active: true,
    },
    {
      id: 4,
      label: "Mi Perfil",
      href: "/plataforma/perfil",
      position: { top: "60%", left: "80%" },
      variant: "outline",
      active: true,
    },
  ],
};

export default function PlataformaPage() {
  return (
    <div className='relative min-h-screen bg-background'>
      <PlatformHeader />

      <div className='container px-4 py-8 md:px-6 max-w-7xl mx-auto'>
        {/* Hero Section con Imagen Interactiva */}
        <div className='mb-12'>
          <InteractiveImageButtons
            image={platformConfig.heroImage}
            title={platformConfig.title}
            subtitle={platformConfig.subtitle}
            buttons={platformConfig.imageButtons}
          />
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Upcoming Events */}
        <UpcomingEvents />

        {/* Secciones de Acceso Rápido */}
        <Card className='mt-8'>
          <CardContent className='p-6'>
            <h2 className='text-xl font-bold mb-4'>Acceso Rápido</h2>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              <Link href='/plataforma/normativa'>
                <Button
                  variant='ghost'
                  className='w-full justify-start h-auto p-4'>
                  <div className='text-left'>
                    <div className='font-semibold'>Normativa</div>
                    <div className='text-sm text-muted-foreground'>
                      Consultar requisitos
                    </div>
                  </div>
                </Button>
              </Link>
              <Link href='/plataforma/certificados'>
                <Button
                  variant='ghost'
                  className='w-full justify-start h-auto p-4'>
                  <div className='text-left'>
                    <div className='font-semibold'>Certificados</div>
                    <div className='text-sm text-muted-foreground'>
                      Descargar certificados
                    </div>
                  </div>
                </Button>
              </Link>
              <Link href='/plataforma/contacto'>
                <Button
                  variant='ghost'
                  className='w-full justify-start h-auto p-4'>
                  <div className='text-left'>
                    <div className='font-semibold'>Contacto</div>
                    <div className='text-sm text-muted-foreground'>
                      Soporte técnico
                    </div>
                  </div>
                </Button>
              </Link>
              <Link href='/plataforma/ayuda'>
                <Button
                  variant='ghost'
                  className='w-full justify-start h-auto p-4'>
                  <div className='text-left'>
                    <div className='font-semibold'>Ayuda</div>
                    <div className='text-sm text-muted-foreground'>
                      Guías y tutoriales
                    </div>
                  </div>
                </Button>
              </Link>
              <Link href='/plataforma/galeria'>
                <Button
                  variant='ghost'
                  className='w-full justify-start h-auto p-4'>
                  <div className='text-left'>
                    <div className='font-semibold'>Galería</div>
                    <div className='text-sm text-muted-foreground'>
                      Posters y videos
                    </div>
                  </div>
                </Button>
              </Link>
              <Link href='/plataforma/sala-cine'>
                <Button
                  variant='ghost'
                  className='w-full justify-start h-auto p-4'>
                  <div className='text-left'>
                    <div className='font-semibold'>Sala de Cine</div>
                    <div className='text-sm text-muted-foreground'>
                      Streaming en vivo
                    </div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
