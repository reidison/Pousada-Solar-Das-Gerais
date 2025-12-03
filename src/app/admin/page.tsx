
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} className="mr-1" />
          Voltar para a Home
        </Link>
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <Settings size={24} />
          Painel de Administração
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="text-center">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold">Nenhuma ferramenta disponível</h2>
              <p className="text-muted-foreground">Novas opções de gerenciamento aparecerão aqui no futuro.</p>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
