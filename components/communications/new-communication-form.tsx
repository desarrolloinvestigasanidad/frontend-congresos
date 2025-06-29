"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Send, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import AuthorManagement from "./author-management";
import FileUploadSection from "./file-upload-section";

// --- Interfaces ---
interface Author {
  id: string;
  name: string;
  email: string;
  institution: string;
  role: "principal" | "coautor";
  isRegistered: boolean;
}

interface FormData {
  title: string;
  abstract: string;
  keywords: string;
  type: "poster" | "video" | "oral" | "";
  congressId: string;
  category: string;
  authors: Author[];
  introduction: string;
  objectives: string;
  methodology: string;
  results: string;
  discussion: string;
  bibliography: string;
}

interface Congress {
  id: string | number;
  title: string;
  status: string; // Asumimos que el backend devuelve un estado
}

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
  const { user, token } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    abstract: "",
    keywords: "",
    type: "",
    congressId: "",
    category: "",
    authors: [],
    introduction: "",
    objectives: "",
    methodology: "",
    results: "",
    discussion: "",
    bibliography: "",
  });

  const [availableCongresses, setAvailableCongresses] = useState<Congress[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, File | undefined>>({});

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        authors: [
          {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            institution:
              (user as any).institution || "Institución no especificada",
            role: "principal",
            isRegistered: true,
          },
        ],
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchCongresses = async () => {
      if (!token) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/congresses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok)
          throw new Error("No se pudieron cargar los congresos");
        const data = await response.json();
        // Filtramos para mostrar solo los congresos que están activos
        setAvailableCongresses(data.filter((c: any) => c.status === "active"));
      } catch {
        setApiError("No se pudieron cargar los congresos disponibles.");
      }
    };
    fetchCongresses();
  }, [token]);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "El título es obligatorio";
    if (!formData.abstract.trim())
      newErrors.abstract = "El resumen es obligatorio";
    if (!formData.type)
      newErrors.type = "El tipo de comunicación es obligatorio";
    if (!formData.congressId)
      newErrors.congressId = "El congreso es obligatorio";
    if (formData.authors.length === 0)
      newErrors.authors = "Debe haber al menos un autor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApiSubmit = async (status: "draft" | "submitted") => {
    if (status === "submitted" && !validateForm()) return;
    setIsSubmitting(true);
    setApiError(null);

    // Creamos una copia de los datos del formulario para enviarlos
    // El backend ya está preparado para recibir todos estos campos
    const dataToSend = { ...formData, status };

    try {
      if (!token) throw new Error("No estás autenticado.");

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
      setApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Link href='/plataforma/comunicaciones'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='w-4 h-4 mr-2' /> Volver
          </Button>
        </Link>
      </div>

      {apiError && (
        <div className='p-4 text-red-700 bg-red-50 rounded-md border border-red-200'>
          {apiError}
        </div>
      )}

      <Tabs defaultValue='basic' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 md:grid-cols-4'>
          <TabsTrigger value='basic'>1. Básico</TabsTrigger>
          <TabsTrigger value='content'>2. Contenido</TabsTrigger>
          <TabsTrigger value='authors'>3. Autores</TabsTrigger>
          <TabsTrigger value='files'>4. Archivos</TabsTrigger>
        </TabsList>

        <TabsContent value='basic' className='pt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='congressId'>Congreso *</Label>
                  <Select
                    value={formData.congressId}
                    onValueChange={(value) =>
                      updateFormData("congressId", value)
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un congreso activo' />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCongresses.map((congress) => (
                        <SelectItem
                          key={congress.id}
                          value={String(congress.id)}>
                          {congress.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='type'>Tipo de Comunicación *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      updateFormData("type", value as FormData["type"])
                    }>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona el tipo' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='poster'>Poster</SelectItem>
                      <SelectItem value='video'>Video</SelectItem>
                      <SelectItem value='oral'>Comunicación Oral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='title'>Título *</Label>
                <Input
                  id='title'
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='abstract'>Resumen (Abstract) *</Label>
                <Textarea
                  id='abstract'
                  value={formData.abstract}
                  onChange={(e) => updateFormData("abstract", e.target.value)}
                  rows={5}
                  placeholder='Escribe un breve resumen de tu comunicación...'
                />
                {errors.abstract && (
                  <p className='text-sm text-red-600'>{errors.abstract}</p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='keywords'>Palabras Clave</Label>
                <Input
                  id='keywords'
                  value={formData.keywords}
                  onChange={(e) => updateFormData("keywords", e.target.value)}
                  placeholder='Separadas por comas...'
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='content' className='pt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Contenido de la Comunicación</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='introduction'>Introducción</Label>
                <Textarea
                  id='introduction'
                  value={formData.introduction}
                  onChange={(e) =>
                    updateFormData("introduction", e.target.value)
                  }
                  rows={10}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='objectives'>Objetivos</Label>
                <Textarea
                  id='objectives'
                  value={formData.objectives}
                  onChange={(e) => updateFormData("objectives", e.target.value)}
                  rows={5}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='methodology'>Metodología</Label>
                <Textarea
                  id='methodology'
                  value={formData.methodology}
                  onChange={(e) =>
                    updateFormData("methodology", e.target.value)
                  }
                  rows={10}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='results'>Resultados</Label>
                <Textarea
                  id='results'
                  value={formData.results}
                  onChange={(e) => updateFormData("results", e.target.value)}
                  rows={10}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='discussion'>Discusión / Conclusión</Label>
                <Textarea
                  id='discussion'
                  value={formData.discussion}
                  onChange={(e) => updateFormData("discussion", e.target.value)}
                  rows={10}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='bibliography'>Bibliografía</Label>
                <Textarea
                  id='bibliography'
                  value={formData.bibliography}
                  onChange={(e) =>
                    updateFormData("bibliography", e.target.value)
                  }
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='authors' className='pt-6'>
          <AuthorManagement
            authors={formData.authors}
            onAuthorsChange={(newAuthors) =>
              updateFormData("authors", newAuthors)
            }
            error={errors.authors}
          />
        </TabsContent>

        <TabsContent value='files' className='pt-6'>
          <FileUploadSection
            type={formData.type}
            files={files}
            onFilesChange={setFiles}
          />
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className='p-6 flex flex-col sm:flex-row items-center justify-end gap-3'>
          <p className='text-sm text-muted-foreground mr-auto'>
            Revisa todos los apartados antes de enviar la comunicación.
          </p>
          <Button
            variant='outline'
            onClick={() => handleApiSubmit("draft")}
            disabled={isSubmitting}>
            <Save className='w-4 h-4 mr-2' />
            Guardar Borrador
          </Button>
          <Button
            onClick={() => handleApiSubmit("submitted")}
            disabled={isSubmitting}>
            <Send className='w-4 h-4 mr-2' />
            Enviar para Revisión
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
