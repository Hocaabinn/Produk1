'use client';

import { useState } from 'react';
import { ArrowRight, MapPin, X, ChevronDown, Info } from 'lucide-react';
import MapWrapper from '@/components/MapWrapper';
import ProductGrid from '@/components/ProductGrid';
import HowItWorks from '@/components/HowItWorks';
import Image from 'next/image';
import 'leaflet/dist/leaflet.css';

export default function Home() {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  function handleMarkerClick(storeId: string) {
    setSelectedStoreId(storeId);
  }

  function clearFilter() {
    setSelectedStoreId(null);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section — Full Viewport Portfolio-style */}
      <section className="relative h-screen flex flex-col overflow-hidden bg-zinc-950">
        {/* Background Image */}
        <Image
          src="/hero-bg.jpg"
          alt="PlateRescue store background"
          fill
          priority
          className="object-cover object-center brightness-[0.65]"
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Center Content — perfectly centered */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pb-16">
          <p className="animate-hero-slide-up font-display text-base sm:text-xl italic text-white/80 mb-3 tracking-wide">
            Selamatkan rasa dari
          </p>

          <h1 className="animate-hero-slide-up-d1 font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter !leading-[0.85] lowercase">
            platerescue
          </h1>

          <p className="animate-hero-slide-up-d2 mt-5 text-sm sm:text-base leading-relaxed text-white/65 max-w-md mx-auto">
            Temukan makanan berlebih dari toko-toko sekitarmu dengan harga yang jauh lebih murah. Hemat uang, kurangi limbah, selamatkan bumi.
          </p>

          {/* CTA Button */}
          <div className="animate-hero-slide-up-d3 mt-7">
            <a
              href="#marketplace"
              className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 px-8 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300"
            >
              Jelajahi Makanan
              <div className="bg-white text-black rounded-full p-1.5 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Center — Scroll Indicator */}
        <div className="animate-hero-slide-up-d5 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">Scroll</span>
          <a href="#marketplace" className="flex flex-col items-center gap-1 group">
            <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
            <ChevronDown className="h-4 w-4 text-white/40 group-hover:text-white/70 animate-bounce transition-colors" />
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Map Section */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
            <MapPin className="h-4.5 w-4.5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Toko Terdekat</h2>
            <p className="text-sm text-gray-400">Pilih marker untuk melihat makanan dari toko tersebut</p>
          </div>
        </div>

        {/* Map with floating glass card */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <MapWrapper
            selectedStoreId={selectedStoreId}
            onMarkerClick={handleMarkerClick}
          />

          {/* Floating Glassmorphism Card */}
          <div className="pointer-events-none absolute left-3 top-3 z-[400] max-w-[220px] rounded-2xl border border-white/30 bg-white/70 px-4 py-3 shadow-lg backdrop-blur-md">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
              <p className="text-xs font-medium leading-snug text-gray-700">
                Cari lokasi penyelamatan terdekat di peta
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedStoreId ? 'Filtered Results' : 'Available Food Near You'}
            </h2>
            <p className="text-sm text-muted">
              {selectedStoreId
                ? 'Showing items from selected store'
                : 'Rescue surplus food at great prices'}
            </p>
          </div>

          {selectedStoreId && (
            <button
              onClick={clearFilter}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-card-dark dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <X className="h-3.5 w-3.5" />
              Clear Filter
            </button>
          )}
        </div>

        <ProductGrid selectedStoreId={selectedStoreId} />
      </section>
    </div>
  );
}
