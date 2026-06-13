/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Copyright } from 'lucide-react';

export default function FooterNav() {
  const links = [
    { label: 'GitHub', href: 'https://github.com/arsalanqasim' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arsalan-qasim-416a7b258' },
    { label: 'X', href: 'https://x.com/' },
    { label: 'Email', href: 'mailto:arsalanqasim400@gmail.com' }
  ];

  return (
    <footer id="footer-navigation" className="w-full border-t border-[#21262d] bg-[#0a0e14] py-8 mt-12">
      <div className="mx-auto max-w-[1240px] px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8b919d]">
        
        {/* Left copyright with precision disclaimer */}
        <div className="flex items-center gap-1.5 text-center md:text-left select-none">
          <Copyright className="h-3.5 w-3.5 text-[#414752]" />
          <span>© 2024 Arsalan Qasim. Built for engineering precision.</span>
        </div>

        {/* Right contact gates social grid */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#58a6ff] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
