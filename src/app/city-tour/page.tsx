'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Check,
  Clock,
  Info,
  MapPin,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { SolarLogo } from '@/components/solar-logo';
import { Footer } from '@/components/footer';
import { WhatsappIcon } from '@/components/icons/whatsapp-icon';
import { useLanguage } from '@/contexts/language-context';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { LodgeInfo } from '@/types/lodge-info';

type ItineraryFilter = 'all' | 'stop' | 'panoramic';

const TOUR_IMAGE_SRC = '/assets/aistudio/Captura_de_tela_2026-05-24_081127_ccd5a078.png';

export default function CityTourPage() {
  const firestore = useFirestore();
  const { language, setLanguage, translations } = useLanguage();
  const t = translations.cityTourPage;

  const [filter, setFilter] = useState<ItineraryFilter>('all');
  const [selectedDeparture, setSelectedDeparture] = useState<string>('09h');
  const [imgError, setImgError] = useState(false);

  const lodgeInfoRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'lodge_info', 'main') : null),
    [firestore]
  );
  const { data: lodgeInfo } = useDoc<LodgeInfo>(lodgeInfoRef);

  const whatsappNumber = lodgeInfo?.whatsappNumber || '3131052608';
  const cleanReceptionWhatsapp = whatsappNumber.replace(/\D/g, '');

  const departureOptions = language === 'en' ? ['09:00', '10:00', '15:00'] : ['09h', '10h', '15h'];
  const activeDeparture = departureOptions.includes(selectedDeparture)
    ? selectedDeparture
    : departureOptions[0];

  const receptionBookingUrl = `https://wa.me/55${cleanReceptionWhatsapp}?text=${encodeURIComponent(
    t.discountBanner.whatsappMessage(activeDeparture)
  )}`;

  const filteredStops = t.itinerary.stops.filter((stop) => {
    if (filter === 'all') return true;
    if (filter === 'stop') return stop.type === 'stop' || stop.type === 'departure';
    return stop.type === 'panoramic';
  });

  const getStopTypeLabel = (type: 'departure' | 'stop' | 'panoramic') => {
    if (type === 'departure') return t.itinerary.typeDeparture;
    if (type === 'stop') return t.itinerary.typeStop;
    return t.itinerary.typePanoramic;
  };

  return (
    <div className="bg-[#FAF9F5] text-slate-800 flex min-h-screen flex-col font-body selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-sm border-b border-stone-200/90">
        <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <SolarLogo size="sm" />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#11314C] transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={16} />
              <span>{t.backToDashboard}</span>
            </Link>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setLanguage('pt')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                language === 'pt'
                  ? 'bg-white text-[#11314C] shadow-xs'
                  : 'text-slate-600 hover:text-[#11314C]'
              }`}
            >
              PT-BR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                language === 'en'
                  ? 'bg-white text-[#11314C] shadow-xs'
                  : 'text-slate-600 hover:text-[#11314C]'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl flex-grow pt-8 sm:pt-12">
        {/* Editorial Hero Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              <p className="text-xs font-medium text-slate-500 tracking-wide mb-3">
                {t.kicker}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#11314C] tracking-tight leading-[1.12] text-balance mb-4">
                {t.headline}
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl mb-7">
                {t.lead}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button
                asChild
                className="bg-[#11314C] hover:bg-[#0D263B] text-white font-semibold px-6 py-2.5 h-11 rounded-xl shadow-xs whitespace-nowrap"
              >
                <a href={receptionBookingUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span>{t.primaryCta}</span>
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <div className="relative w-full aspect-[4/3] lg:h-full lg:min-h-[340px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-200 shadow-sm">
              {!imgError ? (
                <Image
                  src={TOUR_IMAGE_SRC}
                  alt={t.photoAlt}
                  fill
                  priority
                  unoptimized
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#11314C] to-[#1E4D6E] text-white p-8 text-center">
                  <MapPin size={36} className="text-[#ECA31D] mb-3" />
                  <p className="font-semibold text-base">City Tour de Jardineira</p>
                  <p className="text-xs text-sky-200 mt-1">Centro Histórico de Ouro Preto, MG</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Full-Width 4-Column Operational Strip */}
        <section
          aria-label="Informações principais do passeio"
          className="mt-8 bg-white rounded-2xl border border-stone-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80"
        >
          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 mb-1">
              {t.metrics.durationLabel}
            </p>
            <p className="text-lg font-bold text-[#11314C] tabular-nums">
              {t.metrics.durationValue}
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 mb-1">
              {t.metrics.departuresLabel}
            </p>
            <p className="text-lg font-bold text-[#11314C] tabular-nums">
              {t.metrics.departuresValue}
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 mb-1">
              {t.metrics.priceLabel}
            </p>
            <p className="text-lg font-bold text-[#11314C] tabular-nums">
              {t.metrics.priceValue}
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium text-slate-500 mb-1">
              {t.metrics.bookingLabel}
            </p>
            <p className="text-lg font-bold text-[#11314C]">
              {t.metrics.bookingValue}
            </p>
          </div>
        </section>

        {/* Guest & Group Exclusive Discount Booking Section */}
        <section className="mt-8 rounded-2xl border border-[#ECA31D]/60 bg-[#FFFBF0] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309] mb-2">
                <Sparkles size={15} className="shrink-0" />
                <span>{t.discountBanner.eyebrow}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#11314C] tracking-tight text-balance mb-2">
                {t.discountBanner.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                {t.discountBanner.description}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5 lg:border-l lg:border-amber-200/80 lg:pl-6">
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  {t.discountBanner.chooseTimeLabel}
                </p>
                <div className="inline-flex items-center gap-1 p-1 bg-amber-100/70 rounded-lg border border-amber-200/70">
                  {departureOptions.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedDeparture(time)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors tabular-nums whitespace-nowrap ${
                        activeDeparture === time
                          ? 'bg-[#11314C] text-white shadow-xs'
                          : 'text-[#11314C] hover:bg-white/70'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                asChild
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1faa4f] text-white font-semibold h-11 px-5 rounded-xl shadow-xs whitespace-nowrap"
              >
                <a href={receptionBookingUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span>{t.discountBanner.ctaButton}</span>
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Planned Schedule & Itinerary Section */}
        <section className="mt-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#11314C] tracking-tight text-balance">
                {t.itinerary.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                {t.itinerary.sectionSubtitle}
              </p>
            </div>

            {/* Interactive Segmented Filter Controls */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-lg self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  filter === 'all'
                    ? 'bg-white text-[#11314C] shadow-xs'
                    : 'text-slate-600 hover:text-[#11314C]'
                }`}
              >
                {t.itinerary.filterAll}
              </button>
              <button
                type="button"
                onClick={() => setFilter('stop')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  filter === 'stop'
                    ? 'bg-white text-[#11314C] shadow-xs'
                    : 'text-slate-600 hover:text-[#11314C]'
                }`}
              >
                {t.itinerary.filterStops}
              </button>
              <button
                type="button"
                onClick={() => setFilter('panoramic')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  filter === 'panoramic'
                    ? 'bg-white text-[#11314C] shadow-xs'
                    : 'text-slate-600 hover:text-[#11314C]'
                }`}
              >
                {t.itinerary.filterPanoramic}
              </button>
            </div>
          </div>

          {/* Editorial Numbered Stops List */}
          <ol className="divide-y divide-stone-200/90 mt-2">
            {filteredStops.map((stop) => (
              <li
                key={stop.number}
                className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline"
              >
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="text-sm font-bold text-[#D97706] tabular-nums shrink-0">
                    {stop.number}.
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {getStopTypeLabel(stop.type)} · {stop.timing}
                  </span>
                </div>

                <div className="md:col-span-9">
                  <h3 className="text-base sm:text-lg font-bold text-[#11314C] mb-1.5">
                    {stop.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-prose">
                    {stop.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 pt-4 border-t border-stone-200/90 flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <Info size={16} className="text-[#11314C] mt-0.5 shrink-0" />
            <p>{t.itinerary.scheduleNote}</p>
          </div>
        </section>

        {/* Pricing, Tickets & Reception Booking Two-Column Section */}
        <section className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Values & Tickets */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-5">
              <Ticket size={20} className="text-[#D97706] shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold text-[#11314C]">
                {t.pricing.title}
              </h2>
            </div>

            <div className="pb-5 mb-5 border-b border-stone-200/80 space-y-2">
              <p className="text-xs font-medium text-slate-500">
                {t.pricing.referencePriceTitle}
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                {t.pricing.referencePriceText}
              </p>
              <p className="text-sm font-semibold text-[#11314C] leading-relaxed">
                {t.pricing.discountNote}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-stone-200/80">
              <div>
                <h3 className="text-sm font-bold text-[#11314C] mb-3">
                  {t.pricing.includedTitle}
                </h3>
                <ul className="space-y-2.5">
                  {t.pricing.includedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <Check size={16} className="text-emerald-700 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#11314C] mb-3">
                  {t.pricing.notIncludedTitle}
                </h3>
                <ul className="space-y-2.5">
                  {t.pricing.notIncludedItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <X size={16} className="text-slate-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <Info size={16} className="text-[#11314C] mt-0.5 shrink-0" />
              <p>{t.pricing.disclaimer}</p>
            </div>
          </div>

          {/* Right: Reception Booking & Practical Tips */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#11314C]">
              {t.contacts.title}
            </h2>

            {/* Reception Contact */}
            <div className="pb-6 border-b border-stone-200/80 space-y-3">
              <div>
                <h3 className="text-sm font-bold text-[#11314C]">
                  {t.contacts.receptionLabel}
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {t.contacts.receptionNote}
                </p>
              </div>
              <Button
                asChild
                className="w-full bg-[#11314C] hover:bg-[#0D263B] text-white font-semibold h-10 rounded-xl whitespace-nowrap"
              >
                <a href={receptionBookingUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span>{t.contacts.receptionButton}</span>
                </a>
              </Button>
            </div>

            {/* Practical Tips */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-[#D97706] shrink-0" />
                <h3 className="text-sm font-bold text-[#11314C]">
                  {t.contacts.tipsTitle}
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-disc pl-5">
                {t.contacts.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
