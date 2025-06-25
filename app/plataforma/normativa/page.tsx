import type { Metadata } from "next"
import PlatformHeader from "@/components/platform/platform-header"
import NormativaDashboard from "@/components/normativa/normativa-dashboard"

export const metadata: Metadata = {
  title: "Normativa - Plataforma de Congresos",
  description: "Consulta las normativas y requisitos para participar en el congreso",
}

// Simulación de datos que vendrían del backend
const getNormativaData = () => {
  return {
    congress: {
      id: "congreso-2025",
      name: "Congreso Nacional de Medicina 2025",
      dates: "10-12 Noviembre 2025",
      location: "Madrid, España",
      status: "active",
    },
    lastUpdated: "2024-01-25T10:30:00Z",
    categories: [
      {
        id: "general",
        name: "Normativa General",
        icon: "FileText",
        description: "Requisitos generales para la participación",
        color: "blue",
        items: [
          {
            id: "1",
            title: "Requisitos de Participación",
            content: `
## Requisitos Generales

Para participar en el Congreso Nacional de Medicina 2025, todos los participantes deben cumplir con los siguientes requisitos:

### 1. Registro Obligatorio
- Todos los participantes deben estar registrados en la plataforma
- La inscripción debe completarse antes del **31 de octubre de 2025**
- El pago de la inscripción debe estar confirmado

### 2. Identificación Profesional
- Título universitario en Medicina o especialidad relacionada
- Número de colegiado vigente
- Certificado de formación continuada (si aplica)

### 3. Código de Conducta
- Respeto hacia todos los participantes
- Uso apropiado de las instalaciones
- Cumplimiento de las normas de bioseguridad

### 4. Documentación Requerida
- DNI/Pasaporte vigente
- Certificado de vacunación COVID-19 (si es requerido)
- Justificante de pago de inscripción
            `,
            priority: "high",
            mandatory: true,
            lastUpdated: "2024-01-20T14:30:00Z",
            tags: ["registro", "identificación", "obligatorio"],
          },
          {
            id: "2",
            title: "Política de Cancelación",
            content: `
## Política de Cancelación y Reembolsos

### Cancelaciones con Reembolso Completo
- **Hasta 60 días antes**: Reembolso del 100%
- **30-59 días antes**: Reembolso del 75%
- **15-29 días antes**: Reembolso del 50%

### Cancelaciones sin Reembolso
- **Menos de 15 días antes**: Sin reembolso
- **No presentación**: Sin reembolso

### Proceso de Cancelación
1. Enviar solicitud por email a cancelaciones@congreso2025.es
2. Incluir número de registro y motivo
3. El reembolso se procesará en 15 días hábiles

### Excepciones
- Emergencias médicas documentadas
- Restricciones de viaje gubernamentales
- Cancelación del evento por fuerza mayor
            `,
            priority: "medium",
            mandatory: false,
            lastUpdated: "2024-01-15T09:15:00Z",
            tags: ["cancelación", "reembolso", "política"],
          },
        ],
      },
      {
        id: "comunicaciones",
        name: "Comunicaciones Científicas",
        icon: "Presentation",
        description: "Normativas específicas para comunicaciones",
        color: "green",
        items: [
          {
            id: "3",
            title: "Requisitos para Posters",
            content: `
## Normativa para Presentación de Posters

### Especificaciones Técnicas
- **Tamaño**: A0 vertical (84.1 x 118.9 cm)
- **Resolución**: Mínimo 300 DPI
- **Formato**: PDF de alta calidad

### Estructura Obligatoria
1. **Título**: Máximo 20 palabras
2. **Autores**: Nombre completo e institución
3. **Introducción**: Contexto y objetivos
4. **Metodología**: Descripción clara del estudio
5. **Resultados**: Datos principales con gráficos
6. **Conclusiones**: Hallazgos relevantes
7. **Referencias**: Máximo 10 referencias

### Criterios de Evaluación
- Relevancia científica (30%)
- Metodología (25%)
- Claridad de presentación (25%)
- Originalidad (20%)

### Fechas Importantes
- **Envío**: Hasta el 15 de septiembre de 2025
- **Notificación**: 15 de octubre de 2025
- **Versión final**: 31 de octubre de 2025
            `,
            priority: "high",
            mandatory: true,
            lastUpdated: "2024-01-22T11:45:00Z",
            tags: ["poster", "especificaciones", "evaluación"],
          },
          {
            id: "4",
            title: "Requisitos para Videos",
            content: `
## Normativa para Comunicaciones en Video

### Especificaciones Técnicas
- **Duración**: Máximo 10 minutos
- **Formato**: MP4, H.264
- **Resolución**: Mínimo 1080p (1920x1080)
- **Audio**: Calidad profesional, sin ruido de fondo

### Contenido Requerido
1. **Introducción personal** (30 segundos)
2. **Presentación del caso/estudio** (8 minutos)
3. **Conclusiones** (1.5 minutos)

### Normas de Presentación
- Vestimenta profesional
- Fondo neutro y profesional
- Iluminación adecuada
- Audio claro y comprensible

### Proceso de Revisión
- Revisión técnica automática
- Evaluación científica por comité
- Feedback constructivo si es necesario
- Posibilidad de reenvío (una vez)
            `,
            priority: "high",
            mandatory: true,
            lastUpdated: "2024-01-18T16:20:00Z",
            tags: ["video", "técnico", "presentación"],
          },
        ],
      },
      {
        id: "etica",
        name: "Ética y Bioseguridad",
        icon: "Shield",
        description: "Normativas éticas y de seguridad",
        color: "red",
        items: [
          {
            id: "5",
            title: "Comité de Ética",
            content: `
## Normativa del Comité de Ética

### Estudios con Pacientes
Todos los estudios que involucren pacientes deben:
- Contar con aprobación del Comité de Ética local
- Tener consentimiento informado firmado
- Cumplir con la Declaración de Helsinki
- Respetar la Ley de Protección de Datos

### Documentación Requerida
- Certificado de aprobación ética
- Formulario de consentimiento informado
- Protocolo del estudio
- Declaración de conflictos de interés

### Estudios con Animales
- Aprobación del Comité de Ética Animal
- Cumplimiento de las 3Rs (Reemplazar, Reducir, Refinar)
- Certificación de bienestar animal
- Justificación científica del modelo animal

### Sanciones
El incumplimiento puede resultar en:
- Rechazo de la comunicación
- Prohibición de participación futura
- Reporte a autoridades competentes
            `,
            priority: "high",
            mandatory: true,
            lastUpdated: "2024-01-25T08:30:00Z",
            tags: ["ética", "pacientes", "animales", "obligatorio"],
          },
        ],
      },
      {
        id: "logistica",
        name: "Logística y Acceso",
        icon: "MapPin",
        description: "Información sobre acceso y logística",
        color: "purple",
        items: [
          {
            id: "6",
            title: "Acceso al Recinto",
            content: `
## Normativa de Acceso al Recinto

### Horarios de Acceso
- **Día 1 (10 Nov)**: 8:00 - 20:00
- **Día 2 (11 Nov)**: 8:00 - 20:00  
- **Día 3 (12 Nov)**: 8:00 - 18:00

### Documentación Necesaria
- Acreditación del congreso (QR code)
- Documento de identidad válido
- Certificado sanitario (si requerido)

### Normas de Seguridad
- Prohibido el acceso con objetos punzantes
- Control de temperatura corporal
- Uso obligatorio de identificación visible
- Seguimiento de protocolos sanitarios

### Estacionamiento
- Parking gratuito para participantes
- Espacios limitados (reserva previa)
- Acceso para personas con movilidad reducida
- Servicio de valet parking disponible

### Transporte Público
- Metro: Línea 6, estación Ciudad Universitaria
- Autobús: Líneas 82, 132, G
- Servicio de shuttle desde hoteles principales
            `,
            priority: "medium",
            mandatory: false,
            lastUpdated: "2024-01-20T12:15:00Z",
            tags: ["acceso", "seguridad", "transporte"],
          },
        ],
      },
    ],
    notifications: [
      {
        id: "1",
        type: "update",
        title: "Actualización de Normativa",
        message: "Se han actualizado los requisitos para comunicaciones en video",
        date: "2024-01-25T10:30:00Z",
        category: "comunicaciones",
        priority: "high",
      },
      {
        id: "2",
        type: "reminder",
        title: "Recordatorio de Fechas",
        message: "Quedan 30 días para el cierre de envío de comunicaciones",
        date: "2024-01-20T09:00:00Z",
        category: "general",
        priority: "medium",
      },
    ],
    faqs: [
      {
        id: "1",
        question: "¿Puedo modificar mi comunicación después de enviarla?",
        answer:
          "Solo se pueden realizar modificaciones menores hasta 48 horas después del envío. Para cambios mayores, contacta con el comité organizador.",
        category: "comunicaciones",
      },
      {
        id: "2",
        question: "¿Qué pasa si no puedo asistir por motivos de salud?",
        answer:
          "En caso de emergencia médica documentada, se aplicará la política de cancelación especial con reembolso completo.",
        category: "general",
      },
      {
        id: "3",
        question: "¿Es obligatorio el certificado de vacunación?",
        answer:
          "Depende de las regulaciones sanitarias vigentes en el momento del evento. Se notificará con al menos 30 días de antelación.",
        category: "logistica",
      },
    ],
  }
}

export default function NormativaPage() {
  const normativaData = getNormativaData()

  return (
    <div className="relative min-h-screen bg-background">
      <PlatformHeader />

      <div className="container px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Normativa del Congreso</h1>
          <p className="text-muted-foreground">
            Consulta todas las normativas, requisitos y procedimientos para participar en el{" "}
            {normativaData.congress.name}
          </p>
        </div>

        <NormativaDashboard data={normativaData} />
      </div>
    </div>
  )
}
