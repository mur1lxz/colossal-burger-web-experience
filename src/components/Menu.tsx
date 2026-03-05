import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { menuItems, categories } from '@/data/menuData';
import { MenuItem } from '@/types/order';
import AddToCartModal from '@/components/order/AddToCartModal';
import CartButton from '@/components/cart/CartButton';
import CartDrawer from '@/components/cart/CartDrawer';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <section id="menu" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4">
            NOSSO <span className="text-primary">CARDÁPIO</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Hambúrgueres artesanais preparados com ingredientes premium e muito sabor
          </p>
        </div>

        {/* Category Filter - horizontal scroll on mobile */}
        <div className="flex overflow-x-auto gap-2 mb-6 md:mb-8 pb-2 md:flex-wrap md:justify-center scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'glow' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="font-bold whitespace-nowrap flex-shrink-0"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Mobile: compact list layout | Desktop: grid cards */}
        {/* Mobile List View */}
        <div className="flex flex-col gap-3 md:hidden">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover:border-primary/40 transition-all duration-200 cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => handleAddToCart(item)}
            >
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.badge && (
                  <span className="absolute top-0 left-0 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded-br-lg">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-sm leading-tight">{item.name}</h3>
                <p className="text-muted-foreground text-xs line-clamp-2 mt-0.5">{item.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {item.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      R$ {item.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-sm font-bold text-primary">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
              <Button
                variant="glow"
                size="sm"
                className="font-bold flex-shrink-0 text-xs px-3"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(item);
                }}
              >
                Pedir
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="bg-card border-border overflow-hidden hover:scale-105 hover:shadow-[var(--shadow-card)] transition-all duration-300 fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden h-56 md:h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-black text-foreground">
                  {item.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between p-6 pt-0">
                <div className="flex items-center gap-2">
                  {item.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {item.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <Button
                  variant="glow"
                  size="default"
                  className="font-bold"
                  onClick={() => handleAddToCart(item)}
                >
                  Pedir Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AddToCartModal
        item={selectedItem}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
      <CartButton onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </section>
  );
};

export default Menu;
