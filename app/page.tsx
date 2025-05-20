import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight, Calendar, CreditCard, FileText, Mail } from "lucide-react"
import CookieBanner from "@/components/cookie-banner"
import BackgroundImage from "@/components/background-image"
import ParallaxSection from "@/components/parallax-section"
import LogoSection from "@/components/logo-section"
import { redirect } from "next/navigation"

// Esta página redirige al dashboard
export default function Home() {
  redirect("/dashboard")

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <BackgroundImage />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary/80 to-primary-foreground/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-congreso.png"
              alt="Logo Congresos Médicos"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-lg font-bold text-white">Congresos Médicos</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#bienvenida" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              Bienvenida
            </Link>
            <Link href="#tarifas" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              Tarifas
            </Link>
            <Link href="#fechas" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              Fechas
            </Link>
            <Link href="#contacto" className="text-sm font-medium text-white hover:text-white/80 transition-colors">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Iniciar Sesión
            </Button>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Registro</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container relative pt-32 pb-20 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-6 items-start">
          {/* Left Side Images */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform">
              <Image src="/medical-conference-audience.png" alt="Conferencia médica" fill className="object-cover" />
            </div>
            <div className="relative h-[200px] rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform">
              <Image
                src="/medical-conference-presentation.png"
                alt="Presentación médica"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
            <Tabs defaultValue="bienvenida" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger
                  value="bienvenida"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Bienvenida</span>
                </TabsTrigger>
                <TabsTrigger
                  value="tarifas"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Tarifas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="fechas"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Fechas</span>
                </TabsTrigger>
                <TabsTrigger
                  value="contacto"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Contacto</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bienvenida" id="bienvenida" className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                    Bienvenidos a Congresos Médicos
                  </h1>
                  <p className="text-muted-foreground">
                    La plataforma líder para la organización y participación en congresos médicos de alto nivel.
                  </p>
                </div>

                <div className="space-y-4">
                  <p>
                    Nuestra plataforma está diseñada para facilitar la organización, gestión y participación en
                    congresos médicos de todas las especialidades. Ofrecemos herramientas avanzadas para:
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                      <span>Gestión completa de inscripciones y pagos</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                      <span>Envío y revisión de trabajos científicos</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                      <span>Programación detallada de sesiones y ponencias</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                      <span>Certificación digital de asistencia y participación</span>
                    </li>
                  </ul>

                  <p>
                    Todos nuestros congresos cumplen con los más altos estándares de calidad y están acreditados por
                    SOCIDESA, garantizando el valor académico y profesional de cada evento.
                  </p>
                </div>

                <Button className="bg-primary hover:bg-primary/90">Más información</Button>
              </TabsContent>

              <TabsContent value="tarifas" id="tarifas" className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Tarifas</h2>
                  <p className="text-muted-foreground">
                    Ofrecemos diferentes opciones de participación adaptadas a sus necesidades.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="bg-background rounded-lg border p-6 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold">Asistente</h3>
                      <p className="text-3xl font-bold">150€</p>
                      <p className="text-muted-foreground">Acceso completo a todas las sesiones</p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                        <span>Certificado de asistencia</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                        <span>Material del congreso</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                        <span>Acceso a grabaciones</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6">Inscribirse</Button>
                  </div>

                  <div className="bg-primary/5 rounded-lg border border-primary/20 p-6 shadow-sm">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold">Ponente</h3>
                      <p className="text-3xl font-bold">250€</p>
                      <p className="text-muted-foreground">Presentación de trabajos científicos</p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                        <span>Todo lo incluido en Asistente</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                        <span>Publicación en actas del congreso</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-5 h-5 text-primary shrink-0 mr-2" />
                        <span>Certificado de ponente</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-6 bg-primary hover:bg-primary/90">Inscribirse</Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  * Los precios no incluyen IVA. Consulte descuentos para grupos y estudiantes.
                </p>
              </TabsContent>

              <TabsContent value="fechas" id="fechas" className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Fechas importantes</h2>
                  <p className="text-muted-foreground">Calendario de eventos y plazos para el próximo congreso.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Apertura de inscripciones</h3>
                      <p className="text-muted-foreground">1 de Junio, 2025</p>
                      <p className="mt-1">Inicio del periodo de inscripción con tarifa reducida.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Fecha límite para envío de trabajos</h3>
                      <p className="text-muted-foreground">15 de Agosto, 2025</p>
                      <p className="mt-1">Último día para el envío de comunicaciones y pósters.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Notificación de aceptación</h3>
                      <p className="text-muted-foreground">15 de Septiembre, 2025</p>
                      <p className="mt-1">Comunicación de trabajos aceptados.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Celebración del congreso</h3>
                      <p className="text-muted-foreground">10-12 de Noviembre, 2025</p>
                      <p className="mt-1">Días de realización del congreso.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contacto" id="contacto" className="space-y-6 animate-fadeIn">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Contacto</h2>
                  <p className="text-muted-foreground">Estamos aquí para resolver todas sus dudas.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <p className="text-muted-foreground">info@congresosmedicos.es</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Horario de atención</h3>
                        <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 18:00</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="font-bold mb-2">Síguenos en redes sociales</h3>
                      <div className="flex gap-4">
                        <Link href="#" className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors">
                          <svg
                            className="w-5 h-5 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                          </svg>
                        </Link>
                        <Link href="#" className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors">
                          <svg
                            className="w-5 h-5 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </Link>
                        <Link href="#" className="bg-primary/10 hover:bg-primary/20 p-2 rounded-full transition-colors">
                          <svg
                            className="w-5 h-5 text-primary"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427a4.072 4.072 0 01-1.853.07 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background rounded-lg border p-6 shadow-sm">
                    <form className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Nombre
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Su nombre"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Su email"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Asunto
                        </label>
                        <input
                          id="subject"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Asunto de su mensaje"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Mensaje
                        </label>
                        <textarea
                          id="message"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Su mensaje"
                        />
                      </div>
                      <Button className="w-full">Enviar mensaje</Button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Side Images */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="relative h-[200px] rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform">
              <Image src="/placeholder-r5z0n.png" alt="Investigación médica" fill className="object-cover" />
            </div>
            <div className="relative h-[300px] rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform">
              <Image src="/placeholder-nud5x.png" alt="Networking médico" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <LogoSection />
      </div>

      {/* Parallax Section */}
      <ParallaxSection />

      {/* Cookie Banner */}
      <CookieBanner />
    </main>
  )
}
