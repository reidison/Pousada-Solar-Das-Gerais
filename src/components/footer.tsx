
'use client';

import { Instagram, Lock } from 'lucide-react';
import Link from 'next/link';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { user } = useUser();
  const auth = useAuth();
  
  const isAdmin = user && !user.isAnonymous;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-16 border-t-4 border-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Pousada Solar das Gerais.
            </p>
            {isAdmin ? (
               <Button variant="link" onClick={handleLogout} className="text-primary-foreground p-0 h-auto text-xs opacity-50 hover:opacity-100">
                  Sair do Modo Admin
               </Button>
            ) : (
              <Link href="/login" className="flex items-center gap-1 text-[10px] opacity-30 hover:opacity-100 transition-opacity">
                <Lock size={10} />
                Admin
              </Link>
            )}
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
