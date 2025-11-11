import { Logo } from '@/components/icons/logo';
import { QrCodeIcon } from '@/components/icons/qr-code';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16 border-t-4 border-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Pousada Solar das Gerais. <br className="sm:hidden" /> Todos os direitos reservados.
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm mb-2 font-semibold">Acesse Rápido via QR Code</p>
            <a 
              href="https://guiadereservas.com.br/solar-das-gerais/info" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Link para informações da pousada via QR Code"
              className="inline-block p-1 bg-white rounded-md hover:scale-105 transition-transform"
            >
              <QrCodeIcon className="h-20 w-20" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
