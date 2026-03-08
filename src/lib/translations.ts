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
      generalLabel: string;
      networkName: string;
      password: string;
      blocksLabel: string;
      blocksNetworkName: string;
      blocksPassword: string;
    };
    mainAccess: {
      title: string;
      line1: string;
      line2: string;
    };
    cityTour: {
      title: string;
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
    logoLabel: string;
    logoPlaceholder: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    breakfastHoursLabel: string;
    breakfastHoursPlaceholder: string;
    breakfastLocationLabel: string;
    breakfastLocationPlaceholder: string;
    saveButton: string;
    savingButton: string;
    successToastTitle: string;
    successToastDescription: string;
    adminButton: string;
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
        generalLabel: "Geral",
        networkName: "Pousada_Solar_Das_Gerais",
        password: "pousada2023",
        blocksLabel: "Blocos 110 e 111",
        blocksNetworkName: "ap119A",
        blocksPassword: "hostel2023",
      },
      mainAccess: {
        title: "Acesso Principal",
        line1: "A porta da recepção utiliza uma senha eletrônica.",
        line2: "Senha:",
      },
      cityTour: {
        title: "City Tour",
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
      description: 'Para garantir conforto, segurança e bem-estar de todos, solicitamos a leitura e cumprimento das normas a seguir',
      placeholder: 'Digite o regulamento aqui...',
      confirmButton: 'Confirmar',
      successToastTitle: 'Sucesso!',
      successToastDescription: 'O regulamento foi atualizado.',
      loading: 'Carregando...',
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
      logoLabel: 'URL do Logo',
      logoPlaceholder: 'Cole a URL da imagem do logo',
      whatsappLabel: 'WhatsApp (apenas números com DDD)',
      whatsappPlaceholder: 'Ex: 31988887777',
      breakfastHoursLabel: 'Horário do Café',
      breakfastHoursPlaceholder: 'Ex: Das 07:30h às 10:00h',
      breakfastLocationLabel: 'Local do Café',
      breakfastLocationPlaceholder: 'Ex: Salão de Café (Piso Térreo)',
      saveButton: 'Salvar Configurações',
      savingButton: 'Salvando...',
      successToastTitle: 'Atualizado!',
      successToastDescription: 'As informações da pousada foram salvas.',
      adminButton: 'Configurar Pousada',
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
        generalLabel: "General",
        networkName: "Pousada_Solar_Das_Gerais",
        password: "pousada2023",
        blocksLabel: "Blocks 110 and 111",
        blocksNetworkName: "ap119A",
        blocksPassword: "hostel2023",
      },
      mainAccess: {
        title: "Main Access",
        line1: "The reception door uses an electronic password.",
        line2: "Password:",
      },
      cityTour: {
        title: "City Tour",
        button: "View schedule",
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
      description: 'To ensure the comfort, safety, and well-being of everyone, we request the reading and compliance with the following rules',
      placeholder: 'Type the regulation here...',
      confirmButton: 'Confirm',
      successToastTitle: 'Success!',
      successToastDescription: 'The regulations have been updated.',
      loading: 'Loading...',
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
      cancelButton: 'Cancel',
      deleteButton: 'Yes',
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
      logoLabel: 'Logo URL',
      logoPlaceholder: 'Paste the logo image URL',
      whatsappLabel: 'WhatsApp (numbers only with DDD)',
      whatsappPlaceholder: 'Ex: 31988887777',
      breakfastHoursLabel: 'Breakfast Hours',
      breakfastHoursPlaceholder: 'Ex: From 07:30 am to 10:00 am',
      breakfastLocationLabel: 'Breakfast Location',
      breakfastLocationPlaceholder: 'Ex: Breakfast Hall (Ground Floor)',
      saveButton: 'Save Settings',
      savingButton: 'Saving...',
      successToastTitle: 'Updated!',
      successToastDescription: 'The lodge information has been saved.',
      adminButton: 'Configure Lodge',
    },
  },
};
