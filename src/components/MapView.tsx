'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '@/app/lib/supabase';
import type { Store } from '@/types';
import { MapPin } from 'lucide-react';

// Soft Sage & Green colored custom markers for Apple-style look
const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [30, 49],
    iconAnchor: [15, 49],
    popupAnchor: [1, -40],
    shadowSize: [49, 49],
    className: 'selected-marker',
});

interface MapViewInnerProps {
    stores: Store[];
    selectedStoreId: string | null;
    onMarkerClick: (storeId: string) => void;
}

function FlyToStore({ store }: { store: Store | undefined }) {
    const map = useMap();
    useEffect(() => {
        if (store) {
            map.flyTo([store.latitude, store.longitude], 15, { duration: 1 });
        }
    }, [store, map]);
    return null;
}

function MapViewInner({ stores, selectedStoreId, onMarkerClick }: MapViewInnerProps) {
    const selectedStore = stores.find((s) => s.id === selectedStoreId);

    return (
        <MapContainer
            center={[-6.2, 106.816666]}
            zoom={12}
            scrollWheelZoom={true}
            className="h-full w-full rounded-2xl"
            style={{ minHeight: '400px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedStore && <FlyToStore store={selectedStore} />}
            {stores.map((store) => (
                <Marker
                    key={store.id}
                    position={[store.latitude, store.longitude]}
                    icon={store.id === selectedStoreId ? selectedIcon : customIcon}
                    eventHandlers={{
                        click: () => onMarkerClick(store.id),
                    }}
                >
                    <Popup>
                        <div className="min-w-[160px]">
                            <h3 className="text-sm font-bold text-gray-900">{store.name}</h3>
                            <p className="mt-1 text-xs text-gray-500">{store.address}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

interface MapViewProps {
    selectedStoreId: string | null;
    onMarkerClick: (storeId: string) => void;
}

export default function MapView({ selectedStoreId, onMarkerClick }: MapViewProps) {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStores() {
            try {
                const { data, error } = await supabase
                    .from('stores')
                    .select('*');
                if (error) throw error;
                setStores(data || []);
            } catch (err: any) {
                console.error('Error fetching stores:', err?.message || err?.code || JSON.stringify(err));
            } finally {
                setLoading(false);
            }
        }
        fetchStores();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                <div className="flex flex-col items-center gap-3">
                    <MapPin className="h-8 w-8 animate-pulse text-gray-400" />
                    <span className="text-sm text-gray-400">Loading map...</span>
                </div>
            </div>
        );
    }

    return <MapViewInner stores={stores} selectedStoreId={selectedStoreId} onMarkerClick={onMarkerClick} />;
}
