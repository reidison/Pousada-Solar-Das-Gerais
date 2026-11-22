'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import type { OuroPretoPlace } from '@/lib/ouro-preto-places';

declare global {
  interface Window {
    L?: any;
  }
}

interface WalkingRouteMapProps {
  places: OuroPretoPlace[];
  originCoords: { lat: number; lng: number; label: string };
  destination: OuroPretoPlace;
  routePoints: [number, number][];
  walkProgressIndex: number;
  userPosition: { lat: number; lng: number } | null;
  isWalking: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onSelectDestination: (place: OuroPretoPlace) => void;
}

const LEAFLET_CSS_ID = 'leaflet-css-cdn';
const LEAFLET_JS_ID = 'leaflet-js-cdn';

function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('SSR'));
    if (window.L) return resolve(window.L);

    if (!document.getElementById(LEAFLET_CSS_ID)) {
      const link = document.createElement('link');
      link.id = LEAFLET_CSS_ID;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById(LEAFLET_JS_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.L));
      existingScript.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = LEAFLET_JS_ID;
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export function WalkingRouteMap({
  places,
  originCoords,
  destination,
  routePoints,
  walkProgressIndex,
  userPosition,
  isWalking,
  isExpanded = false,
  onToggleExpand,
  onSelectDestination,
}: WalkingRouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layersRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then((L) => {
        if (cancelled || !containerRef.current || mapRef.current) return;
        const map = L.map(containerRef.current, {
          zoomControl: true,
          scrollWheelZoom: false,
        }).setView([originCoords.lat, originCoords.lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
          maxZoom: 19,
        }).addTo(map);

        layersRef.current = L.layerGroup().addTo(map);
        mapRef.current = map;
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        layersRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    const layers = layersRef.current;
    if (!mapReady || !L || !map || !layers) return;

    layers.clearLayers();

    // 1. Draw walking route lines
    if (routePoints.length >= 2) {
      if (isWalking && walkProgressIndex > 0) {
        const walkedSlice = routePoints.slice(0, walkProgressIndex + 1);
        const remainingSlice = routePoints.slice(walkProgressIndex);

        if (remainingSlice.length >= 2) {
          L.polyline(remainingSlice, {
            color: '#11314C',
            weight: 4,
            opacity: 0.45,
            dashArray: '8 8',
          }).addTo(layers);
        }

        if (walkedSlice.length >= 2) {
          L.polyline(walkedSlice, {
            color: '#16A34A',
            weight: 7,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round',
          }).addTo(layers);
        }
      } else {
        L.polyline(routePoints, {
          color: '#16A34A',
          weight: 5,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(layers);
      }
    }

    // 2. Landmark markers
    places.forEach((place) => {
      const isDest = place.id === destination.id;
      const isPousada = place.id === 'pousada';

      const bg = isDest ? '#16A34A' : isPousada ? '#11314C' : '#FFFFFF';
      const border = isDest ? '#14532D' : isPousada ? '#ECA31D' : '#11314C';
      const text = isDest || isPousada ? '#FFFFFF' : '#11314C';
      const size = isDest || isPousada ? 14 : 10;

      const icon = L.divIcon({
        className: 'custom-op-pin',
        html: `<div style="display:flex;align-items:center;gap:4px;transform:translate(-50%,-50%);white-space:nowrap;">
          <span style="width:${size}px;height:${size}px;border-radius:9999px;background:${bg};border:2.5px solid ${border};box-shadow:0 2px 6px rgba(0,0,0,0.3);display:inline-block;flex-shrink:0;"></span>
          ${
            isDest || isPousada
              ? `<span style="background:${bg};color:${text};border:1px solid ${border};font-size:11px;font-weight:700;padding:2px 7px;border-radius:9999px;box-shadow:0 2px 6px rgba(0,0,0,0.2);">${place.shortName}</span>`
              : ''
          }
        </div>`,
        iconSize: [0, 0],
      });

      const marker = L.marker([place.lat, place.lng], { icon }).addTo(layers);
      marker.bindTooltip(place.name, { direction: 'top', offset: [0, -8] });
      if (!isPousada) {
        marker.on('click', () => onSelectDestination(place));
      }
    });

    // 3. Origin marker if GPS / custom origin differs from Pousada
    const originIcon = L.divIcon({
      className: 'custom-origin-pin',
      html: `<div style="width:16px;height:16px;border-radius:9999px;background:#11314C;border:3px solid #ECA31D;box-shadow:0 2px 8px rgba(0,0,0,0.35);transform:translate(-50%,-50%);"></div>`,
      iconSize: [0, 0],
    });
    L.marker([originCoords.lat, originCoords.lng], { icon: originIcon })
      .bindTooltip(`De: ${originCoords.label}`, { direction: 'top' })
      .addTo(layers);

    // 4. Live user position marker while walking
    if (isWalking && userPosition) {
      const userIcon = L.divIcon({
        className: 'custom-user-pin',
        html: `<div style="position:relative;transform:translate(-50%,-50%);">
          <div style="width:24px;height:24px;border-radius:9999px;background:rgba(22,163,74,0.28);animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
          <div style="position:absolute;top:5px;left:5px;width:14px;height:14px;border-radius:9999px;background:#16A34A;border:2.5px solid #FFFFFF;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>
        </div>`,
        iconSize: [0, 0],
      });
      L.marker([userPosition.lat, userPosition.lng], { icon: userIcon, zIndexOffset: 1000 })
        .bindTooltip('Você está aqui', { direction: 'top' })
        .addTo(layers);
    }

    // Fit bounds nicely when not actively stepping
    if (!isWalking && routePoints.length >= 2) {
      const bounds = L.latLngBounds(routePoints);
      map.fitBounds(bounds, { padding: [45, 45], maxZoom: 17 });
    }
  }, [
    mapReady,
    places,
    originCoords,
    destination,
    routePoints,
    walkProgressIndex,
    userPosition,
    isWalking,
    onSelectDestination,
  ]);

  // Recalculate Leaflet viewport when toggling expanded/fullscreen mode
  useEffect(() => {
    const L = window.L;
    const map = mapRef.current;
    if (!mapReady || !L || !map) return;
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (!isWalking && routePoints.length >= 2) {
        const bounds = L.latLngBounds(routePoints);
        map.fitBounds(bounds, { padding: [45, 45], maxZoom: 17 });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [mapReady, isExpanded, isWalking, routePoints]);

  if (mapError) {
    return (
      <div className="w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-2xl border border-stone-200 bg-stone-100 flex flex-col items-center justify-center p-6 text-center text-slate-600">
        <p className="font-semibold text-[#11314C] mb-1">Mapa indisponível offline</p>
        <p className="text-xs">Use o botão &ldquo;Abrir no Google Maps&rdquo; abaixo para iniciar a navegação a pé.</p>
      </div>
    );
  }

  return (
    <div
      className={
        isExpanded
          ? 'relative w-full h-full overflow-hidden bg-stone-100'
          : 'relative w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100'
      }
    >
      <div ref={containerRef} className="w-full h-full z-10" />
      {onToggleExpand && (
        <button
          type="button"
          onClick={onToggleExpand}
          className="absolute top-3 right-3 z-[400] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#11314C] text-xs font-bold shadow-md border border-stone-200 transition-all"
          title={isExpanded ? 'Reduzir mapa' : 'Ampliar mapa em tela cheia'}
        >
          {isExpanded ? (
            <>
              <Minimize2 size={14} />
              <span>Reduzir</span>
            </>
          ) : (
            <>
              <Maximize2 size={14} />
              <span>Ampliar mapa</span>
            </>
          )}
        </button>
      )}
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FAF9F5] text-xs font-medium text-slate-500 z-20">
          Carregando mapa de Ouro Preto...
        </div>
      )}
    </div>
  );
}
