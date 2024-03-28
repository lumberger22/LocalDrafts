import React from 'react';
import { useState } from 'react';
import { GoogleMap, useLoadScript, InfoWindow, Marker } from '@react-google-maps/api';

const API_KEY = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;
const libraries = ['places'];

const Map = ({ lat, long, list, filtered }) => {

  
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapContainerStyle = {
    width: '40vw',
    height: '35vh',
  };

  const center = {
    lat: lat, // default latitude
    lng: long, // default longitude
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const handleMarkerClick = (loc) => {
    setSelectedMarker({
      ...loc,
      lat: loc.latitude,
      lng: loc.longitude,
    });
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={center}
        libraries={libraries}
      >
        {filtered.length > 0 ? (
          filtered.map((loc, index) => (
          <Marker onClick={() => handleMarkerClick(loc)} key={index} position={{ lat: Number(loc.latitude), lng: Number(loc.longitude) }} />
        ))
        ) : (
          list.map((loc, index) => (
            <Marker onClick={() => handleMarkerClick(loc)} key={index} position={{ lat: Number(loc.latitude), lng: Number(loc.longitude) }} />
          ))
        )}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: Number(selectedMarker.lat), lng: Number(selectedMarker.lng) }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <a className='map--marker--link' href={selectedMarker.website_url} target='_blank'>{selectedMarker.name}</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;