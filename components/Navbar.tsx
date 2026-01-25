import React from 'react';
import { Terminal, Cpu } from 'lucide-react';
import { NavItem } from '../types';
import useSmoothScroll from '../hooks/useSmoothScroll';
import { Magnetic } from './Magnetic';

const navItems: NavItem[] = [
  { label: './projects', href: '#work' },
  { label: './skills', href: '#about' },
  { label: './contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const scrollTo = useSmoothScroll();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-3 md:px-6 py-3 md:py-4 flex justify-between items-center backdrop-blur-sm bg-espresso-950/90 border-b border-espresso-700">
      <div className="flex items-center gap-2 text-latte-100" data-hover>
        <Terminal className="w-4 h-4 md:w-5 md:h-5 text-accent-orange" />
        <span className="font-mono text-[10px] md:text-sm tracking-tight flex items-center">
          {/* Mobile: Ultra Short Prompt */}
          <span className="md:hidden text-latte-500">~/</span>
          {/* Desktop: Full Prompt */}
          <span className="hidden md:inline text-latte-500">root@aioverse:</span>
          <span className="hidden md:inline text-accent-blue">~</span>
          <span className="text-latte-100">$ ./portfolio</span>
        </span>
      </div>

      <ul className="flex gap-2 md:gap-6 items-center">
        {navItems.map((item) => (
          <li key={item.label}>
            <Magnetic>
              <a
                href={item.href}
                onClick={(e) => scrollTo(e, item.href)}
                className="text-[10px] md:text-xs font-mono text-latte-500 hover:text-accent-orange transition-colors relative group cursor-pointer px-1 md:px-2 py-1 block"
                data-hover
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-orange transition-all group-hover:w-full" />
              </a>
            </Magnetic>
          </li>
        ))}
        <li className="hidden md:flex items-center gap-2 text-[10px] text-latte-500 border border-espresso-700 px-2 py-1 rounded-sm bg-espresso-900 ml-4">
          <Cpu size={12} className="animate-pulse text-green-500" />
          CPU: 12%
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;