import { MenuItem } from '@/types/order';
import burgerBacon from '@/assets/burger-bacon.jpg';
import burgerSmash from '@/assets/burger-smash.jpg';
import burgerEgg from '@/assets/burger-egg.jpg';

export const menuItems: MenuItem[] = [
  // Burgers
  {
    id: 'colossal-bacon',
    name: 'Colossal Bacon',
    description: 'Pão artesanal, carne 180g, cheddar derretido, bacon crocante e molho especial',
    price: 32.90,
    image: burgerBacon,
    category: 'burgers',
  },
  {
    id: 'smash-supreme',
    name: 'Smash Supreme',
    description: 'Duas carnes finas smash, cheddar derretido, cebola caramelizada e molho especial',
    price: 29.90,
    image: burgerSmash,
    category: 'burgers',
  },
  {
    id: 'colossal-egg',
    name: 'Colossal Egg',
    description: 'Pão brioche, carne 200g, queijo suíço, ovo frito, alface e tomate frescos',
    price: 34.90,
    image: burgerEgg,
    category: 'burgers',
  },
  // Sides
  {
    id: 'batata-frita',
    name: 'Batata Frita',
    description: 'Porção de batatas fritas crocantes com sal e temperos especiais',
    price: 15.90,
    image: burgerBacon,
    category: 'sides',
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Anéis de cebola empanados e crocantes com molho especial',
    price: 18.90,
    image: burgerSmash,
    category: 'sides',
  },
  // Drinks
  {
    id: 'refrigerante',
    name: 'Refrigerante Lata',
    description: 'Coca-Cola, Guaraná ou Sprite 350ml',
    price: 6.90,
    image: burgerEgg,
    category: 'drinks',
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    description: 'Milkshake cremoso nos sabores chocolate, morango ou ovomaltine',
    price: 16.90,
    image: burgerBacon,
    category: 'drinks',
  },
  // Desserts
  {
    id: 'brownie',
    name: 'Brownie',
    description: 'Brownie de chocolate com sorvete de creme e calda de chocolate',
    price: 14.90,
    image: burgerSmash,
    category: 'desserts',
  },
];

export const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'burgers', name: 'Hambúrgueres' },
  { id: 'sides', name: 'Acompanhamentos' },
  { id: 'drinks', name: 'Bebidas' },
  { id: 'desserts', name: 'Sobremesas' },
];
