import { Card, CardContent } from '@/components/ui/card';
import { Package, Clock, Truck, CheckCircle, DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
  delivery_type: string;
  customer_name: string;
}

interface DashboardStatsProps {
  orders: Order[];
}

const DashboardStats = ({ orders }: DashboardStatsProps) => {
  const today = new Date().toDateString();
  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today);
  
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const preparingCount = orders.filter(o => o.status === 'preparing').length;
  const deliveringCount = orders.filter(o => o.status === 'delivering').length;
  const deliveredToday = todayOrders.filter(o => o.status === 'delivered').length;
  
  const todayRevenue = todayOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + Number(o.total), 0);

  const avgTicket = deliveredToday > 0 ? todayRevenue / deliveredToday : 0;

  const uniqueCustomers = new Set(todayOrders.map(o => o.customer_name)).size;

  const stats = [
    {
      label: 'Pedidos Hoje',
      value: todayOrders.length,
      icon: ShoppingBag,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Novos / Preparando',
      value: `${pendingCount} / ${preparingCount}`,
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Em Entrega',
      value: deliveringCount,
      icon: Truck,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Entregues Hoje',
      value: deliveredToday,
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Faturamento Hoje',
      value: `R$ ${todayRevenue.toFixed(2).replace('.', ',')}`,
      icon: DollarSign,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Ticket Médio',
      value: `R$ ${avgTicket.toFixed(2).replace('.', ',')}`,
      icon: TrendingUp,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      label: 'Clientes Hoje',
      value: uniqueCustomers,
      icon: Users,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10',
    },
    {
      label: 'Total Pedidos',
      value: orders.length,
      icon: Package,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                  <p className="text-lg font-black truncate">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
