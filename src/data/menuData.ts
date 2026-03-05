import { MenuItem } from '@/types/order';
import cheeseBurguer from '@/assets/cheese-burguer.jpg';
import cheeseBacon from '@/assets/cheese-bacon.jpg';
import cheeseSalada from '@/assets/cheese-salada.jpg';
import original from '@/assets/original.jpg';
import demolidor from '@/assets/demolidor.jpg';
import bigColossal from '@/assets/big-colossal.jpg';
import furioso from '@/assets/furioso.jpg';
import cremosinho from '@/assets/cremosinho.jpg';
import newTexas from '@/assets/new-texas.jpg';
import cebolitos from '@/assets/cebolitos.jpg';
import duplaMatadora from '@/assets/dupla-matadora.jpg';
import cremosinhoDobro from '@/assets/cremosinho-dobro.jpg';
import comboCasalzao from '@/assets/combo-casalzao.jpg';
import comboFamilia from '@/assets/combo-familia.jpg';
import comboGalera from '@/assets/combo-galera.jpg';
import fritasCheddarBacon from '@/assets/fritas-cheddar-bacon.jpg';
import fritasCasa from '@/assets/fritas-casa.jpg';
import refrigerante350 from '@/assets/refrigerante-350.jpg';
import refrigerante200 from '@/assets/refrigerante-200.jpg';
import coca1l from '@/assets/coca-1l.jpg';
import coca2l from '@/assets/coca-2l.jpg';
import sucos from '@/assets/sucos.jpg';

export const menuItems: MenuItem[] = [
  // #NO PRECINHO (Promoções)
  {
    id: 'dupla-matadora',
    name: 'Dupla Matadora',
    description: '2 Colossais da sua escolha por apenas 49,90 R$. Artesanal, BITELO e no precinho!',
    price: 49.90,
    originalPrice: 69.80,
    image: duplaMatadora,
    category: 'promocoes',
  },
  {
    id: 'furioso-promo',
    name: 'Furioso',
    description: 'Pão Brioche na Chapa, 3x Smash 100g, 3x Fatias de Cheddar, Bacon Fatiado, Alface, Molho Especial',
    price: 29.90,
    originalPrice: 34.90,
    image: furioso,
    category: 'promocoes',
  },
  {
    id: 'demolidor-promo',
    name: 'Demolidor',
    description: 'Pão corte duplo, dois smash burguer de 100g, cheddar, bacon fatiado, ovo, alface, tomate e maionese',
    price: 29.90,
    originalPrice: 34.90,
    image: demolidor,
    category: 'promocoes',
  },
  {
    id: 'big-colossal-promo',
    name: 'Big Colossal',
    description: 'Pão brioche corte duplo, dois smash\'s de 100g, cheddar derretido, alface americana, cebola roxa, picles agridoce e Molho Especial',
    price: 29.90,
    originalPrice: 34.90,
    image: bigColossal,
    category: 'promocoes',
  },
  {
    id: 'original-promo',
    name: 'Original',
    description: 'Pão Brioche, Smash 100g, Cheddar, Bacon Fatiado, alface, tomate, cebola roxa e maionese Grill',
    price: 19.90,
    originalPrice: 24.90,
    image: original,
    category: 'promocoes',
    badge: 'Novidade',
  },
  {
    id: 'cremosinho-dobro',
    name: 'Cremosinho em Dobro',
    description: '2 Cremosinho por 29,90 R$. A segunda unidade sai por apenas 10,00 R$!',
    price: 29.90,
    originalPrice: 39.80,
    image: cremosinhoDobro,
    category: 'promocoes',
  },
  {
    id: 'combo-casalzao-promo',
    name: 'Combo Casalzão',
    description: '2x Cheese Burguer Duplo Cheddar + 2x Fritas Individual',
    price: 49.90,
    originalPrice: 54.90,
    image: comboCasalzao,
    category: 'promocoes',
  },

  // Combos
  {
    id: 'combo-casalzao',
    name: 'Combo Casalzão',
    description: '2x Cheese Burguer Duplo Cheddar + 2x Fritas Individual. Perfeito pra curtir com o mozão!',
    price: 54.90,
    image: comboCasalzao,
    category: 'combos',
  },
  {
    id: 'combo-familia',
    name: 'Combo Família',
    description: '4 Cheese Burguer Cheddar + Porção de Fritas Crocantes com Cheddar e Bacon. Sua família merece!',
    price: 74.90,
    image: comboFamilia,
    category: 'combos',
  },
  {
    id: 'combo-galera',
    name: 'Combo Galera',
    description: '3 Cheese Bacon + 1 Porção de Fritas com Cheddar e Bacon',
    price: 74.90,
    image: comboGalera,
    category: 'combos',
  },

  // Porções
  {
    id: 'fritas-cheddar-bacon',
    name: 'Fritas com Cheddar e Bacon',
    description: '350g de Fritas Palito Mc\'Cain com Cheddar e Bacon',
    price: 24.90,
    image: fritasCheddarBacon,
    category: 'porcoes',
  },
  {
    id: 'fritas-casa',
    name: 'Fritas da Casa',
    description: '350g de Fritas Palito Mc\'Cain com Maionese Grill e Bacon',
    price: 24.90,
    image: fritasCasa,
    category: 'porcoes',
  },
  {
    id: 'fritas-simples',
    name: 'Fritas Simples',
    description: '280g de Fritas Palito Mc\'Cain com Sal temperado',
    price: 19.90,
    image: fritasCheddarBacon,
    category: 'porcoes',
  },

  // Clássicos
  {
    id: 'cheese-burguer',
    name: 'Cheese Burguer',
    description: 'Pão Brioche na Chapa, Smash 100g, Queijo Cheddar Fatiado ou Mussarela, Molho Especial',
    price: 14.90,
    image: cheeseBurguer,
    category: 'classicos',
    badge: '🔥 O favorito!',
  },
  {
    id: 'cheese-bacon',
    name: 'Cheese Bacon',
    description: 'Pão Brioche na Chapa, Smash 100g, Queijo Cheddar Fatiado, Bacon Fatiado, Maionese Grill',
    price: 19.90,
    image: cheeseBacon,
    category: 'classicos',
  },
  {
    id: 'cheese-salada',
    name: 'Cheese Salada',
    description: 'Pão Brioche na Chapa, Smash 100g, Queijo Mussarela, Alface, Tomate e Cebola Roxa, Maionese Temperada',
    price: 19.90,
    image: cheeseSalada,
    category: 'classicos',
  },

  // Especiais
  {
    id: 'original',
    name: 'Original',
    description: 'Pão Brioche, Smash 100g, Cheddar Vigor, Bacon Fatiado, alface, tomate, cebola roxa e maionese Grill',
    price: 24.90,
    image: original,
    category: 'especiais',
    badge: 'Novidade',
  },
  {
    id: 'demolidor',
    name: 'Demolidor',
    description: 'Pão corte duplo, dois smash de 100g, cheddar, bacon fatiado, ovo, alface, tomate e maionese',
    price: 34.90,
    image: demolidor,
    category: 'especiais',
  },
  {
    id: 'big-colossal',
    name: 'Big Colossal',
    description: 'Pão brioche corte duplo, dois smash\'s de 100g, cheddar derretido, alface americana, cebola roxa, picles agridoce e Molho Especial',
    price: 34.90,
    image: bigColossal,
    category: 'especiais',
  },
  {
    id: 'furioso',
    name: 'Furioso',
    description: 'Pão Brioche na Chapa, 3x Smash 100g, 3x Fatias de Cheddar, Bacon Fatiado, Alface, Molho Especial',
    price: 34.90,
    image: furioso,
    category: 'especiais',
  },
  {
    id: 'cremosinho',
    name: 'Cremosinho',
    description: 'Pão Brioche na Chapa, Smash 100g, Muito Cheddar Cremoso, Bacon em Cubos',
    price: 19.90,
    image: cremosinho,
    category: 'especiais',
  },
  {
    id: 'new-texas',
    name: 'New Texas',
    description: 'Pão Brioche, Smash 100g, Mussarela, Bacon em Cubos, Cebolinha Empanada Mc\'Cain e Ketchup Grill defumado',
    price: 24.90,
    image: newTexas,
    category: 'especiais',
  },
  {
    id: 'cebolitos',
    name: 'Cebolitos',
    description: 'Pão Brioche, Smash 100g, duas fatias de cheddar, alface americana, dois anéis de cebola empanada e Maionese Temperada',
    price: 24.90,
    image: cebolitos,
    category: 'especiais',
  },

  // Bebidas
  {
    id: 'refrigerante-350',
    name: 'Refrigerante 350ml',
    description: 'Bebida Gelada',
    price: 7.00,
    image: refrigerante350,
    category: 'bebidas',
  },
  {
    id: 'refrigerante-200',
    name: 'Refrigerante 200ml',
    description: 'Bebida Gelada',
    price: 3.50,
    image: refrigerante200,
    category: 'bebidas',
  },
  {
    id: 'coca-1l',
    name: 'Coca-Cola 1L',
    description: 'Bebida Gelada',
    price: 12.00,
    image: coca1l,
    category: 'bebidas',
  },
  {
    id: 'coca-2l',
    name: 'Coca-Cola 2L',
    description: 'Bebida Gelada',
    price: 17.00,
    image: coca2l,
    category: 'bebidas',
  },
  {
    id: 'sucos-290',
    name: 'Sucos 290ml',
    description: 'Bebida Gelada',
    price: 7.00,
    image: sucos,
    category: 'bebidas',
  },

  // Molho Extra
  {
    id: 'molho-30',
    name: 'Molho 30ml',
    description: 'Escolha seu molho preferido como acompanhamento!',
    price: 2.00,
    image: cheeseBurguer,
    category: 'molhos',
  },
  {
    id: 'molho-60',
    name: 'Molho 60ml',
    description: 'Escolha seu molho preferido como acompanhamento',
    price: 4.00,
    image: cheeseBurguer,
    category: 'molhos',
  },
];

export const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'promocoes', name: '#NO PRECINHO' },
  { id: 'combos', name: 'Combos' },
  { id: 'porcoes', name: 'Porções' },
  { id: 'classicos', name: 'Clássicos' },
  { id: 'especiais', name: 'Especiais' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'molhos', name: 'Molho Extra' },
];
