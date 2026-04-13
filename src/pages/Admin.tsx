import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw, XCircle } from 'lucide-react';
import DashboardStats from '@/components/admin/DashboardStats';
import OrdersChart from '@/components/admin/OrdersChart';
import OrdersTable from '@/components/admin/OrdersTable';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';
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

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Novo',
  preparing: 'Em Preparo',
  delivering: 'Saiu para Entrega',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const orderCountRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playNotification = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/notification.wav');
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    } catch {}
  }, []);

  useEffect(() => {
    if (!authLoading && !user) navigate('/admin/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchOrders();
      const channel = supabase
        .channel('orders-changes')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, () => {
          playNotification();
          fetchOrders();
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, () => fetchOrders())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [user, isAdmin]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Erro ao carregar pedidos', description: error.message, variant: 'destructive' });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const handleViewDetails = async (order: Order) => {
    const { data } = await supabase.from('order_items').select('*').eq('order_id', order.id);
    setSelectedOrder({ ...order, order_items: data || [] });
    setDetailsOpen(true);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) {
      toast({ title: 'Erro ao atualizar status', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Status atualizado!', description: `Pedido atualizado para "${statusLabels[newStatus]}"` });
      setDetailsOpen(false);
    }
  };

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
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Colossal Burguer" className="h-9" />
            <div>
              <h1 className="text-lg font-black leading-tight">Dashboard</h1>
              <p className="text-[11px] text-muted-foreground">Painel Administrativo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchOrders}>
              <RefreshCw className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Atualizar</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate('/admin/login'); }}>
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <DashboardStats orders={orders} />
        <OrdersChart orders={orders} />
        <OrdersTable orders={orders} onViewDetails={handleViewDetails} />
      </main>

      <OrderDetailsModal
        order={selectedOrder}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Admin;
