// app/verify/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react"; // ← Importa Suspense
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BackgroundPattern from "@/components/background-pattern";
import VerifyFormClient from "./VerifyFormClient";

export const metadata: Metadata = {
  title: "Verificar Cuenta - Plataforma de Congresos Médicos",
  description: "Verifica tu cuenta en la plataforma de congresos médicos",
};

export default function VerifyPage() {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8'>
      <BackgroundPattern />

      <Link
        href='/'
        className='absolute top-8 left-8 flex items-center gap-2 z-10'>
        <div className='relative h-8 w-8'>
          <Image
            src='/images/logo-congreso.png'
            alt='Logo Congresos Médicos'
            fill
            className='object-contain'
          />
        </div>
        <span className='font-bold text-primary'>Congresos Médicos</span>
      </Link>

      <Card className='w-full max-w-md shadow-xl border-primary/10 bg-white/90 backdrop-blur-sm'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center text-primary'>
            Verificar Cuenta
          </CardTitle>
          <CardDescription className='text-center'>
            Introduce el código de verificación que hemos enviado a tu correo
            electrónico
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* ← Aquí va el Suspense que envuelve el Client Component */}
          <Suspense fallback={<p>Cargando formulario…</p>}>
            <VerifyFormClient />
          </Suspense>
        </CardContent>

        <CardFooter className='flex justify-center'>
          <div className='text-sm text-center text-muted-foreground'>
            <Link href='/login' className='text-primary hover:underline'>
              Volver a iniciar sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
