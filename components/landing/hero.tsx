'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Users, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Masuk Awal (Tetap sama)
      gsap.from(".animate-item", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });

      // 2. Animasi Melayang (Tetap sama)
      gsap.to(".floating-card", {
        y: 20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.8,
          from: "random"
        }
      });

      // 3. Timeline Simulasi Chat dengan efek BOUNCING
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
      });

      tl.set(".chat-bubble", { opacity: 0, y: 20, scale: 0.8 });

      const bounceIn = {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(2)"
      };

      tl.to(".cb-1", bounceIn, "+=0.5")
        .to(".cb-2", bounceIn, "+=1.0")
        .to(".cb-3", bounceIn, "+=1.2")
        .to(".cb-4", bounceIn, "+=1.0")
        .to(".cb-5", bounceIn, "+=1.2")
        .to({}, { duration: 3 })
        .to(".chat-bubble", {
          opacity: 0,
          y: -20,
          scale: 0.9,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.in"
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-32 pb-40 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] min-h-screen flex items-center">

      {/* --- BACKGROUND LAYER (GRADIENT & PATTERN) --- */}
      <div className="absolute inset-0 z-0">
        {/* 1. Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

        {/* 2. Gradient Orbs - Menggunakan warna Nexora (#01D2B3) */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#01D2B3]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px]" />

        {/* 3. Mesh Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(1,210,179,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="animate-item text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance text-black">
                Ubah Pengunjung Jadi <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#01D2B3] to-[#01D2B3]/60">Pembeli.</span>
              </h1>

              <p className="animate-item text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
                Chatbot cerdas yang memahami bisnismu. Tingkatkan konversi secara otomatis tanpa harus berjaga di depan layar.
              </p>
            </div>

            <div className="animate-item flex flex-col sm:flex-row gap-5 pt-2">
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-base font-bold shadow-xl shadow-[#01D2B3]/25 bg-[#01D2B3] hover:bg-[#00b89d] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] group text-white"
              >
                Buat Chatbot Sekarang
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-10 h-14 text-base font-semibold border-2 border-[#01D2B3]/10 hover:border-[#01D2B3]/20 hover:bg-[#01D2B3]/5 transition-all duration-300"
              >
                Lihat Demo
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative lg:mt-0 mt-24 animate-item">

            {/* Card 1: Happy Clients */}
            <div className="floating-card absolute top-10 -left-20 z-20 hidden md:flex w-48 bg-background/90 backdrop-blur-md border border-[#01D2B3]/30 p-4 rounded-2xl shadow-xl items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground font-medium uppercase truncate">Pengguna</p>
                <p className="text-sm font-bold truncate">1,200+ Terpercaya</p>
              </div>
            </div>

            {/* Card 2: Growth */}
            <div className="floating-card absolute bottom-12 -right-16 z-20 hidden md:flex w-48 bg-background/90 backdrop-blur-md border border-[#01D2B3]/30 p-4 rounded-2xl shadow-xl flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#01D2B3]/10 flex items-center justify-center text-[#01D2B3]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase">Pertumbuhan</p>
                  <p className="text-sm font-bold">+85% Seo</p>
                </div>
              </div>
              <div className="w-full h-8 pt-1">
                <svg width="100%" height="100%" viewBox="0 0 120 30" fill="none" preserveAspectRatio="none">
                  <path
                    d="M0 25C20 25 30 15 45 18C60 21 75 5 90 8C105 11 110 2 120 2"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.3)]"
                  />
                </svg>
              </div>
            </div>

            {/* Card 3: Automation */}
            <div className="floating-card absolute -bottom-1 -left-10 z-20 w-48 bg-background/90 backdrop-blur-md border border-[#01D2B3]/30 p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase">Status</p>
                <p className="text-sm font-bold">24/7 Aktif</p>
              </div>
            </div>

            {/* Main Mockup Card */}
            <div className="relative z-10 p-[2px] bg-gradient-to-br from-[#01D2B3] via-[#01D2B3]/20 to-[#01D2B3] rounded-[2rem] shadow-[0_0_20px_rgba(1,210,179,0.2)] max-w-[400px] mx-auto">
              <div className="bg-background rounded-[calc(2rem-2px)] p-6 space-y-6 overflow-hidden">
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#01D2B3] flex items-center justify-center text-white text-xs font-bold">Ai</div>
                    <div>
                      <div className="text-sm font-semibold">Nexora Assistant</div>
                      <div className="text-[10px] text-emerald-500 flex items-center gap-1 font-medium">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Online
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 min-h-[220px] flex flex-col justify-end">
                  <div className="chat-bubble cb-1 bg-muted/40 rounded-xl rounded-tl-none p-3.5 text-xs max-w-[85%] self-start border border-border/50">
                    Halo! Ada yang bisa kami bantu? 👋
                  </div>
                  <div className="chat-bubble cb-2 bg-[#01D2B3] text-white rounded-xl rounded-tr-none p-3.5 text-xs max-w-[85%] self-end font-medium">
                    Apa produk ini ada garansi?
                  </div>
                  <div className="chat-bubble cb-3 bg-muted/40 rounded-xl rounded-tl-none p-3.5 text-xs max-w-[85%] self-start border border-border/50">
                    Tentu! Semua produk kami bergaransi 1 tahun.
                  </div>
                  <div className="chat-bubble cb-4 bg-[#01D2B3] text-white rounded-xl rounded-tr-none p-3.5 text-xs max-w-[85%] self-end font-medium">
                    Oke, saya mau pesan satu!
                  </div>
                  <div className="chat-bubble cb-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl rounded-tl-none p-3.5 text-xs max-w-[85%] self-start font-bold">
                    Pilihan bagus! Silakan klik link di bawah ini ya.
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 text-center">
                  <div className="h-10 rounded-full bg-muted/30 flex items-center px-4 text-xs text-muted-foreground/50 font-medium">
                    Tulis pesan...
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -inset-6 bg-[#01D2B3]/10 blur-[60px] rounded-full -z-10 opacity-40" />
          </div>

        </div>
      </div>
    </section>
  )
}