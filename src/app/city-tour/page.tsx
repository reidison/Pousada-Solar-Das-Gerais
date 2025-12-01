'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function CityTourPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={16} className="mr-1" />
        Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-8">City Tour</h1>

      <Card>
        <CardHeader>
          <CardTitle>Programação</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A funcionalidade de programação do City Tour está em desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
