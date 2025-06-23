"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import PersonalInfoForm from "./personal-info-form";
import ProfessionalInfoForm from "./professional-info-form";
import AccountSettings from "./account-settings";
import ActivityHistory from "./activity-history";
import ProfileStats from "./profile-stats";
import {
  User as UserIcon,
  Briefcase,
  Settings,
  History,
  Award,
  Calendar,
} from "lucide-react";

interface ProfileDashboardProps {
  profile: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    address: string;
    country: string;
    autonomousCommunity: string;
    province: string | null;
    professionalCategory: string;
    interests: string;
    verified: number;
    termsAccepted: number;
    infoAccepted: number;
    deviceIp: string;
    state: string;
    roleId: number;
    createdAt: string;
    updatedAt: string;
    // cualquier otro campo que uses...
  };
}

export default function ProfileDashboard({ profile }: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  // Mapea unos cuantos datos simulados para los subcomponentes
  const stats = {
    memberSince: profile.createdAt,
    // si no tienes más estadísticas, pon 0 o elimínalas
    communicationsSubmitted: 0,
    communicationsAccepted: 0,
    congressesAttended: 0,
    certificatesEarned: 0,
  };

  const recentActivity: any[] = []; // hasta que tengas datos reales
  const congresses: any[] = []; // idem

  return (
    <div className='space-y-6'>
      <Card>
        <CardContent className='p-6'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col items-center md:items-start'>
              <Avatar className='w-24 h-24 mb-4'>
                <AvatarImage src='/placeholder.svg' alt={fullName} />
                <AvatarFallback className='text-xl bg-primary text-primary-foreground'>
                  {initials}
                </AvatarFallback>
              </Avatar>
              {profile.verified ? (
                <Badge
                  variant='secondary'
                  className='bg-green-50 text-green-700'>
                  Cuenta Verificada
                </Badge>
              ) : (
                <Badge variant='outline'>No Verificada</Badge>
              )}
            </div>

            <div className='flex-1 text-center md:text-left'>
              <h2 className='text-2xl font-bold mb-1'>{fullName}</h2>
              <p className='text-lg text-muted-foreground mb-2'>
                {profile.professionalCategory}
              </p>
              <p className='text-muted-foreground mb-4'>
                {profile.address}, {profile.country}
              </p>

              <div className='flex flex-wrap gap-2 justify-center md:justify-start'>
                <Badge variant='outline'>
                  <UserIcon className='w-3 h-3 mr-1' />
                  {profile.state}
                </Badge>
                <Badge variant='outline'>
                  <Calendar className='w-3 h-3 mr-1' />
                  Miembro desde {new Date(profile.createdAt).getFullYear()}
                </Badge>
              </div>
            </div>

            <div className='flex flex-col items-center md:items-end'>
              <ProfileStats stats={stats} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='personal' className='flex items-center gap-2'>
            <UserIcon className='w-4 h-4' />
            <span className='hidden sm:inline'>Personal</span>
          </TabsTrigger>
          <TabsTrigger value='professional' className='flex items-center gap-2'>
            <Briefcase className='w-4 h-4' />
            <span className='hidden sm:inline'>Profesional</span>
          </TabsTrigger>
          <TabsTrigger value='settings' className='flex items-center gap-2'>
            <Settings className='w-4 h-4' />
            <span className='hidden sm:inline'>Configuración</span>
          </TabsTrigger>
          <TabsTrigger value='activity' className='flex items-center gap-2'>
            <History className='w-4 h-4' />
            <span className='hidden sm:inline'>Actividad</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value='personal' className='space-y-6 pt-6'>
          <PersonalInfoForm
            personalInfo={{
              firstName: profile.firstName,
              lastName: profile.lastName,
              email: profile.email,
              phone: profile.phone,
              gender: profile.gender,
              // dateOfBirth: "", // si lo añades al modelo
            }}
            address={{
              street: profile.address,
              city: "",
              state: profile.province || "",
              postalCode: "",
              country: profile.country,
            }}
            taxInfo={{
              taxId: profile.id,
              companyName: "",
              vatNumber: "",
            }}
          />
        </TabsContent>

        <TabsContent value='professional' className='space-y-6 pt-6'>
          <ProfessionalInfoForm
            professionalInfo={{
              title: "",
              specialization: profile.professionalCategory,
              licenseNumber: "",
              institution: "",
              department: "",
              position: profile.state,
              yearsExperience: 0,
              cv: "",
            }}
            congresses={congresses}
            stats={stats}
          />
        </TabsContent>

        <TabsContent value='settings' className='space-y-6 pt-6'>
          <AccountSettings
            settings={{
              language: "es",
              timezone: "Europe/Madrid",
              emailNotifications: !!profile.infoAccepted,
              smsNotifications: false,
              marketingEmails: true,
              twoFactorEnabled: false,
            }}
            email={profile.email}
          />
        </TabsContent>

        <TabsContent value='activity' className='space-y-6 pt-6'>
          <ActivityHistory activity={recentActivity} stats={stats} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
