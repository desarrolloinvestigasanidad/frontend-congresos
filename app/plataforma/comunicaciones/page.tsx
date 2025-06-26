"use client"; // NUEVO: Convierte este componente para que se ejecute en el navegador

import { useState, useEffect } from "react"; // NUEVO: Hooks para manejar estado y efectos en el cliente
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PlatformHeader from "@/components/platform/platform-header";
import CommunicationFilters from "@/components/communications/communication-filters";
import CommunicationCard from "@/components/communications/communication-card";
import { Plus, Search, FileText, Loader2, AlertTriangle } from "lucide-react";

// MODIFICADO: La metadata se exporta de forma estática, pero el componente será de cliente
// (Next.js es suficientemente inteligente para manejar esto)

// Las interfaces no cambian
type CommunicationType = "poster" | "video" | "oral";

interface Author {
  id: number;
  name: string;
  role: string;
  email: string;
}

interface Communication {
  id: number;
  title: string;
  type: CommunicationType;
  status: string;
  createdAt: string;
  updatedAt: string;
  authors: Author[];
  congress: string;
  paymentStatus: string;
  files: Record<string, string | null>;
}

export default function CommunicationsPage() {
  // NUEVO: Estados para manejar los datos, carga y errores en el cliente
  const [userCommunications, setUserCommunications] = useState<Communication[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // NUEVO: useEffect para obtener los datos cuando el componente se monta en el navegador
  useEffect(() => {
    const getCommunications = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Obtenemos el token desde localStorage, igual que en el formulario
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error(
            "Token de autenticación no encontrado. Por favor, inicia sesión."
          );
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/comunicaciones`;
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || "No se pudieron obtener las comunicaciones."
          );
        }

        const data: Communication[] = await res.json();
        setUserCommunications(data);
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCommunications();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  // Calculamos las estadísticas basándonos en el estado actual
  const stats = {
    total: userCommunications.length,
    draft: userCommunications.filter((c) => c.status === "draft").length,
    submitted: userCommunications.filter((c) => c.status === "submitted")
      .length,
    accepted: userCommunications.filter((c) => c.status === "accepted").length,
    rejected: userCommunications.filter((c) => c.status === "rejected").length,
  };

  // MODIFICADO: Renderizado condicional basado en el estado de carga y error
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center items-center p-20'>
          <Loader2 className='w-12 h-12 animate-spin text-primary' />
        </div>
      );
    }

    if (error) {
      return (
        <Card className='bg-red-50 border-red-200'>
          <CardContent className='p-6 text-center text-red-700'>
            <AlertTriangle className='w-12 h-12 mx-auto mb-4' />
            <h3 className='text-xl font-semibold mb-2'>
              Error al cargar los datos
            </h3>
            <p className='text-muted-foreground text-red-600'>{error}</p>
          </CardContent>
        </Card>
      );
    }

    if (userCommunications.length > 0) {
      return (
        <div className='space-y-4'>
          {userCommunications.map((communication) => (
            <CommunicationCard
              key={communication.id}
              communication={communication}
            />
          ))}
        </div>
      );
    }

    return (
      <Card>
        <CardContent className='p-12 text-center'>
          <FileText className='w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50' />
          <h3 className='text-xl font-semibold mb-2'>
            No tienes comunicaciones
          </h3>
          <p className='text-muted-foreground mb-6'>
            Comienza creando tu primera comunicación científica
          </p>
          <Link href='/plataforma/comunicaciones/nueva'>
            <Button size='lg' className='bg-accent hover:bg-accent/90'>
              <Plus className='w-5 h-5 mr-2' />
              Crear Primera Comunicación
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className='relative min-h-screen bg-background'>
      <PlatformHeader />
      <div className='container px-4 py-8 md:px-6 max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-primary mb-2'>
              Mis Comunicaciones
            </h1>

            <p className='text-muted-foreground'>
              Gestiona tus comunicaciones científicas, posters y videos para
              congresos médicos
            </p>
          </div>

          <Link href='/plataforma/comunicaciones/nueva'>
            <Button size='lg' className='bg-accent hover:bg-accent/90'>
              <Plus className='w-5 h-5 mr-2' /> Nueva Comunicación
            </Button>
          </Link>
        </div>
        {/* Stats Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8'>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-primary'>
                {stats.total}
              </div>

              <div className='text-sm text-muted-foreground'>Total</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-yellow-600'>
                {stats.draft}
              </div>

              <div className='text-sm text-muted-foreground'>Borradores</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-blue-600'>
                {stats.submitted}
              </div>

              <div className='text-sm text-muted-foreground'>Enviadas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {stats.accepted}
              </div>

              <div className='text-sm text-muted-foreground'>Aceptadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='text-2xl font-bold text-red-600'>
                {stats.rejected}
              </div>

              <div className='text-sm text-muted-foreground'>Rechazadas</div>
            </CardContent>
          </Card>
        </div>
        {/* Filters and Search */}
        <Card className='mb-6'>
          <CardContent className='p-6'>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />

                  <Input
                    placeholder='Buscar por título, autor o congreso...'
                    className='pl-10'
                  />
                </div>
              </div>
              <CommunicationFilters />
            </div>
          </CardContent>
        </Card>
        {/* Communications List */}
        {renderContent()}
      </div>
    </div>
  );
}
