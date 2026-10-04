
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

import { Logo } from '@/components/icons/logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Bem-vindo, Administrador!",
        description: "Você agora tem permissões para editar o conteúdo.",
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao entrar",
        description: "Verifique suas credenciais e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-solar-cream flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-6 flex items-center text-sm font-semibold text-solar-navy hover:text-solar-navyLight transition-colors">
        <ArrowLeft size={16} className="mr-1.5" />
        Voltar para a Pousada
      </Link>
      
      <div className="mb-6">
        <Logo />
      </div>

      <Card className="w-full max-w-md shadow-xl border border-[#113F52] border-t-4 border-t-[#113F52] rounded-2xl bg-white">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold font-headline text-solar-navy">Área Administrativa</CardTitle>
          <CardDescription className="text-slate-500">
            Acesse o painel para gerenciar os dados da pousada.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@pousada.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-solar-navy hover:bg-solar-navyLight text-white rounded-xl py-2.5 font-semibold transition-colors" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar como Administrador'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
