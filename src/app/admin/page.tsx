
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Map, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map size={20} />
              Gerenciar City Tour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Adicione, edite ou remova os pontos turísticos exibidos na página do City Tour.</p>
            <Button asChild>
              <Link href="/admin/city-tour">
                Acessar
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Futuros cards de administração podem ser adicionados aqui */}
        
      </div>
    </div>
  );
}
