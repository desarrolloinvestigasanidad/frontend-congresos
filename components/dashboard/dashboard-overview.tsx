import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, Award } from "lucide-react"
import Image from "next/image"

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido, Dr. Ejemplo</h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad y próximos eventos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Congresos Inscritos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trabajos Enviados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 pendiente de revisión</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificados</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 nuevos disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contactos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 desde el último congreso</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="proximos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="proximos">Próximos Congresos</TabsTrigger>
          <TabsTrigger value="trabajos">Mis Trabajos</TabsTrigger>
          <TabsTrigger value="certificados">Certificados</TabsTrigger>
        </TabsList>
        <TabsContent value="proximos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/medical-conference.png?height=400&width=600&query=medical conference ${index}`}
                    alt={`Congreso ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>
                    Congreso Internacional de {["Cardiología", "Neurología", "Medicina Interna"][index - 1]}
                  </CardTitle>
                  <CardDescription>
                    {["15-17 Junio, 2025", "22-24 Julio, 2025", "10-12 Septiembre, 2025"][index - 1]} •{" "}
                    {["Madrid", "Barcelona", "Valencia"][index - 1]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <Button variant="outline">Ver detalles</Button>
                    <Button>Acceder</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="trabajos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mis Trabajos Científicos</CardTitle>
              <CardDescription>Gestiona tus trabajos enviados y en proceso de revisión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Avances en el tratamiento de hipertensión arterial</h3>
                      <p className="text-sm text-muted-foreground">Enviado el 10 de abril, 2025</p>
                    </div>
                    <div className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      En revisión
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Estudio comparativo de técnicas quirúrgicas mínimamente invasivas</h3>
                      <p className="text-sm text-muted-foreground">Enviado el 2 de marzo, 2025</p>
                    </div>
                    <div className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Aceptado
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button>Enviar nuevo trabajo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="certificados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mis Certificados</CardTitle>
              <CardDescription>Certificados de asistencia y participación en congresos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-medium">Certificado de {["Asistencia", "Ponente", "Póster"][index - 1]}</h3>
                      <p className="text-sm text-muted-foreground">
                        {
                          ["Congreso de Cardiología", "Simposio de Neurología", "Jornadas de Medicina Interna"][
                            index - 1
                          ]
                        }
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
