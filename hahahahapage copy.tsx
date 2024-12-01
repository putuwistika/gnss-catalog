// app/region-search/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Calendar, XCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";

// Components
interface SearchResult {
  id: number;
  date: string;
  latitude: number;
  longitude: number;
  fileName: string;
  fileSize: string;
  status: string;
}

interface AlertProps {
  message: string;
  onClose: () => void;
}

// Alert Component
const Alert = ({ message, onClose }: AlertProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Search Result</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <XCircle size={24} />
        </button>
      </div>
      <div className="mb-6">
        <p className="text-gray-300">{message}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

// Map Component
// Ubah import map di bagian atas file
const GnssMap = dynamic(() => import('../../components/GnssMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-800/50 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>
  )
});

export default function RegionSearchPage() {
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [coordinates, setCoordinates] = useState({
    startLat: "",
    endLat: "",
    startLon: "",
    endLon: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate coordinates
    const startLat = parseFloat(coordinates.startLat);
    const endLat = parseFloat(coordinates.endLat);
    const startLon = parseFloat(coordinates.startLon);
    const endLon = parseFloat(coordinates.endLon);

    if (startLat > endLat || startLon > endLon) {
      setAlertMessage('Start coordinates must be less than end coordinates.');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3;

      if (shouldFail) {
        setAlertMessage('No data found for the specified region. Please try different parameters.');
        setShowAlert(true);
        setSearchResults([]);
      } else {
        const dummyData: SearchResult[] = Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          date: '2024-03-15',
          latitude: startLat + Math.random() * (endLat - startLat),
          longitude: startLon + Math.random() * (endLon - startLon),
          fileName: `GNSS_DATA_${i + 1}.zip`,
          fileSize: '2.5 MB',
          status: 'Available'
        }));
        setSearchResults(dummyData);
      }
      setLoading(false);
    }, 1500);
  };

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil((searchResults?.length || 0) / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate map center
  const mapCenter = searchResults.length > 0
    ? [
        searchResults.reduce((sum, result) => sum + result.latitude, 0) / searchResults.length,
        searchResults.reduce((sum, result) => sum + result.longitude, 0) / searchResults.length
      ] as [number, number]
    : [-2.5489, 118.0149] as [number, number]; // Indonesia center

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text mb-4">
            Region Search
          </h1>
          <p className="text-gray-300">Search GNSS data by region coordinates and date range</p>
        </div>

        {/* Search Form */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-purple-500/20
                      shadow-[0_0_20px_rgba(124,58,237,0.2)] animate-slide-up">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Date Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-purple-300 mb-2">Start Date</label>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:border-purple-500 transition-colors"
                    placeholderText="Select start date"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    isClearable
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
              <div className="relative">
                <label className="block text-purple-300 mb-2">End Date</label>
                <div className="relative">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="yyyy-MM-dd"
                    className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:border-purple-500 transition-colors"
                    placeholderText="Select end date"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    isClearable
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Coordinate Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-purple-300 mb-2">Start Latitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={coordinates.startLat}
                  onChange={(e) => setCoordinates({...coordinates, startLat: e.target.value})}
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white
                           focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="-6.2088"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-2">End Latitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={coordinates.endLat}
                  onChange={(e) => setCoordinates({...coordinates, endLat: e.target.value})}
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white
                           focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="-6.1088"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-2">Start Longitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={coordinates.startLon}
                  onChange={(e) => setCoordinates({...coordinates, startLon: e.target.value})}
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white
                           focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="106.8456"
                  required
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-2">End Longitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={coordinates.endLon}
                  onChange={(e) => setCoordinates({...coordinates, endLon: e.target.value})}
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white
                           focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="106.9456"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative px-8 py-4 text-white text-lg rounded-xl overflow-hidden
                       shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300
                       hover:shadow-[0_0_30px_rgba(124,58,237,0.8)] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600
                            hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500
                            transition-all duration-300"></div>
              <span className="relative flex items-center justify-center">
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  'Search Data'
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Results Section */}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Table Section */}
            <div className="overflow-x-auto rounded-xl border border-purple-500/20 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="px-6 py-4 text-left text-purple-300">Date</th>
                    <th className="px-6 py-4 text-left text-purple-300">Coordinates</th>
                    <th className="px-6 py-4 text-left text-purple-300">File Name</th>
                    <th className="px-6 py-4 text-left text-purple-300">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {paginatedResults.map((result) => (
                    <tr key={result.id} className="bg-purple-900/20 hover:bg-purple-900/30 transition-colors">
                      <td className="px-6 py-4 text-gray-300">{result.date}</td>
                      <td className="px-6 py-4 text-gray-300">
                        {result.latitude.toFixed(4)}, {result.longitude.toFixed(4)}
                      </td>
                      <td className="px-6 py-4 text-blue-400">
                        {result.fileName}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Map Section */}
            <div className="h-[600px] rounded-xl border border-purple-500/20 shadow-lg overflow-hidden">
            {mounted && searchResults.length > 0 && (
                <GnssMap 
                  searchResults={searchResults}
                  center={mapCenter}
                />
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {searchResults.length > 0 && totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-purple-900/30 text-purple-300 hover:bg-purple-900/50
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-purple-900/30 text-purple-300 hover:bg-purple-900/50
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Error Alert */}
        {showAlert && (
          <Alert 
            message={alertMessage} 
            onClose={() => setShowAlert(false)} 
          />
        )}
      </div>
    </div>
  );
}