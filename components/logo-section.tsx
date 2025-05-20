import Image from "next/image"

export default function LogoSection() {
  return (
    <div className="mt-16 pt-8 border-t">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm font-medium text-muted-foreground">Acreditado por:</p>
          <div className="relative h-16 w-48">
            <Image
              src="/images/logo-socidesa.png"
              alt="SOCIDESA - Sociedad Científica de Desarrollo y Educación Sanitaria"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm font-medium text-muted-foreground">Organizado por:</p>
          <div className="relative h-16 w-48">
            <Image src="/images/logo-investiga-sanidad.png" alt="Investiga Sanidad" fill className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}
