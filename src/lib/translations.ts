
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
      networkName: string;
      line2: string;
      password: string;
    };
    mainAccess: {
      title: string;
      line1: string;
      line2: string;
    };
    cityTour: {
      title: string;
      schedule: string;
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
    deleteConfirm: (itemName: string) => string;
    replaceConfirm: string;
  };
  regulationModal: {
    title: string;
    description: string;
    placeholder: string;
    confirmButton: string;
    successToastTitle: string;
    successToastDescription: string;
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
    addServiceButton: string;
    addServiceItemNamePlaceholder: string;
    addServiceItemAddressPlaceholder: string;
    addServiceItemPhonePlaceholder: string;
    importToastTitle: string;
    importToastDescription: string;
    importSuccessToastTitle: string;
    importSuccessToastDescription: string;
    importErrorToastTitle: string;
    importErrorToastDescription: string;
    deleteConfirm: (itemName: string) => string;
    phoneNotAvailable: string;
    untitledCategory: string;
    untitledItem: string;
    replaceConfirm: string;
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
        networkName: "pousada solar das gerais",
        line2: "Senha:",
        password: "pousada2023",
      },
      mainAccess: {
        title: "Acesso Principal",
        line1: "A porta da recepção utiliza uma senha eletrônica.",
        line2: "Senha:",
      },
      cityTour: {
        title: "City Tour",
        schedule: "Saídas às 10h da Praça Tiradentes. É importante o agendamento na recepção.",
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
        title: "Nosso Regulamento",
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
      deleteConfirm: (itemName) => `Tem certeza que deseja excluir "${itemName}"?`,
      replaceConfirm: 'Isso substituirá todos os itens existentes. Deseja continuar?',
    },
    regulationModal: {
      title: 'Nosso Regulamento',
      description: 'Importante: leia nossas orientações para a sua estadia',
      placeholder: 'Insira o texto do regulamento aqui...',
      confirmButton: 'Confirmar',
      successToastTitle: 'Sucesso!',
      successToastDescription: 'O regulamento foi atualizado.',
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
      addServiceButton: 'Adicionar Serviço',
      addServiceItemNamePlaceholder: 'Nome do serviço',
      addServiceItemAddressPlaceholder: 'Endereço',
      addServiceItemPhonePlaceholder: 'Telefone',
      importToastTitle: 'Importando lista...',
      importToastDescription: 'Por favor, aguarde.',
      importSuccessToastTitle: 'Sucesso!',
      importSuccessToastDescription: 'Serviços importados com sucesso.',
      importErrorToastTitle: 'Erro na importação',
      importErrorToastDescription: 'Não foi possível importar a lista de serviços.',
      deleteConfirm: (itemName) => `Tem certeza que deseja excluir "${itemName}"?`,
      phoneNotAvailable: 'N/A',
      untitledCategory: 'Categoria sem título',
      untitledItem: 'Item sem nome',
      replaceConfirm: 'Isso substituirá todas as categorias e itens existentes. Deseja continuar?',
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
        networkName: "pousada solar das gerais",
        line2: "Password:",
        password: "pousada2023",
      },
      mainAccess: {
        title: "Main Access",
        line1: "The reception door uses an electronic password.",
        line2: "Password:",
      },
      cityTour: {
        title: "City Tour",
        schedule: "Departures at 10 am from Praça Tiradentes. It is important to schedule at the reception.",
      },
      reception: {
        title: "Contact Reception",
        line1: "Need anything? We are available on WhatsApp.",
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
        title: "Our Regulations",
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
      deleteConfirm: (itemName) => `Are you sure you want to delete "${itemName}"?`,
      replaceConfirm: 'This will replace all existing items. Do you want to continue?',
    },
    regulationModal: {
      title: 'Our Regulations',
      description: 'Important: read our guidelines for your stay',
      placeholder: 'Enter the regulation text here...',
      confirmButton: 'Confirm',
      successToastTitle: 'Success!',
      successToastDescription: 'The regulations have been updated.',
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
      cancelButton: 'Cancel',
      addServiceButton: 'Add Service',
      addServiceItemNamePlaceholder: 'Service name',
      addServiceItemAddressPlaceholder: 'Address',
      addServiceItemPhonePlaceholder: 'Phone',
      importToastTitle: 'Importing list...',
      importToastDescription: 'Please wait.',
      importSuccessToastTitle: 'Success!',
      importSuccessToastDescription: 'Services imported successfully.',
      importErrorToastTitle: 'Import Error',
      importErrorToastDescription: 'Could not import the service list.',
      deleteConfirm: (itemName) => `Are you sure you want to delete "${itemName}"?`,
      phoneNotAvailable: 'N/A',
      untitledCategory: 'Untitled category',
      untitledItem: 'Untitled item',
      replaceConfirm: 'This will replace all existing categories and items. Do you want to continue?',
    },
  },
};
