import { Work, Category, Profile } from './types';

export const INITIAL_PROFILE: Profile = {
  bio: `Antonio Carlos Lobo Soares é Arquiteto PhD, Museólogo e Artista Plástico, nascido em Belém, Brasil. Tem mais de quarenta anos de produção artística, constituída de: capas de livros; impressos gráficos entre cartazes, convites e cartões; trinta e cinco exposições de artes plásticas coletivas e quatro individuais no Pará e Estados vizinhos. Lobo Soares é um abstracionista convicto, com poucas passagens pelo figurativo, que iniciou na pintura a óleo sobre tela, passou pelo desenho, gravura, aquarela e atualmente suas obras são em tinta acrílica sobre tela.

Iniciou na Secretaria de Cultura do Pará, focado na restauração do patrimônio histórico, arquitetônico e nas artes gráficas. Durante 40 anos no Museu Paraense Emílio Goeldi, ocupei diversas funções, desde coordenador do parque zoobotânico até diretor da instituição, desenvolvendo projetos notáveis em comunicação, museologia, arquitetura e manejo de animais silvestres.`,
  photoUrl: 'https://picsum.photos/seed/antonio/400/600',
  email: 'lobosoares@hotmail.com',
  phone: '+55 91 99343-2027',
  address: 'Av. Conselheiro Furtado Nº 2626, Aptº 902, Cremação, Belém, Pará, Brasil'
};

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Pintura', slug: 'pintura' },
  { id: '2', name: 'Desenho', slug: 'desenho' },
  { id: '3', name: 'Arquitetura', slug: 'arquitetura' },
  { id: '4', name: 'Restauração', slug: 'restauracao' },
  { id: '5', name: 'Museologia', slug: 'museologia' },
  { id: '6', name: 'Mídia', slug: 'midia' }
];
