import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { MapPin, BedDouble, Clock } from "lucide-react";

// Fix default marker icons for webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const universityIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const accommodationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Accommodation {
  id: string;
  name: string;
  city: string;
  type: string;
  property_type: string;
  price_per_month: number;
  latitude: number | null;
  longitude: number | null;
  travel_distance?: string;
  room_types?: any;
  amenities?: any;
}

interface University {
  id: string;
  name: string;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface AccommodationMapProps {
  accommodations: Accommodation[];
  universities?: University[];
  onSelect?: (a: Accommodation) => void;
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions.map(([lat, lng]) => [lat, lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [positions, map]);
  return null;
}

function parseJsonArray(val: any): string[] {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try { const p = JSON.parse(val); return Array.isArray(p) ? p : []; } catch { return []; }
  }
  return [];
}

export function AccommodationMap({ accommodations, universities = [], onSelect }: AccommodationMapProps) {
  const mappable = accommodations.filter((a) => a.latitude && a.longitude);
  const uniMappable = universities.filter((u) => u.latitude && u.longitude);

  // Kuala Lumpur default center
  const defaultCenter: [number, number] = [3.1390, 101.6869];

  const allPositions: [number, number][] = [
    ...mappable.map((a) => [a.latitude!, a.longitude!] as [number, number]),
    ...uniMappable.map((u) => [u.latitude!, u.longitude!] as [number, number]),
  ];

  if (mappable.length === 0 && uniMappable.length === 0) {
    return (
      <div className="h-[500px] rounded-xl border bg-muted/30 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MapPin className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No locations with coordinates</p>
          <p className="text-sm">Add latitude & longitude to accommodations in the admin panel to see them on the map.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[500px] rounded-xl overflow-hidden border shadow-sm">
      <MapContainer
        center={allPositions.length > 0 ? allPositions[0] : defaultCenter}
        zoom={12}
        className="h-full w-full z-0"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allPositions.length > 1 && <FitBounds positions={allPositions} />}

        {/* University markers */}
        {uniMappable.map((u) => (
          <Marker key={`uni-${u.id}`} position={[u.latitude!, u.longitude!]} icon={universityIcon}>
            <Popup>
              <div className="text-sm min-w-[180px]">
                <p className="font-bold text-primary">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.city} • University</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Accommodation markers */}
        {mappable.map((a) => {
          const rooms = parseJsonArray(a.room_types);
          return (
            <Marker key={`acc-${a.id}`} position={[a.latitude!, a.longitude!]} icon={accommodationIcon}>
              <Popup>
                <div className="text-sm min-w-[200px] space-y-1.5">
                  <p className="font-bold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.city} • {a.type}</p>
                  {a.travel_distance && (
                    <p className="text-xs flex items-center gap-1"><Clock className="h-3 w-3" /> {a.travel_distance}</p>
                  )}
                  {rooms.length > 0 && (
                    <p className="text-xs flex items-center gap-1"><BedDouble className="h-3 w-3" /> {rooms.join(", ")}</p>
                  )}
                  <p className="font-bold text-secondary">RM {Number(a.price_per_month).toLocaleString()}/mo</p>
                  {onSelect && (
                    <button
                      onClick={() => onSelect(a)}
                      className="text-xs text-primary font-semibold hover:underline mt-1"
                    >
                      View Details →
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
