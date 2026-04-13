import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Order {
  id: string;
  total: number;
  status: string;
  created_at: string;
  delivery_type: string;
  payment_method: string;
}

interface OrdersChartProps {
  orders: Order[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#eab308',
  preparing: '#3b82f6',
  delivering: '#a855f7',
  delivered: '#22c55e',
  cancelled: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Novo',
  preparing: 'Preparando',
  delivering: 'Entrega',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

const PAYMENT_LABELS: Record<string, string> = {
  pix: 'Pix',
  card: 'Cartão',
  cash: 'Dinheiro',
};

const OrdersChart = ({ orders }: OrdersChartProps) => {
  // Last 7 days revenue
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const revenueData = last7Days.map(date => {
    const dateStr = date.toDateString();
    const dayOrders = orders.filter(
      o => new Date(o.created_at).toDateString() === dateStr && o.status === 'delivered'
    );
    return {
      day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      receita: dayOrders.reduce((s, o) => s + Number(o.total), 0),
      pedidos: dayOrders.length,
    };
  });

  // Status distribution
  const statusData = Object.entries(
    orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([status, count]) => ({
    name: STATUS_LABELS[status] || status,
    value: count,
    color: STATUS_COLORS[status] || '#888',
  }));

  // Payment distribution
  const paymentData = Object.entries(
    orders.reduce((acc, o) => {
      acc[o.payment_method] = (acc[o.payment_method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([method, count]) => ({
    name: PAYMENT_LABELS[method] || method,
    value: count,
    color: method === 'pix' ? '#22c55e' : method === 'card' ? '#3b82f6' : '#eab308',
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Revenue Chart */}
      <Card className="md:col-span-1 border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Faturamento (7 dias)</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} width={40} />
              <Tooltip
                formatter={(value: number) => [`R$ ${value.toFixed(2).replace('.', ',')}`, 'Receita']}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="receita" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Pie */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Status dos Pedidos</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center">
          <ResponsiveContainer width="50%" height="100%">
            <PieChart>
              <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={70} strokeWidth={2}>
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1 text-xs">
            {statusData.map(s => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                <span>{s.name}: {s.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Pie */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold">Formas de Pagamento</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center">
          <ResponsiveContainer width="50%" height="100%">
            <PieChart>
              <Pie data={paymentData} dataKey="value" cx="50%" cy="50%" outerRadius={70} strokeWidth={2}>
                {paymentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1 text-xs">
            {paymentData.map(s => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                <span>{s.name}: {s.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersChart;
