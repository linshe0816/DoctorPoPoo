import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

// Styles for the map container
const containerStyle = {
    width: "100%",
    height: "400px",
};

// Default center position (Taipei 101)
const defaultCenter = {
    lat: 25.033964,
    lng: 121.564468,
};

export default function Map({ location }: { location: { lat: number; lng: number } }) {
    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

    useEffect(() => {
        if (mapRef.current) {
            try {
                // Create or update the AdvancedMarkerElement
                if (markerRef.current) {
                    markerRef.current.position = location;
                } else {
                    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
                        position: location || defaultCenter,
                        map: mapRef.current,
                        title: "Location Marker",
                    });
                }
            } catch (error) {
                console.error("Error creating/updating marker:", error);
            }
        }
    }, [location]);

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location || defaultCenter}
                zoom={15}
                onLoad={(map) => {
                    mapRef.current = map;
                }}
            />
        </LoadScript>
    );
}
