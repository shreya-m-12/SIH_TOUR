import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Footprints, 
  Car, 
  ShieldCheck, 
  Compass, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Destination, LocalContribution } from '../types';

interface NearbyViewProps {
  destination: Destination;
  verifiedContributions: LocalContribution[];
  onSelectContribution: (item: LocalContribution) => void;
}

export const NearbyView: React.FC<NearbyViewProps> = ({
  destination,
  verifiedContributions,
  onSelectContribution
}) => {
  const currentItems = verifiedContributions.filter(c => c.destinationId === destination.id);

  // Reference location state
  const [referencePoint, setReferencePoint] = useState<'center' | 'station' | 'gps'>('center');
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(5);

  // Reference points per destination
  const refCoords = {
    mysuru: {
      center: { name: 'Mysuru Palace Central Gate', lat: 12.3051, lng: 76.6551 },
      station: { name: 'Mysuru City Junction Railway Station', lat: 12.3164, lng: 76.6454 }
    },
    kyoto: {
      center: { name: 'Gion Shijo Crossing', lat: 35.0037, lng: 135.7731 },
      station: { name: 'Kyoto Central Station', lat: 34.9858, lng: 135.7588 }
    },
    oaxaca: {
      center: { name: 'Zócalo / Plaza de la Constitución', lat: 17.0606, lng: -96.7256 },
      station: { name: 'Santo Domingo Cultural District', lat: 17.0655, lng: -96.7238 }
    },
    florence: {
      center: { name: 'Piazza del Duomo', lat: 43.7731, lng: 11.2560 },
      station: { name: 'Santa Maria Novella Station', lat: 43.7765, lng: 11.2480 }
    }
  };

  const currentRef = (refCoords as any)[destination.id]?.[referencePoint] || {
    name: destination.name + ' Center',
    lat: destination.coords.lat,
    lng: destination.coords.lng
  };

  // Haversine distance calculator
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Number((R * c).toFixed(1));
  };

  // Calculate distance for each place and sort by proximity
  const nearbyPlaces = currentItems.map(item => {
    const dist = calculateDistanceKm(
      currentRef.lat,
      currentRef.lng,
      item.location.lat,
      item.location.lng
    );
    const walkMin = Math.round(dist * 12); // ~5 km/h
    const driveMin = Math.max(3, Math.round(dist * 3));
    return {
      ...item,
      distanceKm: dist,
      walkTimeMinutes: walkMin,
      driveTimeMinutes: driveMin
    };
  })
  .filter(p => p.distanceKm <= maxRadiusKm)
  .sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-stone-200 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Proximity-Based Discovery
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
          Nearby Verified Radar — {destination.name}
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          Locate verified spots sorted strictly by physical proximity to your location.
        </p>
      </div>

      {/* Control Panel: Reference Point & Radius Slider */}
      <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-stone-600 font-bold mb-1.5 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-amber-700" />
            Origin Reference Point:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setReferencePoint('center')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                referencePoint === 'center'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              City Landmark Center
            </button>
            <button
              onClick={() => setReferencePoint('station')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                referencePoint === 'station'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              Main Transit Hub
            </button>
          </div>
          <p className="text-[11px] text-stone-500 mt-1.5">
            Current anchor: <strong>{currentRef.name}</strong>
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-stone-600 font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              Walking / Travel Radius:
            </label>
            <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
              Within {maxRadiusKm} km
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={maxRadiusKm}
            onChange={(e) => setMaxRadiusKm(Number(e.target.value))}
            className="w-full accent-amber-800 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-1">
            <span>1 km (Easy Stroll)</span>
            <span>5 km</span>
            <span>15 km (Greater Area)</span>
          </div>
        </div>
      </div>

      {/* Nearby Places List */}
      {nearbyPlaces.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
          <MapPin className="w-8 h-8 text-stone-400 mx-auto" />
          <p className="font-bold text-stone-700 text-sm">No verified places within {maxRadiusKm} km</p>
          <p className="text-xs text-stone-500">Try expanding your search radius to discover places further out.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            {nearbyPlaces.length} verified spots found near {currentRef.name}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                onClick={() => onSelectContribution(place)}
                className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-4 items-start group"
              >
                <img
                  src={place.images[0]}
                  alt={place.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                      {place.category.replace('_', ' ')}
                    </span>
                    <span className="font-bold text-amber-800 text-xs flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <MapPin className="w-3 h-3" />
                      {place.distanceKm} km away
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm font-serif group-hover:text-amber-800 transition-colors truncate">
                    {place.title}
                  </h3>

                  <p className="text-xs text-stone-500 truncate">
                    {place.location.name} — {place.location.area}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Footprints className="w-3 h-3 text-emerald-600" />
                      ~{place.walkTimeMinutes} min walk
                    </span>
                    <span className="flex items-center gap-1">
                      <Car className="w-3 h-3 text-stone-400" />
                      ~{place.driveTimeMinutes} min drive
                    </span>
                  </div>

                  <div className="text-[11px] text-amber-950 bg-amber-50/70 p-1.5 rounded-lg truncate italic">
                    "{place.localTip}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
