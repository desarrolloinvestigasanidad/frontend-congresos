"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted")
    if (!cookiesAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg animate-slideUp">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium">Utilizamos cookies</h3>
          <p className="text-sm text-muted-foreground">
            Este sitio utiliza cookies para mejorar su experiencia. Al continuar navegando, acepta nuestra política de
            cookies.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
            <X className="w-4 h-4 mr-2" />
            Rechazar
          </Button>
          <Button size="sm" onClick={acceptCookies}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  )
}
