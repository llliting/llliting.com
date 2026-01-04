import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface NavBarProps {
  showNyBackground: boolean;
  setShowNyBackground: (show: boolean) => void;
  onHoverName?: (hovering: boolean) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ showNyBackground, setShowNyBackground, onHoverName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || isOpen ? 'bg-[#1a120b]/80 backdrop-blur-md shadow-none' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="relative flex items-center justify-center h-24">

          {/* Logo - Absolute Left */}
          <div className="absolute left-0 flex-shrink-0 z-20">
            <Link
              to="/"
              className={`text-lg font-light tracking-widest hover:text-white transition-opacity duration-500 ${isHome && !scrolled && !isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              onMouseEnter={() => onHoverName && onHoverName(true)}
              onMouseLeave={() => onHoverName && onHoverName(false)}
            >
              LH
            </Link>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center space-x-16">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      className={`relative text-sm font-normal tracking-widest uppercase transition-all duration-300 ${location.pathname.startsWith(item.path)
                        ? 'text-white'
                        : 'text-secondary hover:text-primary'
                        }`}
                    >
                      {item.label}
                      <span className={`absolute left-1/2 -translate-x-1/2 -bottom-2 h-[1px] bg-primary/50 transition-all duration-300 ${location.pathname.startsWith(item.path) ? 'w-4' : 'w-0 group-hover:w-4'
                        }`}></span>
                    </button>

                    {/* Dropdown */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-0 translate-y-2">
                      <div className="bg-[#1a120b]/95 backdrop-blur-md border border-white/10 rounded-sm py-4 min-w-[200px] shadow-2xl flex flex-col gap-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.path}
                            className={`px-6 py-3 text-xs font-light tracking-widest uppercase transition-colors hover:bg-white/5 ${location.pathname === subItem.path
                              ? 'text-white'
                              : 'text-secondary hover:text-primary'
                              }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`relative text-sm font-normal tracking-widest uppercase transition-all duration-300 group ${location.pathname === item.path
                      ? 'text-white'
                      : 'text-secondary hover:text-primary'
                      }`}
                  >
                    {item.label}
                    <span className={`absolute left-1/2 -translate-x-1/2 -bottom-2 h-[1px] bg-primary/50 transition-all duration-300 ${location.pathname === item.path ? 'w-4' : 'w-0 group-hover:w-4'
                      }`}></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* View Toggle Button & Mobile Menu Button - Absolute Right */}
          <div className="absolute right-0 flex items-center gap-4 z-20">
            {/* View Toggle Button */}
            <button
              onClick={() => setShowNyBackground(!showNyBackground)}
              className="text-secondary hover:text-white focus:outline-none p-2 transition-colors duration-300"
              aria-label="Toggle background view"
              title={showNyBackground ? "Switch to Abstract View" : "Switch to Scene View"}
            >
              {showNyBackground ? <Sparkles size={20} /> : <Mountain size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-secondary hover:text-white focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-[#1a120b] z-10 transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } top-0 pt-24`}
      >
        <div className="px-6 py-8 space-y-8 flex flex-col items-center justify-start h-full">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-4">
              {item.subItems ? (
                <>
                  <div className="text-3xl font-light tracking-widest uppercase text-secondary">
                    {item.label}
                  </div>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={subItem.path}
                      className={`text-xl font-light tracking-widest uppercase block transition-colors ${location.pathname === subItem.path ? 'text-white' : 'text-secondary/70 hover:text-white'
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`text-3xl font-light tracking-widest uppercase block transition-colors ${location.pathname === item.path ? 'text-white' : 'text-secondary hover:text-white'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};