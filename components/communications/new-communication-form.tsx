"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import AuthorManagement from "./author-management";
import FileUploadSection from "./file-upload-section";
import PaymentSummary from "./payment-summary";
import { Save, Send, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  title: string;
  abstract: string;
  keywords: string;
  type: "poster" | "video" | "oral" | "";
  congress: string;
  category: string;
  authors: Author[];
  files: {
    abstract?: File;
    poster?: File;
    video?: File;
    presentation?: File;
  };
}

interface Author {
  id: string;
  name: string;
  email: string;
  institution: string;
  role: "principal" | "coautor";
  isRegistered: boolean;
}

const availableCongreses = [
  {
    id: "congreso-2025",
    name: "Congreso Nacional de Medicina 2025",
    active: true,
  },
];

const categories = {
  poster: [
    "Cardiología",
    "Neurología",
    "Oncología",
    "Pediatría",
    "Cirugía",
    "Medicina Interna",
    "Radiología",
    "Anestesiología",
  ],
  video: [
    "Técnicas Quirúrgicas",
    "Casos Clínicos",
    "Procedimientos Diagnósticos",
    "Innovación Médica",
  ],
  oral: [
    "Investigación Clínica",
    "Casos Complejos",
    "Avances Terapéuticos",
    "Protocolos y Guías",
  ],
};

export default function NewCommunicationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    abstract: "",
    keywords: "",
    type: "",
    congress: "congreso-2025", // Pre-seleccionar el congreso activo
    category: "",
    authors: [
      {
        id: "1",
        name: "Dr. Juan Pérez", // Datos del usuario actual
        email: "juan@email.com",
        institution: "Hospital Universitario",
        role: "principal",
        isRegistered: true,
      },
    ],
    files: {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "El título es obligatorio";
    if (!formData.abstract.trim())
      newErrors.abstract = "El resumen es obligatorio";
    if (!formData.type) newErrors.type = "Selecciona el tipo de comunicación";
    if (!formData.congress) newErrors.congress = "Selecciona un congreso";
    if (!formData.category) newErrors.category = "Selecciona una categoría";
    if (formData.authors.length === 0)
      newErrors.authors = "Debe haber al menos un autor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApiSubmit = async (status: "draft" | "submitted") => {
    if (status === "submitted" && !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    // NOTA: La subida de ficheros real es más compleja (multipart/form-data).
    // Por ahora, enviaremos solo los datos JSON para conectar con el backend.
    const dataToSend = {
      title: formData.title,
      abstract: formData.abstract,
      keywords: formData.keywords,
      type: formData.type,
      congressId: formData.congress, // Asegúrate de que el backend espera `congressId`
      category: formData.category,
      authors: formData.authors,
      status: status,
    };

    try {
      // Asume que el token está en localStorage. ¡Ajusta si es necesario!
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No estás autenticado. Por favor, inicia sesión.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comunicaciones`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Ocurrió un error en el servidor."
        );
      }

      router.push("/plataforma/comunicaciones");
    } catch (error: any) {
      console.error("Error al procesar la comunicación:", error);
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const coauthors = formData.authors.filter(
    (author) => author.role === "coautor"
  );
  const totalCost = 8;

  return (
    <div className='space-y-6'>
      {/* Navegación */}
      <div className='flex items-center gap-4'>
        <Link href='/plataforma/comunicaciones'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='w-4 h-4 mr-2' /> Volver
          </Button>
        </Link>
        <div className='flex items-center gap-2'>
          <Badge variant='secondary'>Borrador</Badge>
        </div>
      </div>
      {/* Mostrar el error de la API si existe */}
      {apiError && (
        <div className='p-4 my-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center gap-2'>
          <AlertCircle className='w-5 h-5' />
          <p>{apiError}</p>
        </div>
      )}
      {/* Información básica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='congress'>Congreso *</Label>
              <Select
                value={formData.congress}
                onValueChange={(value) => updateFormData("congress", value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona un congreso' />
                </SelectTrigger>
                <SelectContent>
                  {availableCongreses.map((congress) => (
                    <SelectItem
                      key={congress.id}
                      value={congress.id}
                      disabled={!congress.active}>
                      {congress.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.congress && (
                <p className='text-sm text-red-600'>{errors.congress}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='type'>Tipo de Comunicación *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateFormData("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona el tipo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='poster'>Poster</SelectItem>
                  <SelectItem value='video'>Video</SelectItem>
                  <SelectItem value='oral'>Comunicación Oral</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className='text-sm text-red-600'>{errors.type}</p>
              )}
            </div>
          </div>
          {formData.type && (
            <div className='space-y-2'>
              <Label htmlFor='category'>Categoría *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => updateFormData("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona una categoría' />
                </SelectTrigger>
                <SelectContent>
                  {categories[formData.type as keyof typeof categories]?.map(
                    (category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className='text-sm text-red-600'>{errors.category}</p>
              )}
            </div>
          )}
          <div className='space-y-2'>
            <Label htmlFor='title'>Título *</Label>
            <Input
              id='title'
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              placeholder='Título de la comunicación'
              maxLength={200}
            />
            <div className='flex justify-between text-sm text-muted-foreground'>
              {errors.title && (
                <span className='text-red-600'>{errors.title}</span>
              )}
              <span>{formData.title.length}/200</span>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='abstract'>Resumen *</Label>
            <Textarea
              id='abstract'
              value={formData.abstract}
              onChange={(e) => updateFormData("abstract", e.target.value)}
              placeholder='Resumen de la comunicación (máximo 500 palabras)'
              rows={6}
              maxLength={3000}
            />
            <div className='flex justify-between text-sm text-muted-foreground'>
              {errors.abstract && (
                <span className='text-red-600'>{errors.abstract}</span>
              )}
              <span>{formData.abstract.length}/3000 caracteres</span>
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='keywords'>Palabras Clave</Label>
            <Input
              id='keywords'
              value={formData.keywords}
              onChange={(e) => updateFormData("keywords", e.target.value)}
              placeholder='Palabras clave separadas por comas'
            />
            <p className='text-sm text-muted-foreground'>
              Máximo 5 palabras clave separadas por comas
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Gestión de autores */}
      <AuthorManagement
        authors={formData.authors}
        onAuthorsChange={(authors) => updateFormData("authors", authors)}
        error={errors.authors}
      />
      {/* Subida de archivos */}
      <FileUploadSection
        type={formData.type}
        files={formData.files}
        onFilesChange={(files) => updateFormData("files", files)}
        error={errors.files}
      />
      {/* Resumen de pago */}
      <PaymentSummary
        principalAuthor={formData.authors.find((a) => a.role === "principal")}
        coauthors={coauthors}
        totalCost={totalCost}
      />
      {/* Acciones */}
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row gap-4 justify-between'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <AlertCircle className='w-4 h-4' />
              <span>Asegúrate de guardar los cambios antes de salir.</span>
            </div>
            <div className='flex gap-3'>
              <Button
                variant='outline'
                onClick={() => handleApiSubmit("draft")}
                disabled={isSubmitting}>
                <Save className='w-4 h-4 mr-2' />
                {isSubmitting ? "Guardando..." : "Guardar Borrador"}
              </Button>
              <Button
                onClick={() => handleApiSubmit("submitted")}
                disabled={isSubmitting}
                className='bg-accent hover:bg-accent/90'>
                <Send className='w-4 h-4 mr-2' />
                {isSubmitting ? "Enviando..." : "Enviar Comunicación"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
