// frontend-congresos/app/page.tsx
import type { Metadata } from "next";
import ButtonPreview from "@/components/platform-editor/button-preview";

export const metadata: Metadata = {
  title: "Plataforma de Congresos Médicos",
  description:
    "Panel principal con configuración dinámica desde la base de datos",
};

interface Point {
  x: number;
  y: number;
}

interface ImageButton {
  id: number;
  label: string;
  href: string;
  shape: "rectangle" | "circle" | "polygon";
  coordinates: Point[];
  variant: "primary" | "secondary" | "accent" | "outline";
  active: boolean;
  showLabel: boolean;
  labelPosition: "center" | "top" | "bottom" | "left" | "right";
}

interface PlatformConfig {
  heroImage: string;
  title: string;
  subtitle: string;
  buttons: ImageButton[];
}

// Fallback por si falla la llamada al backend
const defaultConfig: PlatformConfig = {
  heroImage: "/medical-conference.png",
  title: "Plataforma de Congresos Médicos",
  subtitle: "Configuración no disponible todavía",
  buttons: [],
};

async function fetchPlatformConfig(): Promise<PlatformConfig> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/platform-config`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("No se pudo cargar la configuración");
  }
  return res.json();
}

export default async function HomePage() {
  let config: PlatformConfig;

  try {
    config = await fetchPlatformConfig();
  } catch (e) {
    console.warn("Error cargando config desde BD:", e);
    config = defaultConfig;
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-white p-8'>
      {/* Vista previa dinámica */}
      <div className='w-full max-w-6xl'>
        <ButtonPreview config={config} />
      </div>
    </main>
  );
}
