import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Package, Clock, Truck, CheckCircle, XCircle, Search } from 'lucide-react';

type OrderStatus = 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_type: 'pickup' | 'delivery';
  status: OrderStatus;
  total: number;
  created_at: string;
}

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Package }> = {
  pending: { label: 'Novo', color: 'bg-yellow-500', icon: Clock },
  preparing: { label: 'Em Preparo', color: 'bg-blue-500', icon: Package },
  delivering: { label: 'Entrega', color: 'bg-purple-500', icon: Truck },
  delivered: { label: 'Entregue', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-500', icon: XCircle },
};

const OrdersTable = ({ orders, onViewDetails }: OrdersTableProps) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const filtered = orders.filter(order => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !order.order_number.toLowerCase().includes(q) &&
        !order.customer_name.toLowerCase().includes(q) &&
        !order.customer_phone.includes(q)
      ) return false;
    }
    if (dateFilter === 'today') {
      if (new Date(order.created_at).toDateString() !== new Date().toDateString()) return false;
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      if (new Date(order.created_at) < weekAgo) return false;
    }
    return true;
  });

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">Pedidos ({filtered.length})</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-9 h-9 w-[160px]"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">🕐 Novo</SelectItem>
                <SelectItem value="preparing">📦 Preparando</SelectItem>
                <SelectItem value="delivering">🚚 Entrega</SelectItem>
                <SelectItem value="delivered">✅ Entregue</SelectItem>
                <SelectItem value="cancelled">❌ Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="h-9 w-[120px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">7 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Nenhum pedido encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs font-bold text-muted-foreground">Pedido</th>
                  <th className="text-left py-3 px-2 text-xs font-bold text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-2 text-xs font-bold text-muted-foreground hidden md:table-cell">Tipo</th>
                  <th className="text-left py-3 px-2 text-xs font-bold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-xs font-bold text-muted-foreground hidden sm:table-cell">Total</th>
                  <th className="text-right py-3 px-2 text-xs font-bold text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={order.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2">
                        <span className="font-bold text-sm">#{order.order_number}</span>
                        <p className="text-[11px] text-muted-foreground">
                          {new Date(order.created_at).toLocaleString('pt-BR')}
                        </p>
                      </td>
                      <td className="py-3 px-2">
                        <span className="font-medium text-sm">{order.customer_name}</span>
                        <p className="text-[11px] text-muted-foreground">{order.customer_phone}</p>
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        <Badge variant="outline" className="text-[11px]">
                          {order.delivery_type === 'pickup' ? 'Retirada' : 'Entrega'}
                        </Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Badge className={`${status.color} text-white text-[11px]`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 hidden sm:table-cell">
                        <span className="font-bold text-sm text-primary">
                          R$ {Number(order.total).toFixed(2).replace('.', ',')}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Button variant="ghost" size="sm" onClick={() => onViewDetails(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
