// frontend-congresos/components/auth/login-form.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContext";

// Cambiado para usar "id" en lugar de "email"
const loginSchema = z.object({
  id: z.string().nonempty({ message: "El identificador es obligatorio" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth(); // 📌 método login del contexto
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      id: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.id, password: data.password }),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Error al iniciar sesión");
      }

      // Llama a login(token) para guardar y obtener perfil
      login(body.token);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      {error && (
        <Alert
          variant='destructive'
          className='bg-destructive/10 text-destructive border-destructive/20'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className='space-y-2'>
        <Label htmlFor='id'>DNI/NIE/Pasaporte</Label>
        <Input
          id='id'
          type='text'
          placeholder='Escribe tu identificador'
          {...register("id")}
          className={errors.id ? "border-destructive" : ""}
        />
        {errors.id && (
          <p className='text-sm text-destructive'>{errors.id.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='password'>Contraseña</Label>
        <Input
          id='password'
          type='password'
          {...register("password")}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && (
          <p className='text-sm text-destructive'>{errors.password.message}</p>
        )}
      </div>

      <div className='flex items-center space-x-2'>
        <Checkbox id='rememberMe' {...register("rememberMe")} />
        <Label htmlFor='rememberMe' className='text-sm font-normal'>
          Recordarme
        </Label>
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Iniciando sesión...
          </>
        ) : (
          "Iniciar Sesión"
        )}
      </Button>
    </form>
  );
}
