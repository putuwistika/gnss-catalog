// components/Header.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe2, MenuIcon, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/point-search', label: 'Point Search' },
    { href: '/region-search', label: 'Region Search' },
    { href: '/about', label: 'About' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
              GNSS Catalog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? 'bg-purple-600/20 text-purple-400 shadow-lg shadow-purple-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-purple-600/20 text-purple-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-25" />
    </header>
  );
}