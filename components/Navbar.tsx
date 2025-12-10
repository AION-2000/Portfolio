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
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-espresso-950/80 border-b border-espresso-700">
      <div className="flex items-center gap-3 text-latte-100" data-hover>
        <Terminal className="w-5 h-5 text-accent-orange" />
        <span className="font-mono text-sm tracking-tight">
          <span className="text-latte-500">root@espresso:</span>
          <span className="text-accent-blue">~</span>
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
                className="text-xs font-mono text-latte-500 hover:text-accent-orange transition-colors relative group cursor-pointer px-2 py-1 block"
                data-hover
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-orange transition-all group-hover:w-full" />
              </a>
            </Magnetic>
          </li>
        ))}
        <li className="hidden md:flex items-center gap-2 text-[10px] text-latte-500 border border-espresso-700 px-2 py-1 rounded-sm bg-espresso-900 ml-4">
            <Cpu size={12} className="animate-pulse text-green-500"/>
            CPU: 12%
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;