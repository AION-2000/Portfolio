import React, { useState } from 'react';
import { Terminal, Cpu, Menu, X } from 'lucide-react';
import { NavItem } from '../types';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { Magnetic } from './Magnetic';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems: NavItem[] = [
  { label: './projects', href: '#work' },
  { label: './services', href: '/services' },
  { label: './skills', href: '#about' },
  { label: './contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const scrollTo = useSmoothScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        e.preventDefault();
        navigate('/' + href);
      } else {
        scrollTo(e, href);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center backdrop-blur-md bg-espresso-950/80 border-b border-espresso-800">
      <div className="flex items-center gap-2 text-latte-100" data-hover>
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <Terminal className="w-4 h-4 md:w-5 md:h-5 text-accent-orange" />
          <span className="font-mono text-xs md:text-sm tracking-tight flex items-center">
            <span className="md:hidden text-latte-500">~/</span>
            <span className="hidden md:inline text-latte-500">root@aioverse:</span>
            <span className="hidden md:inline text-accent-blue">~</span>
            <span className="text-latte-100 ml-1">$ ./portfolio</span>
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center">
        {navItems.map((item) => (
          <li key={item.label}>
            <Magnetic>
              {item.href.startsWith('/') ? (
                <Link
                  to={item.href}
                  className="text-xs font-mono text-latte-500 hover:text-accent-orange transition-colors relative group cursor-pointer px-2 py-1 block"
                  data-hover
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-orange transition-all group-hover:w-full" />
                </Link>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-xs font-mono text-latte-500 hover:text-accent-orange transition-colors relative group cursor-pointer px-2 py-1 block"
                  data-hover
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-orange transition-all group-hover:w-full" />
                </a>
              )}
            </Magnetic>
          </li>
        ))}
        <li className="flex items-center gap-2 text-[10px] text-latte-500 border border-espresso-700 px-2 py-1 rounded-sm bg-espresso-900 ml-4">
          <Cpu size={12} className="animate-pulse text-green-500" />
          CPU: 12%
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-latte-100 p-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-espresso-950 border-b border-espresso-800 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      className="text-lg font-mono text-latte-100 hover:text-accent-orange transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-lg font-mono text-latte-100 hover:text-accent-orange transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-xs text-latte-500 border border-espresso-800 px-3 py-2 rounded-sm bg-espresso-900 self-start">
              <Cpu size={14} className="animate-pulse text-green-500" />
              STATUS: NOMINAL
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;