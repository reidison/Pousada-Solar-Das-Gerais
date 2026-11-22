'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronDown,
  Clock,
  Compass,
  ExternalLink,
  Footprints,
  LocateFixed,
  MapPin,
  Navigation,
  Play,
  Search,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { WalkingRouteMap } from '@/components/walking-route-map';
import {
  ALL_PLACES,
  OURO_PRETO_PLACES,
  POUSADA_ORIGIN,
  estimateWalkMinutes,
  formatDistance,
  haversineMeters,
  type OuroPretoPlace,
} from '@/lib/ouro-preto-places';

function interpolatePoints(
  start: [number, number],
  end: [number, number],
  steps = 20
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push([
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t,
    ]);
  }
  return pts;
}

function totalRouteMeters(points: [number, number][]): number {
  let sum = 0;
  for (let i = 1; i < points.length; i++) {
    sum += haversineMeters(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
  }
  return sum;
}

export default function PraOndeUaiPage() {
  const [originText, setOriginText] = useState<string>('Pousada Solar das Gerais - Rua Manuel Cabral, 119');
  const [originCoords, setOriginCoords] = useState<{ lat: number; lng: number; label: string }>({
    lat: POUSADA_ORIGIN.lat,
    lng: POUSADA_ORIGIN.lng,
    label: 'Pousada Solar das Gerais (Rua Manuel Cabral, 119)',
  });
  const [searchingOrigin, setSearchingOrigin] = useState<boolean>(false);
  const [showOriginMenu, setShowOriginMenu] = useState<boolean>(false);
  const [destinationId, setDestinationId] = useState<string>('praca-tiradentes');

  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [routeDistanceMeters, setRouteDistanceMeters] = useState<number>(0);
  const [routeDurationMin, setRouteDurationMin] = useState<number>(0);
  const [loadingRoute, setLoadingRoute] = useState<boolean>(false);

  const [walkMode, setWalkMode] = useState<'idle' | 'gps' | 'sim'>('idle');
  const [walkProgressIndex, setWalkProgressIndex] = useState<number>(0);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<string>('');

  const watchIdRef = useRef<number | null>(null);
  const simTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originMenuRef.current && !originMenuRef.current.contains(event.target as Node)) {
        setShowOriginMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const destination = useMemo(
    () => OURO_PRETO_PLACES.find((p) => p.id === destinationId) || OURO_PRETO_PLACES[0],
    [destinationId]
  );

  const stopWalking = useCallback(() => {
    if (watchIdRef.current !== null && typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (simTimerRef.current) {
      clearInterval(simTimerRef.current);
      simTimerRef.current = null;
    }
    setWalkMode('idle');
    setWalkProgressIndex(0);
    setUserPosition(null);
    setGpsStatus('');
  }, []);

  // Fetch real pedestrian route via OSRM
  useEffect(() => {
    stopWalking();
    let cancelled = false;
    setLoadingRoute(true);

    const start: [number, number] = [originCoords.lat, originCoords.lng];
    const end: [number, number] = [destination.lat, destination.lng];

    const url = `https://router.project-osrm.org/route/v1/foot/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const route = data?.routes?.[0];
        if (route?.geometry?.coordinates?.length >= 2) {
          const coords: [number, number][] = route.geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng]
          );
          const dist = typeof route.distance === 'number' ? route.distance : totalRouteMeters(coords);
          setRoutePoints(coords);
          setRouteDistanceMeters(dist);
          setRouteDurationMin(estimateWalkMinutes(dist));
        } else {
          const fallback = interpolatePoints(start, end, 24);
          const dist = haversineMeters(start[0], start[1], end[0], end[1]) * 1.25;
          setRoutePoints(fallback);
          setRouteDistanceMeters(dist);
          setRouteDurationMin(estimateWalkMinutes(dist));
        }
      })
      .catch(() => {
        if (cancelled) return;
        const fallback = interpolatePoints(start, end, 24);
        const dist = haversineMeters(start[0], start[1], end[0], end[1]) * 1.25;
        setRoutePoints(fallback);
        setRouteDistanceMeters(dist);
        setRouteDurationMin(estimateWalkMinutes(dist));
      })
      .finally(() => {
        if (!cancelled) setLoadingRoute(false);
      });

    return () => {
      cancelled = true;
    };
  }, [originCoords.lat, originCoords.lng, destination.lat, destination.lng, stopWalking]);

  const handleUsePousada = () => {
    setOriginText('Pousada Solar das Gerais - Rua Manuel Cabral, 119');
    setOriginCoords({
      lat: POUSADA_ORIGIN.lat,
      lng: POUSADA_ORIGIN.lng,
      label: 'Pousada Solar das Gerais (Rua Manuel Cabral, 119)',
    });
    setGpsStatus('Partida definida: Pousada Solar das Gerais.');
  };

  const handleSelectOriginPlace = (place: OuroPretoPlace) => {
    const label =
      place.id === POUSADA_ORIGIN.id
        ? 'Pousada Solar das Gerais - Rua Manuel Cabral, 119'
        : place.name;
    setOriginText(label);
    setOriginCoords({
      lat: place.lat,
      lng: place.lng,
      label: place.name,
    });
    setShowOriginMenu(false);
    setGpsStatus(`Partida definida: ${place.name}`);
  };

  const handleSearchOrigin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = originText.trim();
    if (!query) {
      handleUsePousada();
      return;
    }
    setSearchingOrigin(true);
    setGpsStatus('Localizando endereço de partida em Ouro Preto...');
    try {
      const fullQuery = query.toLowerCase().includes('ouro preto')
        ? query
        : `${query}, Ouro Preto, MG, Brasil`;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(fullQuery)}`
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setOriginCoords({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          label: query,
        });
        setGpsStatus(`Partida definida: ${query}`);
      } else {
        setGpsStatus('Endereço não encontrado em Ouro Preto. Tente outro nome de rua ou use a pousada.');
      }
    } catch {
      setGpsStatus('Não foi possível buscar o endereço agora. Use a pousada ou seu GPS.');
    } finally {
      setSearchingOrigin(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsStatus('Seu navegador não suporta geolocalização.');
      return;
    }
    setGpsStatus('Buscando sua localização...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOriginText('Minha localização atual (GPS)');
        setOriginCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: 'Minha localização atual (GPS)',
        });
        setGpsStatus('Localização atual definida como partida.');
      },
      () => {
        setGpsStatus('Não foi possível acessar o GPS. Usando a pousada como partida.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleStartLiveWalk = () => {
    if (walkMode === 'gps') {
      stopWalking();
      return;
    }
    stopWalking();
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsStatus('GPS indisponível neste dispositivo. Use "Simular trajeto".');
      return;
    }

    setWalkMode('gps');
    setWalkProgressIndex(0);
    setUserPosition({ lat: originCoords.lat, lng: originCoords.lng });
    setGpsStatus('Caminhada iniciada! Acompanhando seu trajeto pelo GPS...');

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserPosition({ lat, lng });

        if (routePoints.length > 0) {
          let bestIdx = 0;
          let bestDist = Infinity;
          routePoints.forEach((pt, idx) => {
            const d = haversineMeters(lat, lng, pt[0], pt[1]);
            if (d < bestDist) {
              bestDist = d;
              bestIdx = idx;
            }
          });
          setWalkProgressIndex(bestIdx);
          if (bestIdx >= routePoints.length - 1) {
            setGpsStatus(`Você chegou em ${destination.shortName}!`);
          }
        }
      },
      () => {
        setGpsStatus('Sinal de GPS indisponível. Você pode testar usando "Simular trajeto".');
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: 10000 }
    );
  };

  const handleSimulateWalk = () => {
    if (walkMode === 'sim') {
      stopWalking();
      return;
    }
    stopWalking();
    if (routePoints.length < 2) return;

    setWalkMode('sim');
    setWalkProgressIndex(0);
    setUserPosition({ lat: routePoints[0][0], lng: routePoints[0][1] });
    setGpsStatus('Simulando caminhada ao vivo na rota verde...');

    let idx = 0;
    simTimerRef.current = setInterval(() => {
      idx += 1;
      if (idx >= routePoints.length - 1) {
        setWalkProgressIndex(routePoints.length - 1);
        setUserPosition({
          lat: routePoints[routePoints.length - 1][0],
          lng: routePoints[routePoints.length - 1][1],
        });
        setGpsStatus(`Chegou ao destino: ${destination.shortName}!`);
        if (simTimerRef.current) {
          clearInterval(simTimerRef.current);
          simTimerRef.current = null;
        }
        return;
      }
      setWalkProgressIndex(idx);
      setUserPosition({ lat: routePoints[idx][0], lng: routePoints[idx][1] });
    }, 350);
  };

  // Remaining distance & time based on current progress
  const progressFraction =
    walkMode !== 'idle' && routePoints.length > 1
      ? walkProgressIndex / (routePoints.length - 1)
      : 0;
  const remainingMeters = Math.max(0, routeDistanceMeters * (1 - progressFraction));
  const remainingMinutes =
    remainingMeters <= 15 && walkMode !== 'idle'
      ? 0
      : Math.max(1, Math.round(routeDurationMin * (1 - progressFraction)));
  const progressPercent = Math.round(progressFraction * 100);

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    `${originCoords.lat},${originCoords.lng}`
  )}&destination=${encodeURIComponent(
    `${destination.lat},${destination.lng}`
  )}&travelmode=walking`;

  return (
    <div className="bg-[#FAF9F5] text-slate-800 min-h-screen flex flex-col font-body">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80">
        <div className="container mx-auto px-4 max-w-6xl h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[#11314C] hover:text-[#1E4D6E] transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Voltar para o Início
          </Link>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
            <Footprints size={13} />
            Centro Histórico · A pé
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl flex-grow pt-6 sm:pt-8">
        {/* Title */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#B45309] mb-1">
            Guia de Mobilidade · Pousada Solar das Gerais
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#11314C] tracking-tight">
            Pra onde, uai?!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
            Trace sua caminhada pelo Centro Histórico saindo da pousada (Rua Manuel Cabral, 119). Acompanhe a rota verde em tempo real ou abra direto no Google Maps.
          </p>
        </div>

        {/* Mobility De / Para + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: De / Para Controls + Live HUD */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 shadow-sm p-5 space-y-4">
            {/* De (Origem) - Campo preenchível com sugestão da Pousada */}
            <form onSubmit={handleSearchOrigin} className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="origin-input"
                  className="text-xs font-bold uppercase tracking-wider text-[#11314C] flex items-center gap-1.5"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#11314C] ring-2 ring-[#ECA31D]" />
                  De (Partida)
                </label>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                >
                  <LocateFixed size={12} />
                  Usar meu GPS
                </button>
              </div>

              <div className="flex gap-2" ref={originMenuRef}>
                <div className="relative flex-1">
                  <input
                    id="origin-input"
                    type="text"
                    value={originText}
                    onChange={(e) => setOriginText(e.target.value)}
                    placeholder="Pousada Solar das Gerais - Rua Manuel Cabral, 119"
                    className="w-full h-11 rounded-xl border border-stone-200 bg-[#FAF9F5] pl-3 pr-9 text-sm font-medium text-[#11314C] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#11314C]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOriginMenu((prev) => !prev)}
                    aria-label="Escolher ponto de partida sugerido"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-500 hover:text-[#11314C] hover:bg-stone-200/60 transition-colors"
                  >
                    <ChevronDown size={16} />
                  </button>

                  {showOriginMenu && (
                    <div className="absolute left-0 right-0 top-12 z-30 max-h-60 overflow-y-auto rounded-xl border border-stone-200 bg-white shadow-lg py-1">
                      {ALL_PLACES.map((place) => (
                        <button
                          key={place.id}
                          type="button"
                          onClick={() => handleSelectOriginPlace(place)}
                          className="w-full text-left px-3 py-2 text-sm text-[#11314C] hover:bg-stone-100 flex items-center justify-between gap-2"
                        >
                          <span className="font-medium truncate">
                            {place.id === POUSADA_ORIGIN.id
                              ? 'Pousada Solar das Gerais (Rua Manuel Cabral, 119)'
                              : place.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  disabled={searchingOrigin}
                  className="h-11 px-3 rounded-xl border-stone-200 text-[#11314C] hover:bg-stone-100 shrink-0"
                  title="Buscar endereço de partida"
                >
                  <Search size={16} />
                </Button>
              </div>
            </form>

            {/* Para (Destino) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Para (Destino)
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full h-11 rounded-xl border border-emerald-200 bg-emerald-50/40 px-3 text-sm font-semibold text-[#11314C] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                {OURO_PRETO_PLACES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {destination.note && (
                <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                  <MapPin size={12} className="shrink-0 text-emerald-600" />
                  <span>{destination.address}</span>
                </p>
              )}
            </div>

            {/* Live Distance & Time HUD */}
            <div className="rounded-xl bg-[#FAF9F5] border border-stone-200/90 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    {walkMode !== 'idle' ? 'Distância restante' : 'Distância a pé'}
                  </p>
                  <p className="text-2xl font-extrabold text-[#11314C] tabular-nums">
                    {loadingRoute ? '...' : formatDistance(remainingMeters)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide flex items-center gap-1">
                    <Clock size={11} />
                    Tempo estimado
                  </p>
                  <p className="text-2xl font-extrabold text-emerald-700 tabular-nums">
                    {loadingRoute
                      ? '...'
                      : remainingMinutes === 0
                      ? 'Chegou!'
                      : `${remainingMinutes} min`}
                  </p>
                </div>
              </div>

              {walkMode !== 'idle' && (
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-emerald-800 mb-1">
                    <span>Trajeto em andamento</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {gpsStatus && (
                <p className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5">
                  {gpsStatus}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-2 gap-2.5">
                <Button
                  type="button"
                  onClick={handleStartLiveWalk}
                  className={`h-11 rounded-xl font-semibold text-xs sm:text-sm ${
                    walkMode === 'gps'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {walkMode === 'gps' ? (
                    <>
                      <Square size={15} className="mr-1.5" />
                      Parar GPS
                    </>
                  ) : (
                    <>
                      <Navigation size={15} className="mr-1.5" />
                      Iniciar caminhada
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSimulateWalk}
                  className="h-11 rounded-xl font-semibold text-xs sm:text-sm border-[#11314C]/30 text-[#11314C] hover:bg-stone-50"
                >
                  {walkMode === 'sim' ? (
                    <>
                      <Square size={14} className="mr-1.5 text-rose-600" />
                      Parar prévia
                    </>
                  ) : (
                    <>
                      <Play size={14} className="mr-1.5 text-emerald-600" />
                      Simular trajeto
                    </>
                  )}
                </Button>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full h-11 rounded-xl font-semibold text-xs sm:text-sm border-[#11314C] text-[#11314C] hover:bg-[#11314C] hover:text-white transition-colors"
              >
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <Compass size={16} className="mr-2" />
                  Abrir rota no Google Maps (A pé)
                  <ExternalLink size={14} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Panel: Interactive Map */}
          <div className="lg:col-span-7">
            <WalkingRouteMap
              places={ALL_PLACES}
              originCoords={originCoords}
              destination={destination}
              routePoints={routePoints}
              walkProgressIndex={walkProgressIndex}
              userPosition={userPosition}
              isWalking={walkMode !== 'idle'}
              onSelectDestination={(place) => setDestinationId(place.id)}
            />
            <p className="text-[11px] text-slate-500 mt-2 text-center sm:text-left">
              Dica: toque em qualquer ponto no mapa ou escolha um destino abaixo para traçar a rota verde.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
