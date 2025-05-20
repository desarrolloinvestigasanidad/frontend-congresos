"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.getBoundingClientRect().top
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Check if section is in viewport
      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        const scrollPosition = sectionTop / windowHeight

        // Apply parallax effect to each element
        elementsRef.current.forEach((element, index) => {
          if (!element) return

          const speed = index % 2 === 0 ? 0.2 : -0.2
          const yPos = scrollPosition * speed * 100
          element.style.transform = `translateY(${yPos}px)`
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-background to-primary/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">Próximos Congresos</h2>
          <p className="mt-4 text-muted-foreground md:text-xl">Descubra los próximos eventos y reserve su plaza</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              ref={(el) => (elementsRef.current[index] = el)}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              <div className="relative h-48">
                <Image
                  src={`/placeholder.svg?height=400&width=600&query=medical conference event ${index + 1}`}
                  alt={`Congreso ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-primary mb-2">
                  {["15-17 Junio, 2025", "22-24 Julio, 2025", "10-12 Septiembre, 2025"][index]}
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {
                    ["Congreso Internacional de Cardiología", "Avances en Neurología", "Simposio de Medicina Interna"][
                      index
                    ]
                  }
                </h3>
                <p className="text-muted-foreground mb-4">
                  {["Madrid, España", "Barcelona, España", "Valencia, España"][index]}
                </p>
                <Button className="w-full">Más información</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 blur-3xl" />
    </section>
  )
}
