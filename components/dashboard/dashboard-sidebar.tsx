"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Calendar, FileText, Users, MessageSquare, Award, Settings, HelpCircle } from "lucide-react"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  title: string
  isActive?: boolean
}

function NavItem({ href, icon, title, isActive }: NavItemProps) {
  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-primary/5",
        )}
      >
        {icon}
        {title}
      </Button>
    </Link>
  )
}

export default function DashboardSidebar() {
  // En una aplicación real, esto vendría de un estado global o de la ruta actual
  const [activePath, setActivePath] = useState("/dashboard")

  return (
    <aside className="fixed left-0 top-16 bottom-0 z-30 hidden w-64 border-r bg-white md:block">
      <ScrollArea className="h-full py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Principal</h2>
          <div className="space-y-1">
            <NavItem
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              title="Inicio"
              isActive={activePath === "/dashboard"}
            />
            <NavItem href="/dashboard/congresos" icon={<Calendar className="h-5 w-5" />} title="Mis Congresos" />
            <NavItem href="/dashboard/trabajos" icon={<FileText className="h-5 w-5" />} title="Mis Trabajos" />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Comunidad</h2>
          <div className="space-y-1">
            <NavItem href="/dashboard/ponentes" icon={<Users className="h-5 w-5" />} title="Ponentes" />
            <NavItem href="/dashboard/mensajes" icon={<MessageSquare className="h-5 w-5" />} title="Mensajes" />
            <NavItem href="/dashboard/certificados" icon={<Award className="h-5 w-5" />} title="Certificados" />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Configuración</h2>
          <div className="space-y-1">
            <NavItem href="/dashboard/ajustes" icon={<Settings className="h-5 w-5" />} title="Ajustes" />
            <NavItem href="/dashboard/ayuda" icon={<HelpCircle className="h-5 w-5" />} title="Ayuda" />
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
