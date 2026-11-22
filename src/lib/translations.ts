export type Locale = 'pt' | 'en';

export type Translation = {
  welcomeMessage: {
    title: string;
    subtitle: string;
  };
  infoCards: {
    breakfast: {
      title: string;
      line1: string;
      line2: string;
    };
    wifi: {
      title: string;
      line1: string;
      line2: string;
      networkName: string;
      password: string;
    };
    mainAccess: {
      title: string;
      line1: string;
      line2: string;
    };
    cityTour: {
      title: string;
      description: string;
      meta: string;
      button: string;
    };
    reception: {
      title: string;
      line1: string;
      button: string;
    };
    minibar: {
      title: string;
      button: string;
    };
    usefulPhones: {
      title: string;
      button: string;
    };
    regulation: {
      title: string;
      button: string;
    };
  };
  minibarModal: {
    title: string;
    description: string;
    tableHeaderItem: string;
    tableHeaderPrice: string;
    loading: string;
    addItemButton: string;
    addItemNamePlaceholder: string;
    addItemPricePlaceholder: string;
    importButton: string;
    importingButton: string;
    importToastTitle: string;
    importToastDescription: string;
    importSuccessToastTitle: string;
    importSuccessToastDescription: string;
    importErrorToastTitle: string;
    importErrorToastDescription: string;
    deleteConfirmTitle: string;
    deleteConfirm: (itemName: string) => string;
    replaceConfirm: string;
    deleteButton: string;
    cancelButton: string;
  };
  regulationModal: {
    title: string;
    description: string;
    placeholder: string;
    confirmButton: string;
    successToastTitle: string;
    successToastDescription: string;
    loading: string;
    defaultText: string;
  };
  cityTourModal: {
    title: string;
    description: string;
    placeholder: string;
    confirmButton: string;
    successToastTitle: string;
    successToastDescription: string;
    addSlideButton: string;
    deleteSlideButton: string;
    saveChangesButton: string;
    savingButton: string;
    imagesTitle: string;
    addImageButton: string;
    imageUrlPlaceholder: string;
    saveSuccessToastTitle: string;
    saveErrorToastTitle: string;
    deleteSuccessToastTitle: string;
    deleteErrorToastTitle: string;
    deleteConfirmTitle: string;
    deleteConfirmDescription: string;
  };
  usefulServicesModal: {
    title: string;
    description: string;
    loading: string;
    addCategoryButton: string;
    newCategoryPlaceholder: string;
    importButton: string;
    importingButton: string;
    deleteCategoryConfirm: (categoryName: string) => string;
    saveButton: string;
    cancelButton: string;
    deleteButton: string;
    addServiceButton: string;
    addServiceItemNamePlaceholder: string;
    addServiceItemAddressPlaceholder: string;
    addServiceItemPhonePlaceholder: string;
    addServiceItemWebsitePlaceholder: string;
    importToastTitle: string;
    importToastDescription: string;
    importSuccessToastTitle: string;
    importSuccessToastDescription: string;
    importErrorToastTitle: string;
    importErrorToastDescription: string;
    deleteConfirmTitle: string;
    deleteConfirm: (itemName: string) => string;
    phoneNotAvailable: string;
    untitledCategory: string;
    untitledItem: string;
    replaceConfirm: string;
  };
  lodgeConfigModal: {
    title: string;
    description: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    breakfastHoursLabel: string;
    breakfastHoursPlaceholder: string;
    breakfastLocationLabel: string;
    breakfastLocationPlaceholder: string;
    socialMediaLabel: string;
    socialMediaPlaceholder: string;
    copyrightLabel: string;
    copyrightPlaceholder: string;
    heroImageLabel: string;
    heroImagePlaceholder: string;
    footerImageLabel: string;
    footerImagePlaceholder: string;
    saveButton: string;
    savingButton: string;
    successToastTitle: string;
    successToastDescription: string;
    adminButton: string;
  };
  cityTourPage: {
    backToDashboard: string;
    kicker: string;
    headline: string;
    lead: string;
    photoAlt: string;
    primaryCta: string;
    metrics: {
      durationLabel: string;
      durationValue: string;
      durationSub: string;
      departuresLabel: string;
      departuresValue: string;
      departuresSub: string;
      priceLabel: string;
      priceValue: string;
      priceSub: string;
      bookingLabel: string;
      bookingValue: string;
      bookingSub: string;
    };
    discountBanner: {
      eyebrow: string;
      title: string;
      description: string;
      chooseTimeLabel: string;
      ctaButton: string;
      whatsappMessage: (time: string) => string;
    };
    itinerary: {
      sectionTitle: string;
      sectionSubtitle: string;
      scheduleNote: string;
      filterAll: string;
      filterStops: string;
      filterPanoramic: string;
      typeStop: string;
      typePanoramic: string;
      typeDeparture: string;
      stops: {
        number: string;
        title: string;
        type: 'departure' | 'stop' | 'panoramic';
        timing: string;
        description: string;
      }[];
    };
    pricing: {
      title: string;
      referencePriceTitle: string;
      referencePriceText: string;
      discountNote: string;
      includedTitle: string;
      includedItems: string[];
      notIncludedTitle: string;
      notIncludedItems: string[];
      disclaimer: string;
    };
    contacts: {
      title: string;
      receptionLabel: string;
      receptionNote: string;
      receptionButton: string;
      tipsTitle: string;
      tips: string[];
    };
  };
};

export const translations: Record<Locale, Translation> = {
  pt: {
    welcomeMessage: {
      title: "Bem-vindo(a) à Pousada Solar das Gerais!",
      subtitle: "Horários, comodidades e informações para você aproveitar ao máximo sua estadia conosco.",
    },
    infoCards: {
      breakfast: {
        title: "Café da Manhã",
        line1: "Servido diariamente das 7:30h às 10h",
        line2: "Local: Salão de Café",
      },
      wifi: {
        title: "Wi-Fi",
        line1: "Rede:",
        line2: "Senha:",
        networkName: "Pousada_Solar_Das_Gerais",
        password: "pousada2023",
      },
      mainAccess: {
        title: "Acesso Principal",
        line1: "A porta da recepção utiliza uma senha eletrônica.",
        line2: "Senha:",
      },
      cityTour: {
        title: "City Tour",
        description: "Passeio de jardineira de época pelo Centro Histórico de Ouro Preto. Hóspedes e grupos têm desconto reservando no balcão da recepção.",
        meta: "3h a 4h · Saídas 9h, 10h e 15h · Busca na pousada",
        button: "Ver a programação",
      },
      reception: {
        title: "Fale com a Recepção",
        line1: "Precisa de algo? Estamos à disposição no WhatsApp.",
        button: "Atendimento",
      },
      minibar: {
        title: "Frigobar",
        button: "Ver a lista",
      },
      usefulPhones: {
        title: "Telefones Úteis",
        button: "Ver Lista Completa",
      },
      regulation: {
        title: "Regulamento Interno",
        button: "Ler",
      },
    },
    minibarModal: {
      title: 'Itens do Frigobar',
      description: 'Confira os itens disponíveis no frigobar.',
      tableHeaderItem: 'Item',
      tableHeaderPrice: 'Preço',
      loading: 'Carregando...',
      addItemButton: 'Adicionar Item',
      addItemNamePlaceholder: 'Nome do item',
      addItemPricePlaceholder: 'Preço',
      importButton: 'Importar Lista Padrão',
      importingButton: 'Importando...',
      importToastTitle: 'Importando itens...',
      importToastDescription: 'Por favor, aguarde.',
      importSuccessToastTitle: 'Sucesso!',
      importSuccessToastDescription: 'Itens do frigobar importados com sucesso.',
      importErrorToastTitle: 'Erro na importação',
      importErrorToastDescription: 'Não foi possível importar a lista de itens.',
      deleteConfirmTitle: 'Confirmar Exclusão',
      deleteConfirm: (itemName) => `Tem certeza que deseja excluir "${itemName}"?`,
      replaceConfirm: 'Isso substituirá todos os itens existentes. Deseja continuar?',
      deleteButton: 'Sim',
      cancelButton: 'Cancelar',
    },
    regulationModal: {
      title: 'Regulamento Interno',
      description: 'Normas de convivência da Pousada Solar das Gerais',
      placeholder: 'Digite o regulamento aqui...',
      confirmButton: 'Confirmar',
      successToastTitle: 'Sucesso!',
      successToastDescription: 'O regulamento foi atualizado.',
      loading: 'Carregando...',
      defaultText: `INTERNET – WI-FI\nRede: Pousada_Solar_Das_Gerais \nSenha: pousada2023\n\nNORMAS E ORIENTAÇÕES:\n1. HORÁRIOS: Check-in a partir das 14:00h e Check-out até as 12:00h.\n2. CAFÉ DA MANHÃ: Servido diariamente das 07:30h às 10:00h no Salão de Café.\n3. SILÊNCIO: Solicitamos silêncio entre 22:00h e 08:00h para o conforto de todos.\n4. TABAGISMO: É terminantemente proibido fumar nos quartos e dependências internas.\n5. ORIENTAÇÕES DE SAÍDA: Ao sair, deixar a chave na recepção. No check out, verifique se não está esquecendo algum pertence no quarto.\n6. ECONOMIA: Pedimos a gentileza de desligar luzes, TV e aparelhos ao sair do quarto.\n7. DANOS: Eventuais danos ao enxoval ou estrutura serão debitados no checkout.`,
    },
    cityTourModal: {
      title: 'Programação do City Tour',
      description: 'Adicione, edite ou remova os slides da programação do city tour.',
      placeholder: 'Descreva este ponto do passeio...',
      confirmButton: 'Salvar Alterações',
      successToastTitle: 'Sucesso!',
      successToastDescription: 'A programação do City Tour foi atualizada.',
      addSlideButton: 'Adicionar Slide',
      deleteSlideButton: 'Excluir Slide',
      saveChangesButton: 'Salvar Alterações',
      savingButton: 'Salvando...',
      imagesTitle: 'Imagens',
      addImageButton: 'Adicionar Imagem',
      imageUrlPlaceholder: 'Cole a URL da imagem aqui (link direto)',
      saveSuccessToastTitle: 'Programação salva com sucesso!',
      saveErrorToastTitle: 'Erro ao salvar a programação.',
      deleteSuccessToastTitle: 'Slide excluído com sucesso!',
      deleteErrorToastTitle: 'Erro ao excluir o slide.',
      deleteConfirmTitle: 'Confirmar Exclusão',
      deleteConfirmDescription: 'Tem certeza que deseja excluir este slide? Esta ação não pode ser desfeita.',
    },
    usefulServicesModal: {
      title: 'Serviços e Contatos Úteis',
      description: 'Uma lista de contatos importantes em Ouro Preto para sua conveniência.',
      loading: 'Carregando...',
      addCategoryButton: 'Adicionar Categoria',
      newCategoryPlaceholder: 'Nome da nova categoria',
      importButton: 'Importar Lista Padrão',
      importingButton: 'Importando...',
      deleteCategoryConfirm: (categoryName) => `Tem certeza que deseja excluir a categoria "${categoryName}" e todos os seus itens?`,
      saveButton: 'Salvar',
      cancelButton: 'Cancelar',
      deleteButton: 'Sim',
      addServiceButton: 'Adicionar Serviço',
      addServiceItemNamePlaceholder: 'Nome do serviço',
      addServiceItemAddressPlaceholder: 'Endereço',
      addServiceItemPhonePlaceholder: 'Telefone',
      addServiceItemWebsitePlaceholder: 'Site (URL completa)',
      importToastTitle: 'Importando lista...',
      importToastDescription: 'Por favor, aguarde.',
      importSuccessToastTitle: 'Sucesso!',
      importSuccessToastDescription: 'Serviços importados com sucesso.',
      importErrorToastTitle: 'Erro na importação',
      importErrorToastDescription: 'Não foi possível importar a lista de serviços.',
      deleteConfirmTitle: 'Confirmar Exclusão',
      deleteConfirm: (itemName) => `Excluir ${itemName} da lista definitivamente?`,
      phoneNotAvailable: 'N/A',
      untitledCategory: 'Categoria sem título',
      untitledItem: 'Item sem nome',
      replaceConfirm: 'Isso substituirá todas as categorias e itens existentes. Deseja continuar?',
    },
    lodgeConfigModal: {
      title: 'Configurações da Pousada',
      description: 'Atualize as informações gerais que aparecem para os hóspedes.',
      whatsappLabel: 'WhatsApp (apenas números com DDD)',
      whatsappPlaceholder: 'Ex: 3131052608',
      breakfastHoursLabel: 'Horário do Café',
      breakfastHoursPlaceholder: 'Ex: Das 07:30h às 10:00h',
      breakfastLocationLabel: 'Local do Café',
      breakfastLocationPlaceholder: 'Ex: Salão de Café (Piso Térreo)',
      socialMediaLabel: 'Rede Social',
      socialMediaPlaceholder: 'Ex: @pousadasolardasgeraisop',
      copyrightLabel: 'Texto de Copyright (Rodapé)',
      copyrightPlaceholder: 'Ex: © 2026 Pousada Solar Das Gerais',
      heroImageLabel: 'Imagem de Destaque da Hero (Topo)',
      heroImagePlaceholder: 'Cole a URL da imagem ou envie um arquivo...',
      footerImageLabel: 'Ícone / Imagem do Rodapé',
      footerImagePlaceholder: 'Cole a URL da imagem/ícone ou envie um arquivo...',
      saveButton: 'Salvar Configurações',
      savingButton: 'Salvando...',
      successToastTitle: 'Atualizado!',
      successToastDescription: 'As informações da pousada foram salvas.',
      adminButton: 'Configurar Pousada',
    },
    cityTourPage: {
      backToDashboard: 'Voltar ao Painel',
      kicker: 'Centro Histórico · Ouro Preto, MG',
      headline: 'City Tour de Jardineira em Ouro Preto',
      lead: 'Explore as ladeiras históricas, igrejas barrocas e mirantes de Ouro Preto a bordo de uma autêntica jardineira de época com acompanhamento de guia credenciado.',
      photoAlt: 'Jardineira de época no Centro Histórico de Ouro Preto',
      primaryCta: 'Agendar com Desconto na Recepção',
      metrics: {
        durationLabel: 'Duração',
        durationValue: '3 a 4 horas',
        durationSub: 'Percurso completo guiado',
        departuresLabel: 'Saídas Diárias',
        departuresValue: '09h · 10h · 15h',
        departuresSub: 'Embarque na pousada até 10 min antes',
        priceLabel: 'Valor de Referência',
        priceValue: '~ R$ 100,00',
        priceSub: 'Por pessoa · desconto p/ hóspedes e grupos',
        bookingLabel: 'Reservas e Descontos',
        bookingValue: 'Balcão da Recepção',
        bookingSub: 'Agendamento prévio com nossa equipe',
      },
      discountBanner: {
        eyebrow: 'Benefício Exclusivo para Hóspedes e Grupos',
        title: 'Desconto especial reservando diretamente no balcão da recepção',
        description: 'Hóspedes e grupos da Pousada Solar das Gerais têm desconto exclusivo no City Tour de Jardineira! Basta solicitar o agendamento prévio no balcão da recepção ou pelo nosso WhatsApp — nossa equipe cuida de toda a reserva para você.',
        chooseTimeLabel: 'Escolha o horário de preferência:',
        ctaButton: 'Solicitar Reserva com Desconto',
        whatsappMessage: (time) =>
          `Olá! Sou hóspede da Pousada Solar das Gerais e gostaria de agendar previamente o City Tour de Jardineira com desconto na recepção para o horário das ${time}.`,
      },
      itinerary: {
        sectionTitle: 'Cronograma Previsto do Passeio',
        sectionSubtitle: 'Cronograma previsto: o trajeto combina paradas estratégicas para visitação interna e fotografias com trechos panorâmicos narrados pelo guia.',
        scheduleNote: 'Importante: o roteiro e a ordem das paradas podem variar conforme o horário e o funcionamento das atrações. Confirme o valor exato da saída escolhida diretamente na reserva.',
        filterAll: 'Todo o Roteiro',
        filterStops: 'Paradas e Visitas',
        filterPanoramic: 'Vistas Panorâmicas',
        typeStop: 'Parada para visita',
        typePanoramic: 'Trecho panorâmico',
        typeDeparture: 'Embarque',
        stops: [
          {
            number: '01',
            title: 'Embarque na Pousada e Saída pelo Largo de Coimbra',
            type: 'departure',
            timing: 'Saídas às 09h, 10h e 15h',
            description: 'O motorista virá buscar na pousada até 10 minutos antes do horário programado, seguindo para o início do circuito pelo Largo de Coimbra e Feira de Pedra-Sabão.',
          },
          {
            number: '02',
            title: 'Praça Tiradentes e Museu da Inconfidência',
            type: 'panoramic',
            timing: 'Centro Histórico',
            description: 'Marco zero da cidade, rodeado por edifícios coloniais emblemáticos como a antiga Casa de Câmara e Cadeia e o Palácio dos Governadores, com contextualização sobre a Inconfidência Mineira.',
          },
          {
            number: '03',
            title: 'Igreja de São Francisco de Assis',
            type: 'stop',
            timing: 'Parada guiada',
            description: 'Reconhecida como uma das obras-primas do barroco e rococó mundial, com projeto e esculturas de Aleijadinho e o célebre forro pintado por Mestre Ataíde.',
          },
          {
            number: '04',
            title: 'Basílica de Nossa Senhora do Pilar',
            type: 'stop',
            timing: 'Parada guiada',
            description: 'Uma das igrejas mais suntuosas do período colonial brasileiro, famosa pela riqueza de seus altares entalhados revestidos a ouro e pelo Museu de Arte Sacra.',
          },
          {
            number: '05',
            title: 'Igreja de Santa Efigênia',
            type: 'stop',
            timing: 'Parada e vista panorâmica',
            description: 'Situada no alto do morro e intimamente ligada à trajetória de Chico Rei, guarda forte simbolismo histórico e revela uma vista privilegiada do casario de Ouro Preto.',
          },
          {
            number: '06',
            title: 'Mina de Ouro do Século XVIII',
            type: 'stop',
            timing: 'Imersão subterrânea',
            description: 'Visita aos antigos túneis de extração aurífera do período colonial, conhecendo de perto as técnicas de mineração e a história dos trabalhadores que moldaram Minas Gerais.',
          },
          {
            number: '07',
            title: 'Mirantes Panorâmicos do Casario Colonial',
            type: 'stop',
            timing: 'Parada para fotos',
            description: 'Pausa estratégica nos pontos elevados da cidade para contemplar e registrar os telhados coloniais, torres das igrejas e montanhas ao redor.',
          },
          {
            number: '08',
            title: 'Igreja do Rosário, Largo Marília de Dirceu, Estação Ferroviária e Ponte dos Suspiros',
            type: 'panoramic',
            timing: 'Encerramento do percurso',
            description: 'Percurso panorâmico de encerramento pelas charmosas ladeiras de pedra e marcos históricos de Ouro Preto.',
          },
        ],
      },
      pricing: {
        title: 'Valores e Ingressos',
        referencePriceTitle: 'Valor médio do passeio',
        referencePriceText: 'Passeios de jardineira em Ouro Preto costumam custar em torno de R$ 100,00 por pessoa.',
        discountNote: 'Hóspedes e grupos têm desconto especial e podem solicitar a reserva diretamente no balcão da recepção.',
        includedTitle: 'O que costuma estar incluso',
        includedItems: [
          'Busca na pousada até 10 minutos antes do horário programado',
          'Transporte na jardineira de época pelo Centro Histórico',
          'Acompanhamento de guia de turismo credenciado durante todo o roteiro',
          'Paradas programadas para visitas e fotografias em mirantes',
        ],
        notIncludedTitle: 'Não incluso',
        notIncludedItems: [
          'Ingressos de atrações e visitas internas (igrejas, museus e mina de ouro)',
          'Alimentação, bebidas e despesas pessoais',
        ],
        disclaimer: 'Importante: o roteiro e a ordem das paradas podem variar conforme o horário e o funcionamento das atrações. Confirme o valor exato da saída escolhida diretamente na reserva.',
      },
      contacts: {
        title: 'Reservas e Dicas',
        receptionLabel: 'Agendamento no Balcão da Recepção',
        receptionNote: 'Solicite o agendamento prévio no balcão da recepção ou pelo WhatsApp para garantir o desconto exclusivo para hóspedes e grupos.',
        receptionButton: 'Agendar via WhatsApp da Recepção',
        tipsTitle: 'Dicas para aproveitar melhor',
        tips: [
          'O motorista virá buscar na pousada até 10 minutos antes do horário programado — aguarde pronto(a) na recepção.',
          'Use calçados confortáveis e antiderrapantes para caminhar nas ladeiras de pedra.',
          'Leve água, protetor solar e documento com foto (estudantes têm meia-entrada em diversas atrações).',
        ],
      },
    },
  },
  en: {
    welcomeMessage: {
      title: "Welcome to Pousada Solar das Gerais!",
      subtitle: "Schedules, amenities, and information for you to make the most of your stay with us.",
    },
    infoCards: {
      breakfast: {
        title: "Breakfast",
        line1: "Served daily from 7:30 am to 10:00 am",
        line2: "Location: Breakfast Room",
      },
      wifi: {
        title: "Wi-Fi",
        line1: "Network:",
        line2: "Password:",
        networkName: "Pousada_Solar_Das_Gerais",
        password: "pousada2023",
      },
      mainAccess: {
        title: "Main Access",
        line1: "The reception door uses an electronic password.",
        line2: "Password:",
      },
      cityTour: {
        title: "City Tour",
        description: "Vintage Jardineira tour through Ouro Preto's Historic Center. Guests and groups receive a special discount when booking at reception.",
        meta: "3–4 hrs · 9am, 10am & 3pm · Lodge pickup",
        button: "View schedule",
      },
      reception: {
        title: "Contact Reception",
        line1: "Need anything? Contact us on WhatsApp.",
        button: "Support",
      },
      minibar: {
        title: "Minibar",
        button: "View list",
      },
      usefulPhones: {
        title: "Useful Phones",
        button: "View Full List",
      },
      regulation: {
        title: "Internal Regulations",
        button: "Read",
      },
    },
    minibarModal: {
      title: 'Minibar Items',
      description: 'Check the items available in the minibar.',
      tableHeaderItem: 'Item',
      tableHeaderPrice: 'Price',
      loading: 'Loading...',
      addItemButton: 'Add Item',
      addItemNamePlaceholder: 'Item name',
      addItemPricePlaceholder: 'Price',
      importButton: 'Import Default List',
      importingButton: 'Importing...',
      importToastTitle: 'Importing items...',
      importToastDescription: 'Please wait.',
      importSuccessToastTitle: 'Success!',
      importSuccessToastDescription: 'Minibar items imported successfully.',
      importErrorToastTitle: 'Import Error',
      importErrorToastDescription: 'Could not import the item list.',
      deleteConfirmTitle: 'Confirm Deletion',
      deleteConfirm: (itemName) => `Are you sure you want to delete "${itemName}"?`,
      replaceConfirm: 'This will replace all existing items. Do you want to continue?',
      deleteButton: 'Yes',
      cancelButton: 'Cancel',
    },
    regulationModal: {
      title: 'Internal Regulations',
      description: 'Code of conduct for Pousada Solar das Gerais',
      placeholder: 'Type the regulation here...',
      confirmButton: 'Confirm',
      successToastTitle: 'Success!',
      successToastDescription: 'The regulations have been updated.',
      loading: 'Loading...',
      defaultText: `INTERNET – WI-FI\nNetwork: Pousada_Solar_Das_Gerais \nPassword: pousada2023\n\nRULES AND GUIDELINES:\n1. SCHEDULE: Check-in from 2:00 pm and Check-out by 12:00 pm.\n2. BREAKFAST: Served daily from 7:30 am to 10:00 am in the Breakfast Hall.\n3. SILENCE: We request silence between 10:00 pm and 8:00 am for everyone's comfort.\n4. SMOKING: Smoking is strictly prohibited in rooms and indoor areas.\n5. CHECK-OUT GUIDELINES: When leaving, please leave the key at the reception. At check-out, make sure you are not forgetting any belongings in the room.\n6. CONSERVATION: Please turn off lights, TV, and appliances when leaving the room.\n7. DAMAGES: Any damage to linens or structure will be charged at checkout.`,
    },
    cityTourModal: {
      title: 'City Tour Schedule',
      description: 'Add, edit, or remove slides from the city tour schedule.',
      placeholder: 'Describe this part of the tour...',
      confirmButton: 'Save Changes',
      successToastTitle: 'Success!',
      successToastDescription: 'The City Tour schedule has been updated.',
      addSlideButton: 'Add Slide',
      deleteSlideButton: 'Delete Slide',
      saveChangesButton: 'Save Changes',
      savingButton: 'Saving...',
      imagesTitle: 'Images',
      addImageButton: 'Add Image',
      imageUrlPlaceholder: 'Paste the image URL here (direct link)',
      saveSuccessToastTitle: 'Schedule saved successfully!',
      saveErrorToastTitle: 'Error saving schedule.',
      deleteSuccessToastTitle: 'Slide deleted successfully!',
      deleteErrorToastTitle: 'Error deleting slide.',
      deleteConfirmTitle: 'Confirm Deletion',
      deleteConfirmDescription: 'Are you sure you want to delete this slide? This action cannot be undone.',
    },
    usefulServicesModal: {
      title: 'Useful Services and Contacts',
      description: 'A list of important contacts in Ouro Preto for your convenience.',
      loading: 'Loading...',
      addCategoryButton: 'Add Category',
      newCategoryPlaceholder: 'New category name',
      importButton: 'Import Default List',
      importingButton: 'Importing...',
      deleteCategoryConfirm: (categoryName) => `Are you sure you want to delete the category "${categoryName}" and all its items?`,
      saveButton: 'Save',
      cancelButton: 'Cancelar',
      deleteButton: 'Yes',
      addServiceButton: 'Add Service',
      addServiceItemNamePlaceholder: 'Service name',
      addServiceItemAddressPlaceholder: 'Address',
      addServiceItemPhonePlaceholder: 'Phone',
      addServiceItemWebsitePlaceholder: 'Website (full URL)',
      importToastTitle: 'Importing list...',
      importToastDescription: 'Please wait.',
      importSuccessToastTitle: 'Success!',
      importSuccessToastDescription: 'Services imported successfully.',
      importErrorToastTitle: 'Import Error',
      importErrorToastDescription: 'Could not import the service list.',
      deleteConfirmTitle: 'Confirm Deletion',
      deleteConfirm: (itemName) => `Permanently delete ${itemName} from the list?`,
      phoneNotAvailable: 'N/A',
      untitledCategory: 'Untitled category',
      untitledItem: 'Untitled item',
      replaceConfirm: 'This will replace all existing categories and items. Do you want to continue?',
    },
    lodgeConfigModal: {
      title: 'Lodge Settings',
      description: 'Update the general information displayed to guests.',
      whatsappLabel: 'WhatsApp (numbers only with DDD)',
      whatsappPlaceholder: 'Ex: 3131052608',
      breakfastHoursLabel: 'Breakfast Hours',
      breakfastHoursPlaceholder: 'Ex: From 07:30 am to 10:00 am',
      breakfastLocationLabel: 'Breakfast Location',
      breakfastLocationPlaceholder: 'Ex: Breakfast Hall (Ground Floor)',
      socialMediaLabel: 'Social Media',
      socialMediaPlaceholder: 'Ex: @pousadasolardasgeraisop',
      copyrightLabel: 'Copyright Text (Footer)',
      copyrightPlaceholder: 'Ex: © 2026 Pousada Solar Das Gerais',
      heroImageLabel: 'Hero Feature Image (Top)',
      heroImagePlaceholder: 'Paste image URL or choose a file...',
      footerImageLabel: 'Footer Icon / Image',
      footerImagePlaceholder: 'Paste icon/image URL or choose a file...',
      saveButton: 'Save Settings',
      savingButton: 'Saving...',
      successToastTitle: 'Updated!',
      successToastDescription: 'The lodge information has been saved.',
      adminButton: 'Configure Lodge',
    },
    cityTourPage: {
      backToDashboard: 'Back to Dashboard',
      kicker: 'Historic Center · Ouro Preto, MG',
      headline: 'Vintage Jardineira City Tour in Ouro Preto',
      lead: 'Discover Ouro Preto’s cobblestone hills, baroque churches, and scenic overlooks aboard a classic vintage Jardineira bus accompanied by an accredited local tour guide.',
      photoAlt: 'Vintage Jardineira in Ouro Preto Historic Center',
      primaryCta: 'Book with Discount at Reception',
      metrics: {
        durationLabel: 'Duration',
        durationValue: '3 to 4 hours',
        durationSub: 'Full guided circuit',
        departuresLabel: 'Daily Departures',
        departuresValue: '9am · 10am · 3pm',
        departuresSub: 'Pickup at the lodge up to 10 min prior',
        priceLabel: 'Reference Price',
        priceValue: '~ R$ 100.00',
        priceSub: 'Per person · guest & group discounts',
        bookingLabel: 'Bookings & Discounts',
        bookingValue: 'Reception Desk',
        bookingSub: 'Pre-book directly with our team',
      },
      discountBanner: {
        eyebrow: 'Exclusive Benefit for Guests & Groups',
        title: 'Special discount when booked directly at the reception desk',
        description: 'Guests and groups staying at Pousada Solar das Gerais receive a special discount on the Jardineira City Tour! Simply request an advance booking at our reception desk or via WhatsApp — our team handles the entire reservation for you.',
        chooseTimeLabel: 'Select your preferred departure:',
        ctaButton: 'Request Discounted Booking',
        whatsappMessage: (time) =>
          `Hello! I am a guest at Pousada Solar das Gerais and would like to pre-book the Jardineira City Tour with the reception discount for the ${time} departure.`,
      },
      itinerary: {
        sectionTitle: 'Planned Tour Schedule & Itinerary',
        sectionSubtitle: 'Planned schedule: the circuit combines guided stops for interior visits and photography with narrated panoramic stretches through historic neighborhoods.',
        scheduleNote: 'Note: route order and stops may vary depending on departure time and attraction opening hours. Please confirm the exact fare for your chosen departure when booking.',
        filterAll: 'Full Route',
        filterStops: 'Guided Stops',
        filterPanoramic: 'Panoramic Views',
        typeStop: 'Guided stop',
        typePanoramic: 'Panoramic pass',
        typeDeparture: 'Pickup',
        stops: [
          {
            number: '01',
            title: 'Lodge Pickup & Departure via Largo de Coimbra',
            type: 'departure',
            timing: 'Departures at 9am, 10am & 3pm',
            description: 'The driver will pick you up at the lodge up to 10 minutes before the scheduled departure time, heading to the start of the circuit by Largo de Coimbra and the Soapstone Craft Fair.',
          },
          {
            number: '02',
            title: 'Praça Tiradentes & Museu da Inconfidência',
            type: 'panoramic',
            timing: 'Historic Center',
            description: 'The historic heart of Ouro Preto, framed by colonial landmarks including the former Town Hall & Prison and the Governors’ Palace.',
          },
          {
            number: '03',
            title: 'Church of São Francisco de Assis',
            type: 'stop',
            timing: 'Guided stop',
            description: 'Widely regarded as a masterpiece of Brazilian baroque and rococo art, featuring architecture and sculptures by Aleijadinho and ceiling paintings by Mestre Ataíde.',
          },
          {
            number: '04',
            title: 'Basilica of Nossa Senhora do Pilar',
            type: 'stop',
            timing: 'Guided stop',
            description: 'One of the richest colonial churches in Brazil, renowned for its gold-leafed baroque altars and the Sacred Art Museum.',
          },
          {
            number: '05',
            title: 'Church of Santa Efigênia',
            type: 'stop',
            timing: 'Stop & scenic overlook',
            description: 'Perched atop a hill and closely linked to the legacy of Chico Rei, offering rich cultural history and sweeping views of Ouro Preto.',
          },
          {
            number: '06',
            title: '18th-Century Gold Mine',
            type: 'stop',
            timing: 'Underground guided visit',
            description: 'Step inside historic colonial mining tunnels to learn firsthand how gold extraction shaped Minas Gerais during the 18th century.',
          },
          {
            number: '07',
            title: 'Scenic Overlooks of Colonial Ouro Preto',
            type: 'stop',
            timing: 'Photo stop',
            description: 'Strategic stops on higher vantage points to admire and photograph the colonial rooftops, church spires, and surrounding mountains.',
          },
          {
            number: '08',
            title: 'Rosário Church, Largo Marília de Dirceu, Train Station & Ponte dos Suspiros',
            type: 'panoramic',
            timing: 'Closing panoramic drive',
            description: 'Closing panoramic drive along cobblestone streets and iconic landmarks of Ouro Preto.',
          },
        ],
      },
      pricing: {
        title: 'Pricing & Tickets',
        referencePriceTitle: 'Average tour fare',
        referencePriceText: 'Jardineira city tours in Ouro Preto typically cost around R$ 100.00 per person.',
        discountNote: 'Guests and groups receive a special discount and can request booking directly at the reception desk.',
        includedTitle: 'Typically included',
        includedItems: [
          'Pickup at the lodge up to 10 minutes before the scheduled time',
          'Vintage Jardineira transport across the Historic Center',
          'Accredited local tour guide throughout the entire circuit',
          'Scheduled stops for interior visits and panoramic photos',
        ],
        notIncludedTitle: 'Not included',
        notIncludedItems: [
          'Admission tickets to churches, museums, and the gold mine',
          'Meals, drinks, and personal expenses',
        ],
        disclaimer: 'Note: route order and stops may vary depending on departure time and attraction opening hours. Please confirm the exact fare for your chosen departure when booking.',
      },
      contacts: {
        title: 'Bookings & Tips',
        receptionLabel: 'Book at the Reception Desk',
        receptionNote: 'Request advance booking at the reception desk or via WhatsApp to guarantee the exclusive discount for guests and groups.',
        receptionButton: 'Book via Reception WhatsApp',
        tipsTitle: 'Helpful tips for your tour',
        tips: [
          'The driver will pick you up at the lodge up to 10 minutes before the scheduled departure time — please be ready at reception.',
          'Wear comfortable walking shoes suitable for steep cobblestone streets.',
          'Bring water, sunscreen, and a photo ID (students receive half-price admission at many sites).',
        ],
      },
    },
  },
};
