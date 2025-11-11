import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WelcomeMessage } from '@/components/welcome-message';
import { InfoCard } from '@/components/info-card';
import { BackToTop } from '@/components/back-to-top';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Coffee, Wifi, Check, Map, Phone, GlassWater } from 'lucide-react';

export default function SolarInfoHubPage() {
  const minibarItems = [
    { item: 'Água Mineral 500ml', price: 'R$ 5,00' },
    { item: 'Refrigerante (lata)', price: 'R$ 7,00' },
    { item: 'Cerveja (long neck)', price: 'R$ 10,00' },
    { item: 'Salgadinho', price: 'R$ 8,00' },
    { item: 'Chocolate', price: 'R$ 6,00' },
  ];

  const infoCards = [
    {
      icon: <Coffee size={28} />,
      title: "Café da Manhã",
      content: (
        <>
          <p>Servido diariamente das</p>
          <p className="font-bold text-lg text-primary">07:30 às 10:00</p>
          <p className="text-sm">Local: Salão de Café</p>
        </>
      ),
    },
    {
      icon: <Wifi size={28} />,
      title: "Wi-Fi",
      content: (
        <>
          <p>Rede:</p>
          <p className="font-bold text-lg text-primary">PousadaSolar</p>
          <p>Senha:</p>
          <p className="font-bold text-lg text-primary">pousada2023</p>
        </>
      ),
    },
    {
      icon: <Check size={28} />,
      title: "Acesso Principal",
      content: (
        <>
          <p>A porta principal utiliza uma senha eletrônica.</p>
          <p>Senha:</p>
          <p className="font-bold text-lg text-primary">1234</p>
        </>
      ),
    },
    {
      icon: <Map size={28} />,
      title: "City Tour",
      content: (
        <>
          <p>Passeio pelos pontos históricos.</p>
          <p>Saídas diárias às <strong>09:00</strong>.</p>
          <p className="text-sm mt-2">Agende na recepção com 1 dia de antecedência.</p>
        </>
      ),
    },
    {
      icon: <Phone size={28} />,
      title: "Fale com a Recepção",
      content: (
        <>
          <p className="mb-4">Precisa de algo? Estamos à disposição no WhatsApp.</p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <a href="https://wa.me/5531999999999" target="_blank" rel="noopener noreferrer">
              Falar pelo WhatsApp
            </a>
          </Button>
        </>
      ),
    },
    {
      icon: <GlassWater size={28} />,
      title: "Frigobar",
      content: (
        <div className="w-full text-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left font-semibold text-primary/80">Item</TableHead>
                <TableHead className="text-right font-semibold text-primary/80">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {minibarItems.map((item) => (
                <TableRow key={item.item}>
                  <TableCell className="text-left py-2">{item.item}</TableCell>
                  <TableCell className="text-right py-2">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col font-body">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8 pt-28 md:pt-32">
        <WelcomeMessage />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {infoCards.map((card, index) => (
            <InfoCard key={index} icon={card.icon} title={card.title}>
              {card.content}
            </InfoCard>
          ))}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
