"use client"

import { useEffect, useRef } from "react"

export default function BackgroundPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      draw()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create wave pattern
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#f0f9ff")
      gradient.addColorStop(1, "#e0f2fe")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      const waves = [
        { color: "rgba(59, 130, 246, 0.05)", amplitude: 50, frequency: 0.005, speed: 0.0005 },
        { color: "rgba(59, 130, 246, 0.07)", amplitude: 30, frequency: 0.01, speed: 0.001 },
        { color: "rgba(59, 130, 246, 0.03)", amplitude: 70, frequency: 0.002, speed: 0.0008 },
      ]

      const time = Date.now()

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude + canvas.height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        ctx.fillStyle = wave.color
        ctx.fill()
      })
    }

    // Animation loop
    let animationId: number
    function animate() {
      draw()
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}
