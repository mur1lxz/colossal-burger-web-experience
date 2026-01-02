import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LogOut,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  DollarSign,
  RefreshCw,
  Eye,
  Printer,
} from 'lucide-react';
import { useRef } from 'react';
import OrderTicket from '@/components/admin/OrderTicket';
import logo from '@/assets/logo.png';

type OrderStatus = 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  item_name: string;
  item_size: string | null;
  item_extras: string[] | null;
  item_observations: string | null;
  quantity: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_type: 'pickup' | 'delivery';
  delivery_address: string | null;
  delivery_neighborhood: string | null;
  delivery_number: string | null;
  delivery_complement: string | null;
  delivery_reference: string | null;
  payment_method: 'pix' | 'card' | 'cash';
  payment_change_for: number | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  order_items?: OrderItem[];
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Package }> = {
  pending: { label: 'Novo', color: 'bg-yellow-500', icon: Clock },
  preparing: { label: 'Em Preparo', color: 'bg-blue-500', icon: Package },
  delivering: { label: 'Saiu para Entrega', color: 'bg-purple-500', icon: Truck },
  delivered: { label: 'Entregue', color: 'bg-green-500', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-500', icon: XCircle },
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchOrders();
      
      // Subscribe to realtime updates
      const channel = supabase
        .channel('orders-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          () => {
            fetchOrders();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, isAdmin]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Erro ao carregar pedidos',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const fetchOrderItems = async (orderId: string) => {
    const { data } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    return data || [];
  };

  const handleViewDetails = async (order: Order) => {
    const items = await fetchOrderItems(order.id);
    setSelectedOrder({ ...order, order_items: items });
    setDetailsOpen(true);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({
        title: 'Erro ao atualizar status',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Status atualizado!',
        description: `Pedido atualizado para "${statusConfig[newStatus].label}"`,
      });
      setDetailsOpen(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handlePrintTicket = () => {
    const printContent = ticketRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Comanda #${selectedOrder?.order_number}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Courier New', monospace; font-size: 12px; }
            .ticket { width: 300px; padding: 16px; }
            .text-center { text-align: center; }
            .font-bold { font-weight: bold; }
            .text-xl { font-size: 18px; }
            .text-lg { font-size: 16px; }
            .text-xs { font-size: 10px; }
            .border-dashed { border-bottom: 2px dashed #000; padding-bottom: 12px; margin-bottom: 12px; }
            .border-dotted { border-bottom: 1px dotted #999; margin-top: 8px; }
            .flex { display: flex; justify-content: space-between; }
            .ml-3 { margin-left: 12px; }
            .mt-2 { margin-top: 8px; }
            .mb-2 { margin-bottom: 8px; }
            .mb-3 { margin-bottom: 12px; }
            .mt-4 { margin-top: 16px; }
            .pt-2 { padding-top: 8px; }
            .pt-3 { padding-top: 12px; }
            .p-1 { padding: 4px; }
            .p-2 { padding: 8px; }
            .bg-gray { background: #f0f0f0; }
            .bg-yellow { background: #fef3cd; }
            .italic { font-style: italic; }
            .border-top { border-top: 2px solid #000; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Stats
  const todayOrders = orders.filter(
    (o) => new Date(o.created_at).toDateString() === new Date().toDateString()
  );
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const preparingOrders = orders.filter((o) => o.status === 'preparing').length;
  const deliveringOrders = orders.filter((o) => o.status === 'delivering').length;
  const todayRevenue = todayOrders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, o) => sum + Number(o.total), 0);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <XCircle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
        <p className="text-muted-foreground mb-4">Você não tem permissão para acessar esta página.</p>
        <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Colossal Burguer" className="h-10" />
            <h1 className="text-xl font-black hidden sm:block">Painel Administrativo</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchOrders}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pedidos Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black">{todayOrders.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Andamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-yellow-500">
                {pendingOrders + preparingOrders}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Saiu para Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-purple-500">{deliveringOrders}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Faturado Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black text-primary">
                R$ {todayRevenue.toFixed(2).replace('.', ',')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum pedido encontrado.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-bold">Pedido</th>
                      <th className="text-left py-3 px-2 font-bold">Cliente</th>
                      <th className="text-left py-3 px-2 font-bold hidden md:table-cell">Tipo</th>
                      <th className="text-left py-3 px-2 font-bold">Status</th>
                      <th className="text-left py-3 px-2 font-bold hidden sm:table-cell">Total</th>
                      <th className="text-right py-3 px-2 font-bold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const status = statusConfig[order.status];
                      const StatusIcon = status.icon;
                      return (
                        <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-3 px-2">
                            <span className="font-bold">#{order.order_number}</span>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.created_at).toLocaleString('pt-BR')}
                            </p>
                          </td>
                          <td className="py-3 px-2">
                            <span className="font-medium">{order.customer_name}</span>
                            <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
                          </td>
                          <td className="py-3 px-2 hidden md:table-cell">
                            <Badge variant="outline">
                              {order.delivery_type === 'pickup' ? 'Retirada' : 'Entrega'}
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <Badge className={`${status.color} text-white`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {status.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 hidden sm:table-cell">
                            <span className="font-bold text-primary">
                              R$ {Number(order.total).toFixed(2).replace('.', ',')}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(order)}
                            >
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
      </main>

      {/* Order Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">
              Pedido #{selectedOrder?.order_number}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-bold">Status do Pedido</label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value as OrderStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">🕐 Novo</SelectItem>
                    <SelectItem value="preparing">📦 Em Preparo</SelectItem>
                    <SelectItem value="delivering">🚚 Saiu para Entrega</SelectItem>
                    <SelectItem value="delivered">✅ Entregue</SelectItem>
                    <SelectItem value="cancelled">❌ Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Customer */}
              <div className="space-y-2">
                <h3 className="font-bold">Cliente</h3>
                <p>{selectedOrder.customer_name}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer_phone}</p>
              </div>

              {/* Delivery */}
              {selectedOrder.delivery_type === 'delivery' && (
                <div className="space-y-2">
                  <h3 className="font-bold">Endereço de Entrega</h3>
                  <p>
                    {selectedOrder.delivery_address}, {selectedOrder.delivery_number}
                    {selectedOrder.delivery_complement && ` - ${selectedOrder.delivery_complement}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.delivery_neighborhood}
                  </p>
                  {selectedOrder.delivery_reference && (
                    <p className="text-sm text-muted-foreground">
                      Ref: {selectedOrder.delivery_reference}
                    </p>
                  )}
                </div>
              )}

              {/* Payment */}
              <div className="space-y-2">
                <h3 className="font-bold">Pagamento</h3>
                <p className="capitalize">
                  {selectedOrder.payment_method === 'pix' && '💳 Pix'}
                  {selectedOrder.payment_method === 'card' && '💳 Cartão'}
                  {selectedOrder.payment_method === 'cash' && '💵 Dinheiro'}
                </p>
                {selectedOrder.payment_change_for && (
                  <p className="text-sm text-muted-foreground">
                    Troco para: R$ {Number(selectedOrder.payment_change_for).toFixed(2).replace('.', ',')}
                  </p>
                )}
              </div>

              {/* Items */}
              <div className="space-y-2">
                <h3 className="font-bold">Itens do Pedido</h3>
                <div className="space-y-2">
                  {selectedOrder.order_items?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm border-b border-border/50 pb-2">
                      <div>
                        <p className="font-medium">
                          {item.quantity}x {item.item_name}
                          {item.item_size && ` (${item.item_size})`}
                        </p>
                        {item.item_extras && item.item_extras.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            + {item.item_extras.join(', ')}
                          </p>
                        )}
                        {item.item_observations && (
                          <p className="text-xs text-muted-foreground italic">
                            "{item.item_observations}"
                          </p>
                        )}
                      </div>
                      <span>R$ {Number(item.total_price).toFixed(2).replace('.', ',')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {Number(selectedOrder.subtotal).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxa de Entrega</span>
                  <span>R$ {Number(selectedOrder.delivery_fee).toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">
                    R$ {Number(selectedOrder.total).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Print Button */}
              <Button 
                onClick={handlePrintTicket} 
                className="w-full"
                variant="outline"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimir Comanda
              </Button>

              {/* Hidden Ticket for Printing */}
              <div className="hidden">
                <OrderTicket ref={ticketRef} order={selectedOrder} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
