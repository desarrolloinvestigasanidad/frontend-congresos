import type { Metadata } from "next";
import MultiStepRegisterForm from "@/components/auth/multi-step-register-form";
import BackgroundPattern from "@/components/background-pattern";

export const metadata: Metadata = {
  title: "Registro - Plataforma de Congresos Médicos",
  description: "Crea una cuenta en la plataforma de congresos médicos",
};

export default function RegisterPage() {
  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8'>
      <BackgroundPattern />
      <MultiStepRegisterForm />
    </div>
  );
}
