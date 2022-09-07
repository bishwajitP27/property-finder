/* eslint-disable no-undef */
import "./index.css";

import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useContext, useState } from "react";

import { PropertyContext } from "../../context/PropertyContext";
const mapStyle = { width: "100%", height: "100vh" };
const center = { lat: 48.8504757, lng: 2.3595983 };

export default function Map() {
  const { propertyList } = useContext(PropertyContext);
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY });
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const markers = propertyList.map(({ geoCode, propertyId: id, propertyMetadata }) => {
    const { latitude, longitude } = { ...geoCode };
    const { headline } = { ...propertyMetadata };

    return (
      <Marker
        key={id}
        position={{ lat: latitude, lng: longitude }}
        icon={{
          path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
          fillColor: "#2f67a1",
          fillOpacity: 1,
          anchor: new google.maps.Point(0, 0),
          strokeWeight: 2,
          scale: 0.5,
          strokeColor: "white",
        }}
        mapStyle={{ border: "2px solid white" }}
        onClick={() => handleActiveMarker(id)}
      >
        {activeMarker === id ? (
          <InfoWindow onCloseClick={() => setActiveMarker(null)}>
            <div>{headline}</div>
          </InfoWindow>
        ) : null}
      </Marker>
    );
  });

  if (!isLoaded) return <div>Loading!!</div>;

  return (
    <main className="map-container">
      <GoogleMap center={center} zoom={12} mapContainerStyle={mapStyle}>
        {markers}
      </GoogleMap>
    </main>
  );
}
