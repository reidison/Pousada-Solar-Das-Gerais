# Pousada Solar das Gerais - Painel de Informações

Este é o Painel de Informações para hóspedes da Pousada Solar das Gerais, construído com Next.js, Firebase e Tailwind CSS.

## Como acessar o Modo Admin

Para gerenciar o conteúdo (Frigobar, Telefones Úteis, Regulamento), você precisa de um usuário administrador. Por segurança, este usuário deve ser criado manualmente:

### 1. Criar Usuário no Firebase Console
1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. Selecione o projeto correspondente.
3. Vá em **Authentication** > **Users**.
4. Certifique-se de que o método **Email/Password** está ativado em **Sign-in method**.
5. Clique em **Add User** e crie suas credenciais.

### 2. Fazer Login no App
1. No rodapé do site, clique no link discreto **Admin** (ícone de cadeado).
2. Insira o e-mail e senha criados no passo anterior.
3. Uma vez logado, os ícones de edição e botões de gerenciamento aparecerão automaticamente nos modais.

## Tecnologias utilizadas
- Next.js (App Router)
- Firebase Auth & Firestore
- Shadcn UI & Tailwind CSS
- Lucide Icons
