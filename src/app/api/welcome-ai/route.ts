import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const guestName = body.guestName || 'Prezado(a) Hóspede';
    const hotelName = body.hotelName || 'Pousada Solar das Gerais';

    const greetingTemplates = [
      `${guestName}, seja muito bem-vindo(a) à ${hotelName}! O clima de 21°C e o ar puro das montanhas de Ouro Preto tornam o dia perfeito para um café colonial e um passeio histórico inesquecível. Sinta-se em casa!`,
      `Olá, ${guestName}! É uma alegria receber você na ${hotelName}. Desfrute do silêncio, da nossa vista para as colinas mineiras e do autêntico acolhimento de Minas Gerais.`,
      `Seja bem-vindo(a), ${guestName}! Preparamos cada cantinho da ${hotelName} com todo o carinho para a sua estadia em Ouro Preto. Aproveite o pão de queijo quentinho e descanse bastante!`,
    ];

    const message = greetingTemplates[Math.floor(Math.random() * greetingTemplates.length)];

    return NextResponse.json({ welcomeMessage: message });
  } catch (error) {
    return NextResponse.json(
      { welcomeMessage: "Seja muito bem-vindo(a) à Pousada Solar das Gerais! Desejamos uma excelente estadia em Ouro Preto." },
      { status: 200 }
    );
  }
}
