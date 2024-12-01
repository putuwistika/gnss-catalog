// components/PointSearch.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PointSearch = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [searchResults, setSearchResults] = useState([]);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setCoordinates(e.latlng);
      },
    });
    return null;
  };

  const handleSearch = async () => {
    // This will be implemented later with Flask API
    console.log('Searching for coordinates:', coordinates);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Point Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Latitude
              <input
                type="number"
                value={coordinates.lat}
                onChange={(e) => setCoordinates({ ...coordinates, lat: parseFloat(e.target.value) })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Longitude
              <input
                type="number"
                value={coordinates.lng}
                onChange={(e) => setCoordinates({ ...coordinates, lng: parseFloat(e.target.value) })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Search
          </button>
        </div>
        <div className="h-96 rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coordinates.lat, coordinates.lng]} />
            <MapEvents />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default PointSearch;