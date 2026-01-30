'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Kunci scroll body saat menu mobile terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { name: 'Fitur', href: '#features' },
    { name: 'Cara Kerja', href: '#how' },
    { name: 'Harga', href: '#pricing' },
  ]

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-100 py-4 shadow-sm transition-all duration-300"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">

          {/* LOGO */}
          <div className="group cursor-pointer relative z-[110]">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-cover p-1.5"
                priority
              />
            </div>
          </div>

          {/* DESKTOP NAV - Rata Kanan */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[15px] font-bold text-slate-600 hover:text-[#01D2B3] transition-colors tracking-tight"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* MOBILE BURGER ICON */}
          <button
            className="md:hidden relative z-[110] p-2 text-slate-900 outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`
          fixed inset-0 bg-white z-[100] flex flex-col pt-32 transition-all duration-500 md:hidden
          ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'}
        `}>
          <div className="flex flex-col items-center gap-8 w-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-extrabold text-slate-800 hover:text-[#01D2B3] tracking-tighter"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}