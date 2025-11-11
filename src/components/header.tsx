import { Logo } from '@/components/icons/logo';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-20 flex items-center justify-center text-center sm:justify-start sm:text-left">
        <div className="flex items-center gap-3">
          <Logo className="h-16 w-auto" />
        </div>
      </div>
    </header>
  );
}
