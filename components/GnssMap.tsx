// components/GnssMap.tsx
'use client';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// Update icon dengan path yang benar
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface SearchResult {
  id: number;
  date: string;
  latitude: number;
  longitude: number;
  fileName: string;
  fileSize: string;
  status: string;
}

interface GnssMapProps {
  searchResults: SearchResult[];
  center: [number, number];
}

export default function GnssMap({ searchResults, center }: GnssMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(center, 5);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    // Update markers
    const markers = searchResults.map(result => 
      L.marker([result.latitude, result.longitude], { icon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">GNSS Data Point</h3>
            <p>Date: ${result.date}</p>
            <p>Coordinates: ${result.latitude.toFixed(4)}, ${result.longitude.toFixed(4)}</p>
            <p>File: ${result.fileName}</p>
          </div>
        `)
    );

    // Clear existing markers and add new ones
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    markers.forEach(marker => marker.addTo(mapRef.current!));

    // Recenter map if center changes
    mapRef.current.setView(center, mapRef.current.getZoom());

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [searchResults, center]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}