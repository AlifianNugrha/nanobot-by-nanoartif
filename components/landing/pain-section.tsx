'use client'

import { useRef } from 'react'
import { Clock, TrendingDown, Zap, ShieldAlert } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const painPoints = [
  { icon: Clock, title: "Slow Response", desc: "Pelanggan menunggu terlalu lama, menyebabkan frustrasi." },
  { icon: TrendingDown, title: "Inconsistent Quality", desc: "Kualitas support naik turun tergantung mood staff." },
  { icon: Zap, title: "Staff Burnout", desc: "Tim support stress menghadapi pertanyaan berulang." },
  { icon: ShieldAlert, title: "Lost Opportunities", desc: "Lead potensial hilang karena tidak terlayani cepat." }
]

const PainCard = ({ point }: { point: typeof painPoints[0] }) => {
  const Icon = point.icon
  return (
    <div className="pain-card group relative p-[2px] rounded-2xl h-full overflow-hidden bg-gradient-to-br from-primary/80 via-primary/20 to-transparent">
      <div className="bg-card/90 backdrop-blur-md p-3 lg:p-6 rounded-[calc(1rem-1px)] h-full flex flex-col relative z-10">

        <div className="bg-primary/10 w-8 h-8 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-2 lg:mb-4 text-primary shrink-0 ring-1 ring-primary/20">
          <Icon className="w-4 h-4 lg:w-6 lg:h-6" />
        </div>

        <h3 className="text-xs lg:text-lg font-bold text-card-foreground mb-1 lg:mb-2 leading-tight">
          {point.title}
        </h3>

        <p className="text-muted-foreground text-[10px] lg:text-sm leading-relaxed">
          {point.desc}
        </p>
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  )
}

export default function PainSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 1024

    // Mencari card yang AKTIF saja (yang sedang tampil di layar)
    const cards = gsap.utils.toArray<HTMLElement>('.pain-card')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=150%" : "+=300%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    })

    // 1. Animasi Header
    tl.fromTo(headerRef.current,
      { opacity: 0, scale: 0.9, y: isMobile ? "15vh" : "30vh" },
      { opacity: 1, scale: 1.1, y: isMobile ? "15vh" : "30vh", duration: 1 }
    )
    tl.to(headerRef.current, { y: 0, scale: 1, duration: 1, ease: "power3.inOut" })

    // 2. Animasi Gambar
    tl.fromTo(imageRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    )

    // 3. Animasi Cards (Stagger)
    if (cards.length > 0) {
      tl.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)"
        },
        "-=0.5"
      )
    }

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="bg-secondary relative overflow-hidden min-h-screen">

      {/* LAYER BACKGROUND BARU - Hanya dekorasi visual di belakang */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid pattern yang lebih tegas sesuai permintaan sebelumnya */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

        {/* Cahaya ambient di pojok agar tidak flat */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <section className="h-screen w-full flex flex-col relative z-10">
        <div className="max-w-6xl mx-auto w-full px-4 lg:px-6 relative flex flex-col h-full">

          {/* Header */}
          <div ref={headerRef} className="text-center z-50 relative pt-10 lg:pt-30">
            <h2 className="text-xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-br from-[#01D2B3] via-[#01D2B3] to-[#65F5DF] bg-clip-text text-transparent">
              Apakah Tim Support Anda Kewalahan?
            </h2>
            <p className="text-muted-foreground text-[10px] md:text-lg max-w-xl mx-auto px-4 relative">
              <span className="relative z-10">"Masalah klasik yang membunuh pertumbuhan bisnis"</span>
              {/* Gradient glow tipis di belakang teks p agar lebih estetik */}
              <span className="absolute inset-0 bg-primary/5 blur-2xl -z-10 rounded-full" />
            </p>
          </div>

          <div className="relative flex-1 flex flex-col justify-end items-center pb-8 lg:pb-12">

            {/* Desktop View Cards */}
            <div className="absolute inset-0 z-40 hidden lg:block pointer-events-none">
              <div className="absolute left-[10%] top-[10%] w-[240px] pointer-events-auto"><PainCard point={painPoints[0]} /></div>
              <div className="absolute right-[5%] top-[10%] w-[240px] pointer-events-auto"><PainCard point={painPoints[1]} /></div>
              <div className="absolute left-[-5%] bottom-[19%] w-[240px] pointer-events-auto"><PainCard point={painPoints[2]} /></div>
              <div className="absolute right-[-5%] bottom-[22%] w-[240px] pointer-events-auto"><PainCard point={painPoints[3]} /></div>
            </div>

            {/* Gambar Utama */}
            <div className="relative z-10 w-full max-w-[180px] lg:max-w-[700px] flex items-end justify-center mb-6 lg:mb-0">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary/20 rounded-full blur-[40px] -z-10" />
              <img
                ref={imageRef}
                src="/orangpusing.png"
                alt="Support Stress"
                className="w-full h-auto object-contain block relative z-20"
              />
            </div>

            {/* Mobile View Cards */}
            <div className="lg:hidden w-full z-40 relative px-2">
              <div className="grid grid-cols-2 gap-2 w-full">
                {painPoints.map((point, i) => (
                  <div key={i}>
                    <PainCard point={point} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border z-50" />
    </div>
  )
}