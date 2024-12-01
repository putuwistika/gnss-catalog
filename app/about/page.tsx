// app/about/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { Globe2, Search, Map, Database, Code2 } from 'lucide-react';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-12">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text mb-6">
            About GNSS Catalog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive search platform designed for efficient GNSS data retrieval and analysis
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Point Search</h3>
            <p className="text-gray-300">
              Search GNSS data using specific coordinates, enabling precise location-based data retrieval.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <Map className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Region Search</h3>
            <p className="text-gray-300">
              Search data within specified geographical regions with interactive map visualization.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Data Management</h3>
            <p className="text-gray-300">
              Efficient handling of large GNSS datasets with optimized compression and retrieval.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Global GNSS data coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Advanced search algorithms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Interactive map visualization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span>Efficient data compression</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technologies</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Frontend</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>Next.js</li>
                    <li>React</li>
                    <li>TypeScript</li>
                    <li>TailwindCSS</li>
                  </ul>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Backend</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>Python</li>
                    <li>Flask</li>
                    <li>PostgreSQL</li>
                    <li>PostGIS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-6">
            Have questions or need support? We're here to help.
          </p>
          <div className="inline-flex gap-4">
            <a
              href="mailto:support@gnsscatalog.com"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Email Support
            </a>
            <a
              href="#documentation"
              className="px-6 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-900/30 transition-colors"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}