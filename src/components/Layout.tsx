import React, { useState, useEffect } from 'react';
import { Menu, Search, X, Instagram } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen, isSearchOpen]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-pearl text-navy font-sans antialiased selection:bg-navy selection:text-white flex flex-col">
      {/* Search Overlay */}
      <div 
        className={`fixed inset-0 z-[110] transition-opacity duration-400 ${isSearchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
        
        {/* Search Panel */}
        <div 
          className={`absolute top-0 left-0 w-full bg-[#eef1f3] transform transition-transform duration-500 ease-in-out ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24 relative">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6 lg:top-10 lg:right-10 text-navy hover:text-cerulean transition-colors">
              <X className="w-8 h-8" strokeWidth={1.5} />
            </button>
            <h2 className="font-serif text-3xl lg:text-4xl text-navy mb-6">What are you looking for?</h2>
            <div className="flex w-full shadow-sm">
              <input 
                type="text" 
                placeholder="Search" 
                className="flex-grow px-6 py-4 text-lg border border-navy/20 focus:outline-none focus:border-navy bg-white text-navy"
                autoFocus={isSearchOpen}
              />
              <button className="bg-navy text-white px-8 flex items-center justify-center hover:bg-[#163254] transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Drawer Overlay */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-400 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsMenuOpen(false)} />
        
        {/* Drawer */}
        <div 
          className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-navy text-pearl transform transition-transform duration-500 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6 lg:p-10 flex flex-col h-full overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center gap-4 mb-16">
              <button onClick={() => setIsMenuOpen(false)} className="text-pearl hover:text-cerulean transition-colors">
                <X className="w-8 h-8" strokeWidth={1.5} />
              </button>
              <Link to="/" className="flex flex-col" onClick={() => setIsMenuOpen(false)}>
                <span className="font-serif text-xl font-bold tracking-tight uppercase">
                  ΔΗΜΗΤΡΑ Κ. ΜΑΡΙΝΗ
                </span>
              </Link>
            </div>

            {/* Primary Links */}
            <ul className="flex flex-col gap-6 mb-10">
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl lg:text-4xl hover:text-cerulean transition-colors">Το Προφίλ</Link></li>
              <li><Link to="/services" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl lg:text-4xl hover:text-cerulean transition-colors">Υπηρεσίες</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl lg:text-4xl hover:text-cerulean transition-colors">Επικοινωνία</Link></li>
            </ul>

            <div className="w-full max-w-[120px] h-px bg-white/30 mb-10"></div>

            {/* Secondary Links */}
            <ul className="flex flex-col gap-5 mb-12">
              <li><Link to="/terms" onClick={() => setIsMenuOpen(false)} className="font-serif text-xl lg:text-2xl hover:text-cerulean transition-colors">Όροι Χρήσης</Link></li>
              <li><Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="font-serif text-xl lg:text-2xl hover:text-cerulean transition-colors">Πολιτική Απορρήτου</Link></li>
            </ul>

            {/* Social & CTA */}
            <div className="mt-auto flex flex-col items-start gap-6">
              <div className="flex gap-4">
                <a href="https://instagram.com/d.marini_lawyer" target="_blank" rel="noreferrer" className="w-12 h-12 bg-cerulean flex items-center justify-center hover:bg-white hover:text-navy transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="bg-[#285e83] text-white px-6 py-2.5 text-sm font-bold hover:bg-cerulean transition-colors duration-300 rounded-full">
                Επικοινωνία
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-pearl/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex flex-col">
              <span className={`font-serif text-xl lg:text-2xl font-bold tracking-tight uppercase transition-colors duration-300 ${isScrolled ? 'text-navy' : 'text-pearl'}`}>
                ΔΗΜΗΤΡΑ Κ. ΜΑΡΙΝΗ
              </span>
              <span className={`font-sans text-[10px] lg:text-xs font-medium tracking-[0.2em] uppercase mt-0.5 transition-colors duration-300 ${isScrolled ? 'text-navy/70' : 'text-pearl/70'}`}>
                Δικηγορικο Γραφειο
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <Link to="/contact" className={`hidden lg:flex items-center justify-center border px-6 py-2.5 text-sm font-semibold tracking-wider uppercase transition-colors duration-300 ${isScrolled ? 'border-navy text-navy hover:bg-navy hover:text-pearl' : 'border-pearl text-pearl hover:bg-pearl hover:text-navy'}`}>
              Επικοινωνια
            </Link>
            <button onClick={() => setIsSearchOpen(true)} className={`p-2 transition-colors duration-300 ${isScrolled ? 'text-navy hover:text-cerulean' : 'text-pearl hover:text-cerulean'}`}>
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => setIsMenuOpen(true)} className={`p-2 transition-colors duration-300 ${isScrolled ? 'text-navy hover:text-cerulean' : 'text-pearl hover:text-cerulean'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <rect x="3" y="6" width="18" height="2" fill="currentColor"/>
                <rect x="3" y="11" width="18" height="2" fill="currentColor"/>
                <rect x="3" y="16" width="18" height="2" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy text-pearl pt-20 pb-10 px-6 border-t border-white/10">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
          <div className="flex flex-col items-center lg:items-start">
            <Link to="/" className="flex flex-col mb-8 text-center lg:text-left">
              <span className="font-serif text-2xl font-bold tracking-tight text-pearl uppercase">
                ΔΗΜΗΤΡΑ Κ. ΜΑΡΙΝΗ
              </span>
              <span className="font-sans text-xs font-medium tracking-[0.2em] uppercase text-pearl/70 mt-1">
                Δικηγορικο Γραφειο
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/d.marini_lawyer" target="_blank" rel="noreferrer" className="w-10 h-10 bg-cerulean flex items-center justify-center hover:bg-white hover:text-navy transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24 text-center sm:text-left">
            <div>
              <ul className="space-y-4 font-serif text-lg">
                <li><Link to="/about" className="hover:text-cerulean transition-colors">Το Προφίλ</Link></li>
                <li><Link to="/services" className="hover:text-cerulean transition-colors">Υπηρεσίες</Link></li>
                <li><Link to="/contact" className="hover:text-cerulean transition-colors">Επικοινωνία</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 opacity-80">Κολιάτσου 34, Κόρινθος</p>
              <p className="mb-2 opacity-80">2741 307 884 | 6950 126 588</p>
              <p className="mb-6 opacity-80">dimitramarinilaw@gmail.com</p>
              <Link to="/contact" className="inline-flex items-center justify-center border border-cerulean text-cerulean px-6 py-2 text-sm font-bold tracking-wider uppercase hover:bg-cerulean hover:text-navy transition-colors duration-300">
                Επικοινωνια
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1920px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60 font-light">
          <p>© {new Date().getFullYear()} Δήμητρα Κ. Μαρίνη. Με την επιφύλαξη παντός δικαιώματος.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white transition-colors">Όροι Χρήσης</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Πολιτική Απορρήτου</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
