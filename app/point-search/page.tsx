'use client';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { GNSSData, searchByPoint } from '@/services/api';
import "react-datepicker/dist/react-datepicker.css";

export default function PointSearchPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lon: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<GNSSData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNoDataAlert, setShowNoDataAlert] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil((searchResults?.length || 0) / itemsPerPage);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!startDate || !endDate || !coordinates.lat || !coordinates.lon) {
        throw new Error('Please fill all required fields');
      }

      const data = await searchByPoint({
        lat: parseFloat(coordinates.lat),
        lon: parseFloat(coordinates.lon),
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0]
      });

      if (data.length === 0) {
        setShowNoDataAlert(true);
        setSearchResults([]);
      } else {
        setSearchResults(data);
        setCurrentPage(1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNoDataAlert = () => {
    setShowNoDataAlert(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text mb-4">
            Point Search
          </h1>
          <p className="text-gray-300">Search GNSS data by specific coordinates and date range</p>
        </div>

        {/* Search Form */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-purple-500/20 shadow-lg">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Inputs */}
              <div className="relative">
                <label className="block text-purple-300 mb-2">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy-MM-dd"
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white"
                  placeholderText="Select start date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  isClearable
                  required
                  portalId="root-portal"
                />
              </div>
              <div className="relative">
                <label className="block text-purple-300 mb-2">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="yyyy-MM-dd"
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white"
                  placeholderText="Select end date"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  isClearable
                  required
                  portalId="root-portal"
                />
              </div>

              {/* Coordinate Inputs */}
              <div>
                <label className="block text-purple-300 mb-2">Latitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={coordinates.lat}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lat: e.target.value }))}
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white"
                  placeholder="-6.2088"
                />
              </div>
              <div>
                <label className="block text-purple-300 mb-2">Longitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={coordinates.lon}
                  onChange={(e) => setCoordinates(prev => ({ ...prev, lon: e.target.value }))}
                  className="w-full bg-purple-900/30 border border-purple-500/30 rounded-lg px-4 py-3 text-white"
                  placeholder="106.8456"
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
                            transition-all duration-300" />
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* No Data Alert */}
        {showNoDataAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">No Data Available</h3>
              <p className="text-gray-700">
                Sorry, there is no data available for the selected coordinates and date range.
              </p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCloseNoDataAlert}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Table */}
        {searchResults.length > 0 && (
          <div className="animate-fade-in space-y-6">
            <div className="overflow-x-auto rounded-xl border border-purple-500/20 shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Base File</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">File</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Cathour</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Center Coordinates</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Azimuth</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">NLEV</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">Start Coordinates</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">End Coordinates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10 bg-purple-900/20">
                  {paginatedResults.map((result) => (
                    <tr key={result.id} className="hover:bg-purple-900/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-300">{result.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{result.basefile}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{result.file}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{result.formatted_date}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{result.cathour}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {result.clat.toFixed(4)}, {result.clon.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{result.azim}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{result.nlev}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {result.slat.toFixed(4)}, {result.slon.toFixed(4)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {result.elat.toFixed(4)}, {result.elon.toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
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
          </div>
        )}
      </div>
    </div>
  );
}