import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

export function InfoCard({ icon, title, children, className }: InfoCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden",
      className
    )}>
      <CardHeader className="items-center text-center pt-6">
        <div className="flex items-center justify-center h-16 w-16 bg-accent/10 rounded-full mb-3 text-accent">
          {icon}
        </div>
        <CardTitle className="font-headline text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center items-center text-center text-muted-foreground space-y-1 px-4 pb-6">
        {children}
      </CardContent>
    </Card>
  );
}
