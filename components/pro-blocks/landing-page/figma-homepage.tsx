"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ChevronDown, ChevronRight, BookOpen, Users, Award, Library } from "lucide-react";
import { useState } from "react";
import { useLeadModal } from "@/components/context/LeadModalContext";
import { motion, MotionButton, ScrollReveal } from "@/components/ui/motion";

const HERO_IMAGES = [
  { src: "/images/hero-1.png", caption: "Juntas directivas", alt: "Reunión de junta directiva" },
  { src: "/images/hero-2.png", caption: "Comités", alt: "Participantes en comité" },
  { src: "/images/hero-3.png", caption: "Cooperativas", alt: "Reunión cooperativa" },
  { src: "/images/hero-4.png", caption: "Administración", alt: "Equipo en reunión de trabajo" },
];

const HERO_BENEFITS = [
  "Prueba gratis 30 días",
  "Formación en vivo",
  "Soporte en español",
];

const HERO_CAPTION_LINKS = [
  "Juntas directivas",
  "Comités",
  "Cooperativas",
  "Administración pública",
  "Educación",
  "Empresas",
  "Asociaciones",
  "Clínicas",
];

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "¿Cuánto tarda en generar un acta?",
    answer:
      "Normalmente en menos de 2 minutos. Subes el audio o pegas la transcripción, Noah estructura la información con IA y obtienes un acta formal lista para compartir.",
  },
  {
    question: "¿Puedo subir audio en español?",
    answer: "Sí. Noah está preparado para transcripción y redacción en español. Soporta reuniones largas y varios formatos de audio.",
  },
  {
    question: "¿Qué planes hay y cuánto cuestan?",
    answer:
      "Tenemos plan Gratis (hasta 5 actas/mes), Pro (actas ilimitadas y más funciones) y Enterprise a medida. Los precios están en la sección de precios.",
  },
  {
    question: "¿Puedo probar Noah sin compromiso?",
    answer: "Sí. Tienes 30 días de prueba gratis en los planes de pago. Sin tarjeta para el plan Gratis.",
  },
];

export function FigmaHomepage() {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const { openModal } = useLeadModal();

  return (
    <main
      className="min-h-full"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      {/* Hero Section — Figma 0:124 */}
      <section
        className="mx-auto flex max-w-[1230px] flex-col items-center px-6 pb-16 pt-[60px] text-center md:pb-20"
        style={{
          paddingTop: "60px",
          paddingBottom: "var(--space-16)",
          gap: "75px",
        }}
      >
        <div
          className="flex w-full max-w-[720px] flex-col items-center gap-8"
          style={{ gap: "var(--space-8)" }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.p
              className="text-center"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--weight-medium)",
                fontSize: "var(--text-hero-label)",
                lineHeight: "var(--leading-nav)",
                color: "var(--color-hero-label)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Software de actas
            </motion.p>
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1
                className="text-center md:whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--weight-bold)",
                  fontSize: "var(--text-hero-display)",
                  lineHeight: "var(--leading-hero-display)",
                  letterSpacing: "var(--tracking-hero-display)",
                  color: "var(--color-hero-heading)",
                }}
              >
                <span className="block md:inline">De reunión a acta</span>{" "}
                <span className="block md:inline">profesional en minutos</span>
              </h1>
              <p
                className="mx-auto max-w-[720px] text-center"
                style={{
                  fontFamily: "var(--font-heading-2)",
                  fontWeight: "var(--weight-regular)",
                  fontSize: "var(--text-hero-subtitle)",
                  lineHeight: "var(--leading-hero-subtitle)",
                  letterSpacing: "var(--tracking-hero-subtitle)",
                  color: "var(--color-hero-subtitle)",
                }}
              >
                Sube el audio de tu reunión o pega la transcripción. Memora usa
                IA para estructurar automáticamente toda la información en un
                acta formal lista para compartir.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MotionButton
              type="button"
              onClick={openModal}
              className="inline-flex h-[38px] items-center justify-center rounded px-4 font-medium text-white transition-opacity hover:opacity-95"
              style={{
                backgroundColor: "var(--color-primary-dark)",
                fontSize: "var(--text-nav)",
                lineHeight: "var(--leading-nav)",
                fontFamily: "var(--font-body)",
              }}
            >
              Solicitar acceso
            </MotionButton>
            <div
              className="flex flex-wrap items-center justify-center gap-6"
              style={{ gap: "var(--space-6)" }}
            >
              {HERO_BENEFITS.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--weight-regular)",
                    fontSize: "12.9px",
                    lineHeight: "18.75px",
                    color: "rgba(6, 29, 2, 0.68)",
                  }}
                >
                  <Check className="size-4 shrink-0" aria-hidden />
                  {benefit}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex w-full flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="grid grid-cols-2 gap-0 overflow-hidden rounded md:grid-cols-4"
            style={{ borderRadius: "var(--radius-sm)" }}
          >
            {HERO_IMAGES.map((item) => (
              <figure key={item.caption} className="relative aspect-[301/383] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority
                />
              </figure>
            ))}
          </div>
          <div
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: "var(--weight-bold)",
              fontSize: "var(--text-hero-caption)",
              letterSpacing: "var(--tracking-hero-caption)",
              color: "var(--color-hero-caption)",
              textTransform: "uppercase",
            }}
          >
            {HERO_CAPTION_LINKS.map((label, i) => (
              <span key={label} className="inline-flex items-center">
                {i > 0 && (
                  <span
                    className="mx-1"
                    style={{ color: "var(--color-hero-caption-dot)" }}
                    aria-hidden
                  >
                    ·
                  </span>
                )}
                <Link href="/#producto" className="hover:underline">
                  {label}
                </Link>
              </span>
            ))}
          </div>
          <div
            className="h-px shrink-0 w-full border-t border-dashed opacity-80"
            style={{ borderColor: "rgba(96, 60, 10, 0.22)" }}
            aria-hidden
          />
        </motion.div>
      </section>

      {/* Product Showcase + Features + CTA — Figma 0:200 (una sola sección oscura) */}
      <section
        id="producto"
        className="py-16 md:py-[90px]"
        style={{
          backgroundColor: "var(--color-section-dark-bg)",
          color: "var(--color-section-dark-text)",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-16)",
          scrollMarginTop: 86,
        }}
      >
        <ScrollReveal
          className="mx-auto flex max-w-[1230px] flex-col gap-[60px] px-6 md:px-8"
          style={{
            gap: "60px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          {/* Header: label + title */}
          <div className="flex flex-col items-center gap-6 text-center">
            <span
              className="rounded px-2 py-1 text-[11.3px] font-medium uppercase tracking-[1.125px]"
              style={{
                backgroundColor: "rgba(113, 72, 13, 0.12)",
                color: "var(--color-section-dark-text)",
              }}
            >
              Product
            </span>
            <h2
              className="max-w-4xl text-3xl font-bold tracking-[-1.5px] md:whitespace-nowrap md:text-[42px] md:leading-tight"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-section-dark-text)",
              }}
            >
              Redactar acta nunca ha sido tan fácil
            </h2>
          </div>

          {/* Mockup */}
          <div className="relative mx-auto w-full max-w-[960px]">
            <Image
              src="/images/product-showcase-mockup.png"
              alt="Vista del producto en ordenador y móvil"
              width={960}
              height={533}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 960px"
            />
          </div>

          {/* 4 feature blocks */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "1", title: "Sube tu audio o texto", desc: "Transcribe o pega la transcripción de tu reunión." },
              { num: "2", title: "IA estructura el contenido", desc: "Organizamos puntos, acuerdos y tareas automáticamente." },
              { num: "3", title: "Revisa y edita", desc: "Ajusta el borrador antes de generar el documento final." },
              { num: "4", title: "Descarga el acta", desc: "Obtén un PDF profesional listo para compartir." },
            ].map((f) => (
              <div key={f.num} className="flex flex-col gap-2">
                <span
                  className="text-3xl font-bold md:text-4xl"
                  style={{ fontFamily: "var(--font-body)", color: "var(--color-section-dark-text)" }}
                >
                  {f.num}
                </span>
                <h3
                  className="text-lg font-medium"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-nav)",
                    lineHeight: "var(--leading-nav)",
                    color: "var(--color-section-dark-text)",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[13.1px] leading-[19.69px] opacity-90"
                  style={{
                    fontFamily: "var(--font-heading-2)",
                    color: "var(--color-section-dark-text)",
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA final — Figma 7:2 */}
          <div
            className="flex w-full flex-col items-stretch gap-4 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            style={{
              backgroundColor: "var(--color-cta-bar-bg)",
              borderRadius: "7.5px",
              padding: "30px",
            }}
          >
            <p
              className="font-medium"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "24.6px",
                lineHeight: "33.75px",
                letterSpacing: "0.15px",
                color: "var(--color-cta-bar-text)",
              }}
            >
              Empieza con Noah.
            </p>
            <MotionButton
              type="button"
              onClick={openModal}
              className="shrink-0 rounded-lg font-medium transition-opacity hover:opacity-95"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--color-primary-dark)",
                color: "var(--color-cta-bar-bg)",
                fontSize: "14.8px",
                lineHeight: "22.5px",
                borderRadius: "3.75px",
                paddingTop: "6.5px",
                paddingBottom: "8px",
                paddingLeft: "15px",
                paddingRight: "15px",
                minHeight: "37.5px",
              }}
            >
              Hablar con un experto
            </MotionButton>
          </div>
        </ScrollReveal>
      </section>

      {/* Partners — Figma 0:311 */}
      <section
        className="py-16 md:py-[90px]"
        style={{
          backgroundColor: "var(--color-bg-cream)",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-16)",
        }}
      >
        <ScrollReveal
          className="mx-auto flex max-w-[1230px] flex-col gap-[60px] px-6 md:px-8"
          style={{
            gap: "60px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          {/* Header: label + title */}
          <div className="flex flex-col items-center gap-6 text-center">
            <span
              className="rounded px-2 py-1 text-[11.3px] font-medium uppercase tracking-[1.125px]"
              style={{
                backgroundColor: "rgba(113, 72, 13, 0.12)",
                color: "var(--color-partners-text)",
              }}
            >
              Recursos gratuitos
            </span>
            <h2
              className="max-w-4xl text-3xl font-bold tracking-[-1.5px] md:whitespace-nowrap md:text-[38px] md:leading-tight"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-partners-text)",
              }}
            >
              Un partner fiable más allá de la pantalla.
            </h2>
          </div>

          {/* 4 cards */}
          <div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "30px" }}
          >
            {[
              {
                icon: BookOpen,
                title: "Formación Noah",
                desc: "Lecciones prácticas para redactar actas de reunión de forma clara y profesional.",
              },
              {
                icon: Users,
                title: "Comunidad Noah",
                desc: "Comparte experiencias y consejos con otros equipos que ya usan actas con IA.",
              },
              {
                icon: Award,
                title: "Asesores certificados",
                desc: "Para secretarios y gestores que quieran mejorar sus actas y ahorrar tiempo.",
              },
              {
                icon: Library,
                title: "Guías y plantillas",
                desc: "Plantillas de actas, guías de buenas prácticas y ejemplos listos para usar.",
              },
            ].map((card) => (
              <MotionButton
                key={card.title}
                type="button"
                onClick={openModal}
                className="flex w-full flex-col gap-3 rounded-lg p-6 text-left transition-opacity hover:opacity-95"
                style={{
                  backgroundColor: "var(--color-partners-card-bg)",
                  borderRadius: "3.75px",
                  padding: "22.5px",
                }}
              >
                <card.icon
                  className="size-[22.5px] shrink-0"
                  style={{ color: "var(--color-partners-text)" }}
                  aria-hidden
                />
                <div className="flex flex-col gap-1">
                  <h3
                    className="font-medium"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-nav)",
                      lineHeight: "var(--leading-nav)",
                      color: "var(--color-partners-text)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[13.1px] leading-[19.69px]"
                    style={{
                      fontFamily: "var(--font-heading-2)",
                      color: "var(--color-partners-text)",
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </MotionButton>
            ))}
          </div>

          {/* CTA bar — Figma 0:358 */}
          <div
            className="flex flex-col items-center justify-between gap-4 rounded-lg p-6 md:flex-row"
            style={{
              backgroundColor: "var(--color-primary-dark)",
              borderRadius: "7.5px",
              padding: "30px",
            }}
          >
            <span
              className="font-medium text-white"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "24.6px",
                lineHeight: "33.75px",
                letterSpacing: "0.15px",
              }}
            >
              Sácale más partido a Noah.
            </span>
            <MotionButton
              type="button"
              onClick={openModal}
              className="inline-flex h-[38px] items-center justify-center rounded px-4 font-medium transition-opacity hover:opacity-95"
              style={{
                backgroundColor: "var(--color-cta-bar-bg)",
                color: "var(--color-cta-bar-text)",
                borderRadius: "3.75px",
                fontSize: "14.8px",
                lineHeight: "22.5px",
              }}
            >
              Pedir información
            </MotionButton>
          </div>
        </ScrollReveal>
      </section>

      {/* Precios — Figma 3:12 */}
      <section
        id="precios"
        className="py-16 md:py-[90px]"
        style={{
          backgroundColor: "var(--color-bg-cream)",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-16)",
          scrollMarginTop: 86,
        }}
      >
        <ScrollReveal className="mx-auto flex max-w-[1170px] flex-col items-center gap-[40px] px-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-6 text-center">
            <span
              className="rounded px-2 py-1 text-[11.3px] font-medium uppercase tracking-[1.125px]"
              style={{
                backgroundColor: "rgba(113, 72, 13, 0.12)",
                color: "var(--color-partners-text)",
              }}
            >
              Precios
            </span>
            <h2
              className="max-w-4xl text-3xl font-bold tracking-[-1.5px] md:whitespace-nowrap md:text-[44px] md:leading-tight"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-partners-text)",
              }}
            >
              Planes a medida para tu equipo.
            </h2>
          </div>

          {/* Limited Time Offer */}
          <p
            className="text-center text-[17.2px] font-medium"
            style={{
              color: "var(--color-pricing-green)",
              lineHeight: "26.25px",
              letterSpacing: "0.15px",
            }}
          >
            Oferta limitada: 50% en tus primeros 3 meses
          </p>

          {/* 3 cards */}
          <div className="grid w-full max-w-5xl gap-4 md:grid-cols-3 md:gap-5">
            {/* Básico */}
            <div
              className="flex flex-col rounded-lg border-0 bg-white p-4"
              style={{
                borderRadius: "7.5px",
                padding: "16px",
              }}
            >
              <div className="mb-4">
                <h3
                  className="text-[24.9px] font-medium leading-[33.75px] tracking-[0.15px]"
                  style={{ color: "var(--color-partners-text)" }}
                >
                  Básico
                </h3>
                <p className="text-[12.8px] leading-[18.75px]" style={{ color: "var(--color-partners-text)" }}>
                  Para empezar con actas de reunión
                </p>
                <p className="mt-2 text-[37.5px] font-bold leading-[45px] tracking-[-0.45px]" style={{ color: "var(--color-pricing-green)" }}>
                  Gratis
                </p>
                <p className="text-[10.9px]" style={{ color: "var(--color-pricing-muted)" }}>
                  para siempre
                </p>
                <p className="mt-1 text-[13.1px]" style={{ color: "var(--color-pricing-muted)" }}>
                  Hasta 5 actas al mes · Transcripción con IA
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <MotionButton
                  type="button"
                  onClick={openModal}
                  className="flex h-[45px] items-center justify-center rounded-lg font-medium text-white transition-opacity hover:opacity-95"
                  style={{
                    backgroundColor: "rgba(10, 78, 2, 0.74)",
                    fontSize: "14.9px",
                    lineHeight: "22.5px",
                  }}
                >
                  Solicitar acceso
                </MotionButton>
                <MotionButton
                  type="button"
                  onClick={openModal}
                  className="flex h-[45px] items-center justify-center rounded-lg font-medium transition-opacity hover:opacity-95"
                  style={{
                    backgroundColor: "rgba(113, 72, 13, 0.12)",
                    color: "var(--color-hero-heading)",
                    fontSize: "14.6px",
                  }}
                >
                  Pedir información
                </MotionButton>
              </div>
              <ul className="mt-4 flex flex-col gap-2 pt-2">
                {["Hasta 5 actas al mes", "Transcripción de audio con IA", "Exportar a PDF"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12.8px] leading-[18.75px]" style={{ color: "var(--color-partners-text)" }}>
                    <Check className="size-[15px] shrink-0" style={{ color: "var(--color-pricing-green)" }} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro — Más popular */}
            <div
              className="relative flex flex-col rounded-lg border-0 bg-white p-4 shadow-md"
              style={{
                borderRadius: "7.5px",
                padding: "16px",
              }}
            >
              <div
                className="absolute left-0 right-0 top-0 flex h-[30px] items-center justify-center rounded-t-lg text-[9.4px] font-medium uppercase tracking-wide text-white"
                style={{ backgroundColor: "var(--color-pricing-green)" }}
              >
                Más popular
              </div>
              <div className="mb-4 pt-8">
                <h3
                  className="text-[24.7px] font-medium leading-[33.75px] tracking-[0.15px]"
                  style={{ color: "var(--color-partners-text)" }}
                >
                  Pro
                </h3>
                <p className="text-[12.7px] leading-[18.75px]" style={{ color: "var(--color-partners-text)" }}>
                  Para equipos que redactan muchas actas
                </p>
                <p className="mt-2 text-[37.5px] font-bold leading-[45px] tracking-[-0.45px]" style={{ color: "var(--color-pricing-green)" }}>
                  49€
                </p>
                <p className="text-[10.9px]" style={{ color: "var(--color-pricing-muted)" }}>
                  por mes
                </p>
                <p className="mt-1 text-[13.1px]" style={{ color: "var(--color-pricing-muted)" }}>
                  <span className="line-through">Antes 99€/mes</span> · <span style={{ color: "var(--color-pricing-green)" }}>Ahorra 50%</span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <MotionButton
                  type="button"
                  onClick={openModal}
                  className="flex h-[45px] items-center justify-center rounded-lg font-medium text-white transition-opacity hover:opacity-95"
                  style={{
                    backgroundColor: "var(--color-pricing-green-dark)",
                    fontSize: "14.9px",
                  }}
                >
                  Pedir información
                </MotionButton>
                <MotionButton
                  type="button"
                  onClick={openModal}
                  className="flex h-[45px] items-center justify-center rounded-lg font-medium transition-opacity hover:opacity-95"
                  style={{
                    backgroundColor: "var(--color-pricing-secondary-btn-bg)",
                    color: "var(--color-hero-heading)",
                    fontSize: "14.6px",
                  }}
                >
                  Solicitar acceso
                </MotionButton>
              </div>
              <ul className="mt-4 flex flex-col gap-2 pt-2">
                {["Actas ilimitadas", "Transcripción de audio con IA", "Plantillas personalizadas", "Soporte prioritario"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12.8px] leading-[18.75px]" style={{ color: "var(--color-partners-text)" }}>
                    <Check className="size-[15px] shrink-0" style={{ color: "var(--color-pricing-green)" }} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicio completo */}
            <div
              className="relative flex flex-col rounded-lg border bg-white p-4"
              style={{
                borderColor: "var(--color-pricing-card-border)",
                borderRadius: "7.5px",
                padding: "16px",
              }}
            >
              <div
                className="absolute left-0 right-0 top-0 flex h-[30px] items-center justify-center rounded-t-lg text-[9.4px] font-medium uppercase tracking-wide text-white"
                style={{ backgroundColor: "var(--color-primary-dark)" }}
              >
                Con soporte dedicado
              </div>
              <div className="mb-4 pt-8">
                <h3
                  className="text-[24.7px] font-medium leading-[33.75px]"
                  style={{ color: "var(--color-partners-text)" }}
                >
                  Servicio completo
                </h3>
                <p className="text-[12.8px] leading-[18.75px]" style={{ color: "var(--color-partners-text)" }}>
                  Para organizaciones con muchas reuniones
                </p>
                <p className="mt-2 text-[28px] font-bold" style={{ color: "var(--color-partners-text)" }}>
                  A medida
                </p>
                <p className="mt-1 text-[13.1px]" style={{ color: "var(--color-pricing-muted)" }}>
                  Habla con nosotros para un presupuesto personalizado
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <MotionButton
                  type="button"
                  onClick={openModal}
                  className="flex h-[45px] items-center justify-center rounded-lg font-medium text-white transition-opacity hover:opacity-95"
                  style={{
                    backgroundColor: "var(--color-primary-dark)",
                    fontSize: "14.9px",
                  }}
                >
                  Pedir una demo
                </MotionButton>
                <MotionButton
                  type="button"
                  onClick={openModal}
                  className="flex h-[45px] items-center justify-center gap-1 rounded-lg font-medium transition-opacity hover:opacity-95"
                  style={{
                    backgroundColor: "var(--color-pricing-secondary-btn-bg)",
                    color: "var(--color-hero-heading)",
                    fontSize: "14.6px",
                  }}
                >
                  Hablar con nosotros
                  <ChevronRight className="size-4" aria-hidden />
                </MotionButton>
              </div>
              <ul className="mt-4 flex flex-col gap-2 pt-2">
                {["Todo lo de Pro", "Soporte por teléfono y videollamada", "Onboarding y formación a medida"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[12.8px] leading-[18.75px]" style={{ color: "var(--color-partners-text)" }}>
                    <Check className="size-[15px] shrink-0" style={{ color: "var(--color-pricing-green)" }} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer discount banner */}
          <div
            className="flex w-full max-w-5xl flex-col items-center justify-between gap-4 rounded-lg p-6 md:flex-row"
            style={{
              backgroundColor: "var(--color-pricing-secondary-btn-bg)",
              borderRadius: "7.5px",
              padding: "30px",
            }}
          >
            <div className="text-center md:text-left">
              <p className="font-semibold" style={{ color: "var(--color-partners-text)", fontSize: "var(--text-base)" }}>
                Descuento para tu organización
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-pricing-muted)" }}>
                Los miembros de organizaciones colaboradoras pueden obtener un descuento. Escríbenos para ser partner.
              </p>
            </div>
            <MotionButton
              type="button"
              onClick={openModal}
              className="shrink-0 rounded-lg px-6 py-3 font-medium text-white transition-opacity hover:opacity-95"
              style={{
                backgroundColor: "var(--color-primary-dark)",
                fontSize: "var(--text-nav)",
              }}
            >
              Contactar
            </MotionButton>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQ — Figma 0:679 */}
      <section
        id="faq"
        className="py-16 md:py-[90px]"
        style={{
          backgroundColor: "var(--color-bg-cream)",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-16)",
          scrollMarginTop: 86,
        }}
      >
        <ScrollReveal
          className="mx-auto flex max-w-[1230px] flex-col items-stretch gap-[60px] px-6"
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
        >
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="rounded-lg px-4 py-4 transition-colors"
                style={{
                  backgroundColor: "rgba(155, 93, 5, 0.08)",
                  borderRadius: "3.75px",
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-2 text-left"
                  onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    fontSize: "14.6px",
                    lineHeight: "22.5px",
                    color: "var(--color-partners-text)",
                  }}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className="size-5 shrink-0 transition-transform"
                    style={{
                      color: "var(--color-partners-text)",
                      transform: faqOpenIndex === index ? "rotate(180deg)" : "none",
                    }}
                    aria-hidden
                  />
                </button>
                {faqOpenIndex === index && (
                  <p
                    className="mt-3 border-t border-[var(--color-border-subtle)] pt-3 text-[14px] leading-[22px]"
                    style={{ color: "var(--color-partners-text)" }}
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* More questions CTA */}
          <div
            className="flex w-full flex-col items-center justify-between gap-4 rounded-lg p-6 md:flex-row md:px-8"
            style={{
              backgroundColor: "rgba(155, 93, 5, 0.08)",
              borderRadius: "7.5px",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <h3
              className="text-xl font-medium md:text-[24.9px]"
              style={{
                color: "var(--color-partners-text)",
                letterSpacing: "0.15px",
                lineHeight: "33.75px",
              }}
            >
              ¿Más preguntas?
            </h3>
            <MotionButton
              type="button"
              onClick={openModal}
              className="inline-flex h-[38px] items-center justify-center rounded-lg px-6 font-medium text-white transition-opacity hover:opacity-95"
              style={{
                backgroundColor: "var(--color-primary-dark)",
                fontSize: "var(--text-nav)",
                lineHeight: "22.5px",
                borderRadius: "3.75px",
              }}
            >
              Contactar
            </MotionButton>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
