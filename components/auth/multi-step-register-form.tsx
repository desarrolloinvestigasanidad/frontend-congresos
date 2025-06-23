"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  X,
  Check,
  ChevronDown,
  Search,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Multi-select component for autonomous communities
type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
};

function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  searchPlaceholder = "Buscar...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((val) => val !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (
    e: React.MouseEvent<HTMLButtonElement>,
    optionValue: string
  ) => {
    e.stopPropagation();
    onChange(value.filter((val) => val !== optionValue));
  };

  const getSelectedLabels = () => {
    return value.map(
      (val) => options.find((option) => option.value === val)?.label || val
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full font-sans",
        disabled && "opacity-70 cursor-not-allowed",
        className
      )}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex min-h-10 w-full flex-wrap items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          isOpen && "ring-2 ring-primary ring-offset-2",
          disabled && "bg-gray-50 cursor-not-allowed"
        )}>
        <div className='flex flex-wrap gap-1.5 pe-8'>
          {value.length > 0 ? (
            getSelectedLabels().map((label, index) => (
              <div
                key={index}
                className='flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800'>
                <span>{label}</span>
                <button
                  type='button'
                  onClick={(e) => removeOption(e, value[index])}
                  className='ml-1 rounded-full p-0.5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary'
                  disabled={disabled}>
                  <X className='h-3 w-3' />
                </button>
              </div>
            ))
          ) : (
            <span className='text-gray-500'>{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>
      {isOpen && (
        <div className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg'>
          <div className='sticky top-0 z-20 bg-white px-2 py-1.5 border-b border-gray-100'>
            <div className='relative'>
              <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
              <input
                ref={searchInputRef}
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className='h-8 w-full rounded-md border-0 bg-gray-50 pl-8 pr-2 text-sm outline-none focus:bg-gray-100'
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                  <X className='h-4 w-4' />
                </button>
              )}
            </div>
          </div>
          <div className='mt-1'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      "flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100",
                      isSelected && "bg-primary/10"
                    )}>
                    <span
                      className={cn(
                        "text-sm",
                        isSelected
                          ? "text-primary font-medium"
                          : "text-gray-700"
                      )}>
                      {option.label}
                    </span>
                    {isSelected && <Check className='h-4 w-4 text-primary' />}
                  </div>
                );
              })
            ) : (
              <div className='px-3 py-2 text-sm text-gray-500'>
                No se encontraron resultados
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Terms and conditions component
function TermsAndConditions() {
  return (
    <div className='max-h-[70vh] overflow-y-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>TÉRMINOS Y CONDICIONES</h2>
      <div className='prose prose-sm'>
        <ol className='list-decimal list-inside space-y-4'>
          <li>
            <strong>Objeto</strong>
            <p>
              El presente documento regula el acceso y uso del sitio web de la
              plataforma de congresos médicos, así como la contratación de los
              servicios ofrecidos en la plataforma.
            </p>
          </li>
          <li>
            <strong>Condiciones de Uso</strong>
            <p>
              El acceso al portal es gratuito, salvo en los casos en que se
              especifique lo contrario. Los usuarios se comprometen a:
            </p>
            <ul className='list-disc list-inside ml-4'>
              <li>
                Hacer un uso adecuado de los contenidos y servicios de la web.
              </li>
              <li>
                No realizar actividades ilícitas, fraudulentas o que puedan
                dañar el funcionamiento del sitio.
              </li>
              <li>
                No introducir virus u otros elementos que puedan alterar o dañar
                sistemas informáticos.
              </li>
            </ul>
          </li>
          <li>
            <strong>Propiedad Intelectual</strong>
            <p>
              Todos los contenidos de la web, incluyendo textos, imágenes,
              logotipos, diseños y software, son propiedad de la plataforma o de
              terceros licenciantes. Queda prohibida la reproducción,
              distribución, modificación o uso sin autorización expresa.
            </p>
          </li>
          <li>
            <strong>Exclusión de Responsabilidad</strong>
            <p>
              La plataforma no garantiza la disponibilidad continua del sitio
              web ni se hace responsable de:
            </p>
            <ul className='list-disc list-inside ml-4'>
              <li>
                Fallos técnicos, interrupciones del servicio o errores en el
                contenido.
              </li>
              <li>
                Daños o perjuicios derivados del uso de la información contenida
                en la web.
              </li>
              <li>
                Enlaces a terceros, cuyo contenido es ajeno a nuestra
                responsabilidad.
              </li>
            </ul>
          </li>
          <li>
            <strong>Contratación de Servicios</strong>
            <p>
              La contratación de servicios a través de la web está sujeta a las
              siguientes condiciones:
            </p>
            <ul className='list-disc list-inside ml-4'>
              <li>
                El usuario debe ser mayor de edad y proporcionar datos veraces.
              </li>
              <li>
                Los precios y condiciones de los servicios se detallan antes de
                la contratación.
              </li>
              <li>Se podrá requerir pago previo para ciertos servicios.</li>
            </ul>
          </li>
          <li>
            <strong>Modificación de Condiciones</strong>
            <p>
              La plataforma se reserva el derecho de modificar estos términos y
              condiciones en cualquier momento. La utilización del sitio tras
              dichas modificaciones implica la aceptación de los nuevos
              términos.
            </p>
          </li>
          <li>
            <strong>Legislación Aplicable y Jurisdicción</strong>
            <p>
              Estas condiciones se rigen por la legislación española. Cualquier
              disputa será resuelta en los tribunales competentes.
            </p>
          </li>
        </ol>
        <p className='mt-6'>
          Para cualquier consulta, puede contactarnos a través de nuestros
          canales oficiales.
        </p>
      </div>
    </div>
  );
}

// Spanish regions and provinces data
const regionsProvinces = {
  Andalucía: [
    "Almería",
    "Cádiz",
    "Córdoba",
    "Granada",
    "Huelva",
    "Jaén",
    "Málaga",
    "Sevilla",
  ],
  Aragón: ["Huesca", "Teruel", "Zaragoza"],
  "Principado de Asturias": ["Asturias"],
  "Islas Baleares": ["Islas Baleares"],
  Canarias: ["Las Palmas", "Santa Cruz de Tenerife"],
  Cantabria: ["Cantabria"],
  "Castilla y León": [
    "Ávila",
    "Burgos",
    "León",
    "Palencia",
    "Salamanca",
    "Segovia",
    "Soria",
    "Valladolid",
    "Zamora",
  ],
  "Castilla-La Mancha": [
    "Albacete",
    "Ciudad Real",
    "Cuenca",
    "Guadalajara",
    "Toledo",
  ],
  Cataluña: ["Barcelona", "Girona", "Lleida", "Tarragona"],
  "Comunidad de Madrid": ["Madrid"],
  "Comunidad Valenciana": ["Alicante", "Castellón", "Valencia"],
  Extremadura: ["Badajoz", "Cáceres"],
  Galicia: ["A Coruña", "Lugo", "Ourense", "Pontevedra"],
  "Región de Murcia": ["Murcia"],
  "Comunidad Foral de Navarra": ["Navarra"],
  "País Vasco": ["Álava", "Guipúzcoa", "Vizcaya"],
  "La Rioja": ["La Rioja"],
  Ceuta: ["Ceuta"],
  Melilla: ["Melilla"],
};

// Professional categories (mock data - replace with your API)
const professionalCategories = [
  { id: "medico", nombre: "Médico" },
  { id: "enfermero", nombre: "Enfermero/a" },
  { id: "farmaceutico", nombre: "Farmacéutico/a" },
  { id: "fisioterapeuta", nombre: "Fisioterapeuta" },
  { id: "psicologo", nombre: "Psicólogo/a" },
  { id: "nutricionista", nombre: "Nutricionista" },
  { id: "veterinario", nombre: "Veterinario/a" },
  { id: "biologo", nombre: "Biólogo/a" },
  { id: "quimico", nombre: "Químico/a" },
  { id: "estudiante", nombre: "Estudiante" },
  { id: "investigador", nombre: "Investigador/a" },
  { id: "otro", nombre: "Otro" },
];

interface StepIndicatorProps {
  stepNumber: number;
  label: string;
  active: boolean;
  completed: boolean;
}

function StepIndicator({
  stepNumber,
  label,
  active,
  completed,
}: StepIndicatorProps) {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-300 min-w-[80px] sm:min-w-[100px] ${
        active ? "opacity-100" : completed ? "opacity-90" : "opacity-60"
      }`}>
      <div
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 text-sm font-semibold ${
          completed
            ? "bg-primary text-white"
            : active
            ? "border-2 border-primary bg-white text-primary"
            : "border-2 border-gray-300 bg-transparent text-gray-400"
        }`}>
        {completed ? (
          <CheckCircle className='w-4 h-4 md:w-5 md:h-5' />
        ) : (
          stepNumber
        )}
      </div>
      <span
        className={`text-xs text-center md:text-sm font-medium mt-1.5 ${
          active ? "text-primary" : completed ? "text-primary" : "text-gray-500"
        }`}>
        {label}
      </span>
    </div>
  );
}
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export default function MultiStepRegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [infoAccepted, setInfoAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    professionalCategory: "",
    gender: "",
    address: "",
    interests: "",
    country: "España",
    autonomousCommunity: [] as string[],
  });

  const communityOptions: Option[] = Object.keys(regionsProvinces).map(
    (community) => ({
      value: community,
      label: community,
    })
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "country" && value !== "España") {
      setFormData((prev) => ({
        ...prev,
        autonomousCommunity: [],
      }));
    }
  };

  const handleCommunityChange = (selected: string[]) => {
    setFormData((prev) => ({
      ...prev,
      autonomousCommunity: selected,
    }));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage("");
    setEmailError("");

    if (step === 0) {
      const { id, email, password, confirmPassword } = formData;
      if (!id || !email || !password || !confirmPassword) {
        toast({
          title: "Campos incompletos",
          description: "Por favor, completa todos los campos requeridos.",
          variant: "destructive",
        });
        return;
      }
      if (!validateEmail(email)) {
        setEmailError("Por favor, introduce un email válido.");
        return;
      }
      if (password.length < 6) {
        toast({
          title: "Contraseña inválida",
          description: "La contraseña debe tener al menos 6 caracteres.",
          variant: "destructive",
        });
        return;
      }
      if (password !== confirmPassword) {
        toast({
          title: "Error de contraseña",
          description: "Las contraseñas no coinciden.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 1) {
      const { firstName, lastName, phone, professionalCategory } = formData;
      if (!firstName || !lastName || !phone || !professionalCategory) {
        toast({
          title: "Campos incompletos",
          description:
            "Por favor, completa todos los campos requeridos en Datos Personales.",
          variant: "destructive",
        });
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage("");
    setStep((prev) => prev - 1);
  };

  const handleSubmitFinal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    if (formData.country === "España") {
      if (
        !formData.autonomousCommunity ||
        formData.autonomousCommunity.length === 0
      ) {
        toast({
          title: "Campo requerido",
          description: "Por favor, selecciona al menos una Comunidad Autónoma.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }
    if (!termsAccepted) {
      toast({
        title: "Términos y Condiciones",
        description:
          "Debes aceptar los términos y condiciones para registrarte.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: formData.id,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          professionalCategory: formData.professionalCategory,
          gender: formData.gender,
          address: formData.address,
          interests: formData.interests,
          country: formData.country,
          autonomousCommunity: formData.autonomousCommunity,
          termsAccepted,
          infoAccepted,
          deviceIp: "0.0.0.0",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      // guarda el token para posteriores llamadas
      localStorage.setItem("token", data.token);

      toast({
        title: "Registro exitoso",
        description: "Revisa tu correo para verificar la cuenta.",
      });
      setRegistrationComplete(true);
      setMessage("Revisa tu correo para verificar la cuenta.");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error de red",
        description: "No se ha podido conectar con el servidor.",
        variant: "destructive",
      });
      setMessage("Error de conexión.");
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationComplete) {
    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='max-w-md w-full bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl text-center border border-primary/10'>
          <div className='w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
            <CheckCircle className='w-8 h-8 md:w-10 md:h-10 text-primary' />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold mb-4 text-primary'>
            ¡Registro completado!
          </h1>
          <p className='text-gray-700 mb-6 font-medium'>{message}</p>
          <p className='text-gray-600 mb-8 text-sm md:text-base'>
            Sigue las instrucciones enviadas a tu correo para activar tu cuenta.
          </p>
          <Button
            onClick={() => router.push("/login")}
            className='w-full bg-primary hover:bg-primary/90 text-white py-3'>
            Ir a Iniciar Sesión
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='w-full max-w-5xl mx-auto'>
      <Link
        href='/'
        className='absolute top-8 left-8 flex items-center gap-2 z-10'>
        <div className='relative h-8 w-8'>
          <Image
            src='/placeholder.svg?height=32&width=32'
            alt='Logo Congresos Médicos'
            fill
            className='object-contain'
          />
        </div>
        <span className='font-bold text-primary'>Congresos Médicos</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row border border-primary/10'>
        <div className='relative md:w-2/5 min-h-[250px] md:min-h-0 bg-gradient-to-br from-primary to-primary/80 flex flex-col items-center justify-center p-8'>
          <Image
            src='/placeholder.svg?height=75&width=300'
            alt='Plataforma Médica'
            width={300}
            height={75}
            className='w-40 h-auto mb-6'
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-center text-white'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4'>
              Crea tu cuenta
            </h2>
            <p className='mb-8 text-white/90 text-sm md:text-base'>
              Completa los pasos para crear tu cuenta y acceder a nuestras
              publicaciones científicas.
            </p>
          </motion.div>
        </div>

        <div className='md:w-3/5 p-6 md:p-8'>
          <div className='flex justify-center mb-6 md:mb-8'>
            <div className='flex space-x-2 md:space-x-4 overflow-x-auto w-full justify-center'>
              <StepIndicator
                stepNumber={1}
                label='Credenciales'
                active={step === 0}
                completed={step > 0}
              />
              <StepIndicator
                stepNumber={2}
                label='Datos Personales'
                active={step === 1}
                completed={step > 1}
              />
              <StepIndicator
                stepNumber={3}
                label='Ubicación y Términos'
                active={step === 2}
                completed={step > 2}
              />
            </div>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: step === 0 ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>
              <form
                className='space-y-5'
                onSubmit={
                  step === 2 ? handleSubmitFinal : (e) => e.preventDefault()
                }>
                {step === 0 && (
                  <>
                    <h2 className='text-xl font-semibold mb-5 text-gray-700'>
                      Paso 1: DNI/NIE/Pasaporte y Acceso
                    </h2>
                    <div className='space-y-2'>
                      <Label htmlFor='id' className='text-gray-700 font-medium'>
                        DNI/NIE/Pasaporte{" "}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <Input
                        type='text'
                        id='id'
                        name='id'
                        placeholder='Introduce tu identificador'
                        required
                        value={formData.id}
                        onChange={handleChange}
                        className='bg-white border-gray-300 focus:border-primary transition-all shadow-sm'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='email'
                        className='text-gray-700 font-medium'>
                        Email <span className='text-red-500'>*</span>
                      </Label>
                      <Input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='ejemplo@correo.com'
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className='bg-white border-gray-300 focus:border-primary transition-all shadow-sm'
                      />
                      {emailError && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className='mt-1 text-xs text-red-600'>
                          {emailError}
                        </motion.p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='password'
                        className='text-gray-700 font-medium'>
                        Contraseña <span className='text-red-500'>*</span>
                      </Label>
                      <div className='relative'>
                        <Input
                          type={showPassword ? "text" : "password"}
                          id='password'
                          name='password'
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className='bg-white border-gray-300 focus:border-primary transition-all shadow-sm pr-10'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1'
                          aria-label='Toggle password visibility'>
                          {showPassword ? (
                            <EyeOff className='w-5 h-5' />
                          ) : (
                            <Eye className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='confirmPassword'
                        className='text-gray-700 font-medium'>
                        Repite la contraseña{" "}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <div className='relative'>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          id='confirmPassword'
                          name='confirmPassword'
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className='bg-white border-gray-300 focus:border-primary transition-all shadow-sm pr-10'
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1'
                          aria-label='Toggle confirm password visibility'>
                          {showConfirmPassword ? (
                            <EyeOff className='w-5 h-5' />
                          ) : (
                            <Eye className='w-5 h-5' />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <h2 className='text-xl font-semibold mb-5 text-gray-700'>
                      Paso 2: Datos Personales
                    </h2>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='firstName'
                        className='text-gray-700 font-medium'>
                        Nombre <span className='text-red-500'>*</span>
                      </Label>
                      <Input
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className='bg-white border-gray-300 focus:border-primary transition-all shadow-sm'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='lastName'
                        className='text-gray-700 font-medium'>
                        Apellidos <span className='text-red-500'>*</span>
                      </Label>
                      <Input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className='bg-white border-gray-300 focus:border-primary transition-all shadow-sm'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='phone'
                        className='text-gray-700 font-medium'>
                        Teléfono (+34) <span className='text-red-500'>*</span>
                      </Label>
                      <Input
                        type='text'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='6XX XXX XXX'
                        required
                        className='bg-white border-gray-300 focus:border-primary transition-all shadow-sm'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='professionalCategory'
                        className='text-gray-700 font-medium'>
                        Categoría profesional{" "}
                        <span className='text-red-500'>*</span>
                      </Label>
                      <div className='relative'>
                        <select
                          id='professionalCategory'
                          name='professionalCategory'
                          value={formData.professionalCategory}
                          onChange={handleChange}
                          required
                          className='w-full border border-gray-300 rounded-md p-2.5 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm appearance-none pr-8'>
                          <option value=''>Selecciona tu categoría</option>
                          {professionalCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.nombre}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none' />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='gender'
                        className='text-gray-700 font-medium'>
                        Género
                      </Label>
                      <div className='relative'>
                        <select
                          id='gender'
                          name='gender'
                          value={formData.gender}
                          onChange={handleChange}
                          className='w-full border border-gray-300 rounded-md p-2.5 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm appearance-none pr-8'>
                          <option value=''>Selecciona tu género</option>
                          <option value='M'>Masculino</option>
                          <option value='F'>Femenino</option>
                          <option value='Otro'>Otro</option>
                        </select>
                        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none' />
                      </div>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h2 className='text-xl font-semibold mb-5 text-gray-700'>
                      Paso 3: Ubicación y Términos
                    </h2>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='country'
                        className='text-gray-700 font-medium'>
                        País <span className='text-red-500'>*</span>
                      </Label>
                      <div className='relative'>
                        <select
                          id='country'
                          name='country'
                          required
                          value={formData.country}
                          onChange={handleChange}
                          className='w-full border border-gray-300 rounded-md p-2.5 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm appearance-none pr-8'>
                          <option value='España'>España</option>
                          <option value='Otros'>Otros</option>
                        </select>
                        <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none' />
                      </div>
                    </div>
                    {formData.country === "España" && (
                      <div className='space-y-2'>
                        <Label
                          htmlFor='autonomousCommunity'
                          className='text-gray-700 font-medium'>
                          Comunidades Autónomas (elige en las que quieras
                          publicar)
                        </Label>
                        <MultiSelect
                          options={communityOptions}
                          value={formData.autonomousCommunity}
                          onChange={handleCommunityChange}
                          placeholder='Selecciona comunidades autónomas...'
                          searchPlaceholder='Buscar comunidades...'
                        />
                      </div>
                    )}
                    <div className='items-top flex space-x-2 mt-4 pt-2 border-t'>
                      <input
                        type='checkbox'
                        id='termsAccepted'
                        name='termsAccepted'
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className='h-4 w-4 accent-primary mt-1'
                      />
                      <div className='grid gap-1.5 leading-none'>
                        <label
                          htmlFor='termsAccepted'
                          className='text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                          Acepto los{" "}
                          <button
                            type='button'
                            onClick={() => setShowTermsModal(true)}
                            className='text-primary underline hover:text-primary/80'>
                            Términos y Condiciones
                          </button>{" "}
                          <span className='text-red-500'>*</span>
                        </label>
                        {!termsAccepted && step === 2 && (
                          <p className='text-xs text-red-500'>
                            Debes aceptar los términos para continuar.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className='items-top flex space-x-2 mt-3'>
                      <input
                        type='checkbox'
                        id='infoAccepted'
                        name='infoAccepted'
                        checked={infoAccepted}
                        onChange={(e) => setInfoAccepted(e.target.checked)}
                        className='h-4 w-4 accent-primary mt-1'
                      />
                      <label
                        htmlFor='infoAccepted'
                        className='text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                        Acepto el envío de comunicaciones y promociones por
                        parte de la plataforma
                      </label>
                    </div>
                  </>
                )}

                {message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-2 text-center text-sm text-red-600 bg-red-50 p-2 rounded-md'>
                    {message}
                  </motion.p>
                )}

                <div
                  className={`flex mt-8 ${
                    step === 0 ? "justify-end" : "justify-between"
                  }`}>
                  {step > 0 && (
                    <Button
                      variant='outline'
                      onClick={handleBack}
                      className='border-primary text-primary hover:bg-primary/10'>
                      <ArrowLeft className='mr-2 h-4 w-4' /> Anterior
                    </Button>
                  )}
                  {step < 2 && (
                    <Button
                      onClick={handleNext}
                      className='ml-auto bg-primary hover:bg-primary/90 text-white'>
                      Siguiente <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  )}
                  {step === 2 && (
                    <Button
                      type='submit'
                      disabled={isLoading || !termsAccepted}
                      className='ml-auto bg-green-600 hover:bg-green-700 text-white disabled:opacity-70'>
                      {isLoading ? (
                        <span className='flex items-center'>
                          <Loader2 className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' />
                          Procesando...
                        </span>
                      ) : (
                        <span className='flex items-center'>
                          Finalizar Registro{" "}
                          <UserPlus className='ml-2 h-4 w-4' />
                        </span>
                      )}
                    </Button>
                  )}
                </div>
              </form>

              <div className='mt-8 text-center'>
                <p className='text-sm text-gray-600'>
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href='/login'
                    className='text-primary hover:text-primary/80 font-medium hover:underline'>
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4 backdrop-blur-sm'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-auto relative max-h-[90vh] flex flex-col'>
              <div className='flex justify-between items-center p-4 border-b'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Términos y Condiciones
                </h2>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setShowTermsModal(false)}
                  className='text-gray-500 hover:text-gray-800'>
                  <X className='h-5 w-5' />
                </Button>
              </div>
              <div className='overflow-y-auto flex-grow'>
                <TermsAndConditions />
              </div>
              <div className='p-4 border-t flex justify-end'>
                <Button
                  onClick={() => {
                    setTermsAccepted(true);
                    setShowTermsModal(false);
                  }}
                  className='bg-primary hover:bg-primary/90 text-white'>
                  Aceptar Términos
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
