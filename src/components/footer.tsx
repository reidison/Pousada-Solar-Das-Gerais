'use client';

import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16 border-t-4 border-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Pousada Solar das Gerais.
            </p>
          </div>
          <div className="text-center">
             <a 
              href="https://www.instagram.com/pousadasolardasgeraisop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-semibold hover:text-accent transition-colors"
            >
              <Instagram size={20} />
              <span>@pousadasolardasgeraisop</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
