import Link from 'next/link';
import { useState, useEffect } from 'react';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import MobileMenu from './MobileMenu';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg transition-colors duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Fashion<span className="text-yellow-500">Store</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between flex-1 ml-10">
          <nav className="flex items-center space-x-8 text-sm font-medium text-gray-700">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-6">
            <SearchBar />
            <CartIcon />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <CartIcon />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 hover:text-black transition"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
