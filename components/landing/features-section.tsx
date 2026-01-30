'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, MessageCircle, Phone, Check, FileText, Database, Cpu, User, Zap } from 'lucide-react'

const features = [
  {
    id: 'train',
    icon: Upload,
    title: 'Train on Your Data',
    description: 'Upload PDF atau link website, AI langsung paham bisnis Anda.',
    points: ['PDF & Web Link', 'Instant Understanding'],
    color: 'bg-blue-500'
  },
  {
    id: 'human',
    icon: MessageCircle,
    title: 'Human-Like Interaction',
    description: 'Bahasa natural yang luwes seperti asisten manusia asli.',
    points: ['Bahasa Natural', 'Respon Instan 24/7'],
    color: 'bg-[#01D2B3]'
  },
  {
    id: 'handoff',
    icon: Phone,
    title: 'Seamless Handoff',
    description: 'Berikan notifikasi agar Anda bisa ambil alih kapan saja.',
    points: ['Human Agent Handoff', 'Isu Kompleks'],
    color: 'bg-orange-500'
  },
]

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0)

  const renderVisualContent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="relative flex items-center gap-3 scale-90">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="p-3 bg-white rounded-lg shadow-md border border-slate-100"><FileText className="text-blue-500" size={20} /></motion.div>
            <div className="w-12 h-[2px] bg-slate-200 overflow-hidden"><motion.div animate={{ x: [-48, 48] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-full h-full bg-blue-500" /></div>
            <div className="p-3 bg-white rounded-lg shadow-md border border-slate-100"><Database className="text-cyan-500" size={20} /></div>
          </div>
        )
      case 1:
        return (
          <div className="w-full max-w-[220px] space-y-2 scale-90">
            <div className="bg-white/20 p-2 rounded-xl rounded-bl-none text-[10px] text-white/90 w-2/3 border border-white/10">Halo! Ada bantuan?</div>
            <div className="bg-white p-2 rounded-xl rounded-br-none text-[10px] text-[#01D2B3] ml-auto w-2/3 text-right shadow-sm font-bold">Cek pesanan dong.</div>
          </div>
        )
      case 2:
        return (
          <div className="flex items-center gap-2 scale-90">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center"><Cpu size={18} className="text-orange-500" /></div>
            <Zap className="text-amber-400 fill-amber-400" size={16} />
            <div className="w-10 h-10 rounded-full bg-white border border-orange-200 shadow-sm flex items-center justify-center"><User size={18} className="text-slate-700" /></div>
          </div>
        )
      default: return null
    }
  }

  return (
    <section id="features" className="relative py-12 lg:py-16 px-4 bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Compact Header */}
        <div className="text-center mb-20 mt-20 ">
          <h2 className="text-[10px] font-black tracking-[0.2em] uppercase text-[#01D2B3] mb-2">Capabilities</h2>
          <h3 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            Fitur Utama <span className="text-[#01D2B3]">Chatbot Nexora.</span>
          </h3>
        </div>

        {/* Slim Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[400px]">

          {/* Tabs - Lebih Kecil */}
          <div className="lg:w-[350px] flex flex-col gap-2">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${activeTab === index
                  ? 'bg-white border-slate-200 shadow-md translate-x-1'
                  : 'bg-transparent border-transparent opacity-50 hover:opacity-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`shrink-0 p-2 rounded-lg ${activeTab === index ? feature.color : 'bg-slate-300'} text-white`}>
                    <feature.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{feature.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content - Lebih Slim */}
          <div className="flex-1 flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`w-full flex flex-col rounded-[2rem] border border-white/40 shadow-xl overflow-hidden ${activeTab === 1 ? 'bg-[#01D2B3] text-white' : 'bg-white text-slate-900'
                  }`}
              >
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight">{features[activeTab].title}</h3>
                    <p className={`text-sm leading-relaxed ${activeTab === 1 ? 'text-white/90' : 'text-slate-500'}`}>
                      {features[activeTab].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {features[activeTab].points.map((point, i) => (
                        <div key={i} className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold ${activeTab === 1 ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Check size={10} strokeWidth={4} /> {point}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Area - Dikecilkan */}
                  <div className={`mt-6 py-6 rounded-xl border backdrop-blur-sm flex items-center justify-center ${activeTab === 1 ? 'bg-white/10 border-white/20' : 'bg-slate-50 border-slate-100'
                    }`}>
                    {renderVisualContent(activeTab)}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}