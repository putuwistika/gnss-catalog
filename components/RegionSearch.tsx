// components/RegionSearch.tsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RegionSearch = () => {
  const [bounds, setBounds] = useState({
    north: 0,
    south: 0,
    east: 0,
    west: 0
  });

  const handleSearch = async () => {
    // This will be implemented later with Flask API
    console.log('Searching for region:', bounds);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Region Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                North Latitude
                <input
                  type="number"
                  value={bounds.north}
                  onChange={(e) => setBounds({ ...bounds, north: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                South Latitude
                <input
                  type="number"
                  value={bounds.south}
                  onChange={(e) => setBounds({ ...bounds, south: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                East Longitude
                <input
                  type="number"
                  value={bounds.east}
                  onChange={(e) => setBounds({ ...bounds, east: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                West Longitude
                <input
                  type="number"
                  value={bounds.west}
                  onChange={(e) => setBounds({ ...bounds, west: parseFloat(e.target.value) })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Search Region
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
            <Rectangle
              bounds={[[bounds.south, bounds.west], [bounds.north, bounds.east]]}
              pathOptions={{ color: 'blue' }}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default RegionSearch;