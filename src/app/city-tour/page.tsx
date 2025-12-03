'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CityTourPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" />
          Voltar
        </Link>
      </header>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-2">City Tour em Ouro Preto</h1>
        <p className="text-lg text-muted-foreground">Descubra as maravilhas da nossa cidade histórica.</p>
      </div>

       <div className="text-center py-12">
          <Card>
              <CardContent className="p-8">
                  <h2 className="text-xl font-semibold mb-2">Em breve</h2>
                  <p className="text-muted-foreground">Estamos preparando um roteiro incrível para você. Volte em breve!</p>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
