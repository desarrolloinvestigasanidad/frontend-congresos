"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface ImageButton {
  id: number;
  label: string;
  href: string;
  shape: "rectangle" | "circle" | "polygon";
  coordinates: Point[];
  variant: "primary" | "secondary" | "accent" | "outline";
  active: boolean;
  showLabel: boolean;
  labelPosition: "center" | "top" | "bottom" | "left" | "right";
}

interface PlatformConfig {
  heroImage: string;
  title: string;
  subtitle: string;
  buttons: ImageButton[];
}

interface ButtonPreviewProps {
  config: PlatformConfig;
}

export default function ButtonPreview({ config }: ButtonPreviewProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const getButtonVariant = (v: string) => {
    switch (v) {
      case "primary":
        return "default";
      case "secondary":
        return "secondary";
      case "accent":
        return "destructive";
      case "outline":
        return "outline";
      default:
        return "default";
    }
  };

  const getShapeCenter = (b: ImageButton): Point => {
    const c = b.coordinates;
    if (b.shape === "rectangle") {
      const [tl, br] = c;
      return { x: (tl.x + br.x) / 2, y: (tl.y + br.y) / 2 };
    }
    if (b.shape === "circle") return c[0];
    const sum = c.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), {
      x: 0,
      y: 0,
    });
    return { x: sum.x / c.length, y: sum.y / c.length };
  };

  const renderArea = (b: ImageButton) => {
    const c = b.coordinates;
    const common = {
      key: b.id,
      onMouseEnter: () => setHovered(b.id),
      onMouseLeave: () => setHovered(null),
      className: cn(
        "absolute block cursor-pointer transition-all duration-300",
        hovered === b.id
          ? "bg-primary/20"
          : "bg-transparent hover:bg-primary/10"
      ),
      href: b.href as string,
    };

    if (b.shape === "rectangle") {
      const [tl, br] = c;
      return (
        <Link
          {...common}
          style={{
            left: `${tl.x}%`,
            top: `${tl.y}%`,
            width: `${br.x - tl.x}%`,
            height: `${br.y - tl.y}%`,
          }}
        />
      );
    }

    if (b.shape === "circle") {
      const [center, edge] = c;
      const rx = Math.abs(edge.x - center.x),
        ry = Math.abs(edge.y - center.y);
      return (
        <Link
          {...common}
          style={{
            left: `${center.x - rx}%`,
            top: `${center.y - ry}%`,
            width: `${2 * rx}%`,
            height: `${2 * ry}%`,
            borderRadius: "50%",
          }}
        />
      );
    }

    // polygon
    const path =
      c.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
    return (
      <Link {...common} className='absolute block inset-0 w-full h-full'>
        <svg
          className='w-full h-full cursor-pointer'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'>
          <path
            d={path}
            fill={hovered === b.id ? "rgba(59,130,246,0.2)" : "transparent"}
            className='hover:fill-primary/10 transition-all duration-300'
          />
        </svg>
      </Link>
    );
  };

  return (
    <div className='fixed inset-0 z-10'>
      <div className='absolute inset-0 overflow-hidden'>
        {config.heroImage && (
          <Image
            src={config.heroImage}
            alt='Background'
            fill
            className='object-cover'
            priority
          />
        )}
        {/* Overlay solo para oscurecer, sin capturar clicks */}
        <div className='absolute inset-0 bg-black/10 pointer-events-none' />

        {/* Zonas clicables */}
        {config.buttons.map((b) => b.active && renderArea(b))}

        {/* Etiquetas como Links */}
        {config.buttons.map((b) => {
          if (!b.active || !b.showLabel) return null;
          const c = getShapeCenter(b);
          let style: React.CSSProperties = {};
          switch (b.labelPosition) {
            case "center":
              style = {
                left: `${c.x}%`,
                top: `${c.y}%`,
                transform: "translate(-50%, -50%)",
              };
              break;
            case "top":
              style = {
                left: `${c.x}%`,
                top: `${c.y - 10}%`,
                transform: "translate(-50%, -100%)",
              };
              break;
            case "bottom":
              style = {
                left: `${c.x}%`,
                top: `${c.y + 10}%`,
                transform: "translate(-50%, 0)",
              };
              break;
            case "left":
              style = {
                left: `${c.x - 10}%`,
                top: `${c.y}%`,
                transform: "translate(-100%, -50%)",
              };
              break;
            case "right":
              style = {
                left: `${c.x + 10}%`,
                top: `${c.y}%`,
                transform: "translate(0, -50%)",
              };
              break;
          }
          return (
            <Link
              key={`label-${b.id}`}
              href={b.href as string}
              onMouseEnter={() => setHovered(b.id)}
              onMouseLeave={() => setHovered(null)}
              className='absolute flex items-center justify-center transition-transform duration-300'
              style={{
                ...style,
                transform:
                  hovered === b.id
                    ? `${style.transform} scale(1.05)`
                    : style.transform,
              }}>
              <Button
                variant={getButtonVariant(b.variant)}
                size='lg'
                className='shadow-lg hover:shadow-xl'>
                {b.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
