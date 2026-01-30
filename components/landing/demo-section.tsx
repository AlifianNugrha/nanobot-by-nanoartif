'use client'

import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const CHAT_DATA = [
  { id: 1, type: 'bot', text: 'Halo! 👋 Ada yang bisa kami bantu?' },
  { id: 2, type: 'user', text: 'Berapa harga paket tahunan?' },
  { id: 3, type: 'bot', text: 'Kami punya paket hemat Rp 99rb/bulan! 😊' },
  { id: 4, type: 'user', text: 'Wah, boleh juga! Ada trial gratis?' },
  { id: 5, type: 'bot', text: 'Tentu! Ada trial 14 hari buat kamu. 🎉' }
]

export default function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<typeof CHAT_DATA>([])
  const [index, setIndex] = useState(0)

  // LOGIKA OTOMATIS & LOOPING
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => {
        // Jika sudah sampai pesan terakhir, reset ke awal setelah jeda
        if (index >= CHAT_DATA.length) {
          setIndex(0)
          return []
        }
        return [...prev, CHAT_DATA[index]]
      })
      setIndex((prev) => prev + 1)
    }, 2000) // Pesan muncul setiap 2 detik

    return () => clearInterval(interval)
  }, [index])

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 1,
      }
    })

    // 1. Header Intro
    tl.fromTo(headerRef.current,
      { opacity: 0, scale: 0.8, y: "30vh" },
      { opacity: 1, scale: 1.2, y: "30vh", duration: 1.5 }
    )

    // 2. Header Move Up
    tl.to(headerRef.current, { y: 0, scale: 1, duration: 1.5, ease: "power3.inOut" })

    // 3. Card Entrance (Besar -> Kecil)
    tl.fromTo(cardRef.current,
      { y: 600, opacity: 0, scale: 1.4 },
      { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
      "-=0.5"
    )

    // 4. Button Pop
    tl.fromTo(buttonRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.5"
    )

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="bg-secondary relative overflow-hidden min-h-screen">
      <section className="h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* KOLOM KIRI */}
          <div className="flex flex-col items-start gap-8">
            <div ref={headerRef} className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-bold text-foreground leading-[1.1]">
                Jangan Percaya <br /> Kata Kami
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Coba sendiri dan rasakan pengalaman chatbot AI yang berbeda dengan teknologi terbaru kami.
              </p>
            </div>
            <div ref={buttonRef}>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-4 rounded-xl transition-all shadow-lg active:scale-95">
                Mulai Chat Sekarang
              </button>
            </div>
          </div>

          {/* KOLOM KANAN: CARD CHAT OTOMATIS */}
          <div ref={cardRef} className="w-full">
            <div className="bg-background rounded-2xl border-2 border-primary overflow-hidden shadow-2xl">
              <div className="h-[500px] flex flex-col">
                <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-bold">AI</div>
                  <div>
                    <h3 className="font-semibold text-sm">Customer Support AI</h3>
                    <p className="text-[10px] opacity-80 uppercase tracking-tighter">Automated Demo</p>
                  </div>
                </div>

                {/* Body Chat - Auto Scroll ke Bawah */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background scroll-smooth">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-primary/10 text-foreground rounded-tl-none border border-primary/10'
                          }`}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-secondary border border-border rounded-lg px-4 py-2 text-sm text-muted-foreground/40 animate-pulse">
                      AI sedang mengetik...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border z-50" />
    </div>
  )
}


