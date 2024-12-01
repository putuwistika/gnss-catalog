// components/Footer.tsx
import { Github, Mail, Globe, MapPin, Database } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900/50 border-t border-purple-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
                GNSS Catalog
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Advanced GNSS data search platform for research and analysis. Access comprehensive geospatial data with precision and efficiency.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/point-search" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Point Search
                </Link>
              </li>
              <li>
                <Link href="/region-search" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Region Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Support Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} GNSS Catalog. All rights reserved.
            </p>
            <div className="flex space-x-6 md:justify-end">
              <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Gradient Line */}
        <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-25" />
      </div>
    </footer>
  );
}