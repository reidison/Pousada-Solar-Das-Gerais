
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WelcomeMessage } from '@/components/welcome-message';
import { InfoCard } from '@/components/info-card';
import { BackToTop } from '@/components/back-to-top';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Coffee, Wifi, Check, Map, Phone, GlassWater, KeyRound, PhoneCall, BookText } from 'lucide-react';

export default function SolarInfoHubPage() {
  const minibarItems = [
    { item: 'Batata Pringles 109g', price: 'R$ 20,00' },
    { item: 'Batata Raiz do Bem 80g', price: 'R$ 10,00' },
    { item: 'Pimentinha 100g', price: 'R$ 10,00' },
    { item: 'Pele Pururuca 70g', price: 'R$ 10,00' },
    { item: 'Barra de Chocolate 80g', price: 'R$ 10,00' },
    { item: 'Biscoito LOOK 55g', price: 'R$ 10,00' },
    { item: 'Biscoito Clube Social 23,5g', price: 'R$ 3,50' },
    { item: 'Tridente 18g', price: 'R$ 5,00' },
    { item: 'Garrafa de Vinho', price: 'R$ 60,00' },
    { item: 'Lata de Cerveja', price: 'R$ 10,00' },
    { item: 'Lata de Refrigerante', price: 'R$ 7,00' },
    { item: 'Água s/ Gás', price: 'R$ 5,00' },
    { item: 'Água c/ Gás', price: 'R$ 5,00' },
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
      icon: <KeyRound size={28} />,
      title: "Acesso Principal",
      content: (
        <>
          <p>A porta principal utiliza uma senha eletrônica.</p>
          <p>Senha:</p>
          <p className="font-extrabold text-3xl text-primary flex items-center justify-center gap-0.5">
            0525<Check size={36} className="text-green-600" strokeWidth={3.5} />
          </p>
        </>
      ),
    },
    {
      icon: <Map size={28} />,
      title: "City Tour",
      content: (
        <>
          <p>Passeio pelos pontos históricos.</p>
          <p>Saídas diárias às <strong>10:00</strong>.</p>
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
            <a href="https://wa.me/55313105268" target="_blank" rel="noopener noreferrer">
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
    {
      icon: <PhoneCall size={28} />,
      title: "Serviços e Locais Úteis",
      content: (
        <div className="text-sm text-left w-full space-y-2">
          <p>• Farmácia Drogaria Brasil</p>
          <p>• Farmácia Araújo (Praça Tiradentes)</p>
          <p>• Farmácia Perpétuo Socorro (Delivery)</p>
          <p>• Unimed</p>
          <p>• UPA Dom Orione</p>
          <p>• Supermercado Estela da Barra</p>
          <p>• Academia Powerfit</p>
          <p>• Horários de Missas</p>
          <p>• Agências Bancárias</p>
          <p>• App de mobilidade: Pam Pam, 2V</p>
          <p>• Programação de Shows</p>
        </div>
      ),
    },
    {
      icon: <BookText size={28} />,
      title: "Nosso Regulamento",
      content: (
        <p className="text-sm">Em breve...</p>
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
