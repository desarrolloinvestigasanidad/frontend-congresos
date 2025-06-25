"use client";

import React from "react";
import PlatformHeader from "@/components/platform/platform-header";
import ProfileDashboard from "@/components/profile/profile-dashboard";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Cargando perfil…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <p>No hay sesión iniciada.</p>
        {/* opcional: redirigir autom. al login */}
      </div>
    );
  }

  return (
    <div className='relative min-h-screen bg-background'>
      <PlatformHeader />
      <div className='container px-4 py-8 md:px-6 max-w-6xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-primary mb-2'>Mi Perfil</h1>
          <p className='text-muted-foreground'>
            Gestiona tu información personal, profesional y configuración de
            cuenta
          </p>
        </div>
        {/* Pasamos el objeto `user` directamente */}
        <ProfileDashboard profile={user} />
      </div>
    </div>
  );
}
