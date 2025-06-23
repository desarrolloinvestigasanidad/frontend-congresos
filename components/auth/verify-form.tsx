// components/auth/verify-form.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export default function VerifyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();
  const { toast } = useToast();

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token no proporcionado.");
      return;
    }

    setStatus("loading");
    fetch(`${API_URL}/auth/verify?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Error al verificar cuenta");
        }
        setStatus("success");
        setMessage(data.message || "Cuenta verificada. Inicia sesión.");
      })
      .catch((err: any) => {
        console.error(err);
        setStatus("error");
        setMessage(err.message || "Error en la verificación");
      });
  }, [token]);

  return (
    <div className='flex flex-col items-center'>
      {status === "loading" && <p>Verificando tu cuenta...</p>}
      {status === "success" && (
        <>
          <p className='text-green-600 mb-4'>{message}</p>
          <Button onClick={() => router.push("/login")}>Iniciar Sesión</Button>
        </>
      )}
      {status === "error" && (
        <>
          <p className='text-red-600 mb-4'>{message}</p>
          <Button onClick={() => router.push("/register")}>
            Volver a Registrar
          </Button>
        </>
      )}
    </div>
  );
}
