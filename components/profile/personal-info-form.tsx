"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, User, MapPin, FileText, Lock } from "lucide-react";

interface PersonalInfoFormProps {
  personalInfo: any;
  address: any;
  taxInfo: any;
}

export default function PersonalInfoForm({
  personalInfo,
  address,
  taxInfo,
}: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    ...personalInfo,
    ...address,
    ...taxInfo,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateFormData = (field: string, value: any) => {
    interface PersonalInfo {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      gender: "male" | "female" | "other" | "prefer-not-to-say";
      nationality: string;
      profileImage?: string;
    }

    interface Address {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    }

    interface TaxInfo {
      taxId: string;
      companyName?: string;
      vatNumber?: string;
    }

    interface FormData extends PersonalInfo, Address, TaxInfo {}

    interface PersonalInfoFormProps {
      personalInfo: PersonalInfo;
      address: Address;
      taxInfo: TaxInfo;
    }

    // In the updateFormData function:
    const updateFormData = (
      field: keyof FormData,
      value: FormData[keyof FormData]
    ) => {
      setFormData((prev: FormData) => ({ ...prev, [field]: value }));
    };
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Datos guardados:", formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...personalInfo, ...address, ...taxInfo });
    setIsEditing(false);
  };

  return (
    <div className='space-y-6'>
      {/* Información personal */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <User className='w-5 h-5' />
              Información Personal
            </div>
            {!isEditing && (
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>Nombre *</Label>
              <Input
                id='firstName'
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName'>Apellidos *</Label>
              <Input
                id='lastName'
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email *</Label>
              <div className='relative'>
                <Input id='email' value={formData.email} disabled />
                <Badge className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-100 text-green-700'>
                  <Lock className='w-3 h-3 mr-1' />
                  Verificado
                </Badge>
              </div>
              <p className='text-xs text-muted-foreground'>
                El email no se puede modificar. Contacta con soporte si
                necesitas cambiarlo.
              </p>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Teléfono</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            <div className='space-y-2'>
              <Label htmlFor='dateOfBirth'>Fecha de Nacimiento</Label>
              <Input
                id='dateOfBirth'
                type='date'
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='gender'>Género</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => updateFormData("gender", value)}
                disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona género' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='male'>Masculino</SelectItem>
                  <SelectItem value='female'>Femenino</SelectItem>
                  <SelectItem value='other'>Otro</SelectItem>
                  <SelectItem value='prefer-not-to-say'>
                    Prefiero no decir
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='nationality'>Nacionalidad</Label>
              <Input
                id='nationality'
                value={formData.nationality}
                onChange={(e) => updateFormData("nationality", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className='flex gap-2 pt-4'>
              <Button onClick={handleSave} disabled={isSaving}>
                <Save className='w-4 h-4 mr-2' />
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
              <Button variant='outline' onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dirección */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <MapPin className='w-5 h-5' />
            Dirección
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='street'>Dirección</Label>
            <Input
              id='street'
              value={formData.street}
              onChange={(e) => updateFormData("street", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            <div className='space-y-2'>
              <Label htmlFor='city'>Ciudad</Label>
              <Input
                id='city'
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='postalCode'>Código Postal</Label>
              <Input
                id='postalCode'
                value={formData.postalCode}
                onChange={(e) => updateFormData("postalCode", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='country'>País</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => updateFormData("country", value)}
                disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecciona país' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='España'>España</SelectItem>
                  <SelectItem value='Portugal'>Portugal</SelectItem>
                  <SelectItem value='Francia'>Francia</SelectItem>
                  <SelectItem value='Italia'>Italia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
