import { useRef } from 'react';
import { Button } from '@/components/ui/button';
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
import { Printer } from 'lucide-react';
import OrderTicket from './OrderTicket';

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

interface OrderDetailsModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderDetailsModal = ({ order, open, onOpenChange, onUpdateStatus }: OrderDetailsModalProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = ticketRef.current;
    if (!printContent || !order) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html><html><head><title>Comanda #${order.order_number}</title>
      <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Courier New',monospace;font-size:12px}.ticket{width:300px;padding:16px}.text-center{text-align:center}.font-bold{font-weight:bold}.text-xl{font-size:18px}.text-lg{font-size:16px}.text-xs{font-size:10px}.border-dashed{border-bottom:2px dashed #000;padding-bottom:12px;margin-bottom:12px}.border-dotted{border-bottom:1px dotted #999;margin-top:8px}.flex{display:flex;justify-content:space-between}.ml-3{margin-left:12px}.mt-2{margin-top:8px}.mb-2{margin-bottom:8px}.mb-3{margin-bottom:12px}.mt-4{margin-top:16px}.pt-2{padding-top:8px}.pt-3{padding-top:12px}.p-1{padding:4px}.p-2{padding:8px}.bg-gray-100{background:#f0f0f0}.italic{font-style:italic}.border-t-2{border-top:2px solid #000}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>
      </head><body>${printContent.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 250);
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            Pedido #{order.order_number}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-bold">Status do Pedido</label>
            <Select
              value={order.status}
              onValueChange={(v) => onUpdateStatus(order.id, v as OrderStatus)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
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
          <div className="space-y-1">
            <h3 className="font-bold text-sm">Cliente</h3>
            <p className="text-sm">{order.customer_name}</p>
            <p className="text-xs text-muted-foreground">{order.customer_phone}</p>
          </div>

          {/* Delivery */}
          {order.delivery_type === 'delivery' && (
            <div className="space-y-1">
              <h3 className="font-bold text-sm">Endereço de Entrega</h3>
              <p className="text-sm">
                {order.delivery_address}, {order.delivery_number}
                {order.delivery_complement && ` - ${order.delivery_complement}`}
              </p>
              <p className="text-xs text-muted-foreground">{order.delivery_neighborhood}</p>
              {order.delivery_reference && (
                <p className="text-xs text-muted-foreground">Ref: {order.delivery_reference}</p>
              )}
            </div>
          )}

          {/* Payment */}
          <div className="space-y-1">
            <h3 className="font-bold text-sm">Pagamento</h3>
            <p className="text-sm">
              {order.payment_method === 'pix' && '💳 Pix'}
              {order.payment_method === 'card' && '💳 Cartão'}
              {order.payment_method === 'cash' && '💵 Dinheiro'}
            </p>
            {order.payment_change_for && (
              <p className="text-xs text-muted-foreground">
                Troco para: R$ {Number(order.payment_change_for).toFixed(2).replace('.', ',')}
              </p>
            )}
          </div>

          {/* Items */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm">Itens do Pedido</h3>
            {order.order_items?.map(item => (
              <div key={item.id} className="flex justify-between text-sm border-b border-border/30 pb-2">
                <div>
                  <p className="font-medium">
                    {item.quantity}x {item.item_name}
                    {item.item_size && ` (${item.item_size})`}
                  </p>
                  {item.item_extras && item.item_extras.length > 0 && (
                    <p className="text-xs text-muted-foreground">+ {item.item_extras.join(', ')}</p>
                  )}
                  {item.item_observations && (
                    <p className="text-xs text-muted-foreground italic">"{item.item_observations}"</p>
                  )}
                </div>
                <span className="text-sm">R$ {Number(item.total_price).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-border pt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>R$ {Number(order.subtotal).toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxa de Entrega</span>
              <span>R$ {Number(order.delivery_fee).toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">R$ {Number(order.total).toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <Button onClick={handlePrint} className="w-full" variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Comanda
          </Button>

          <div className="hidden">
            <OrderTicket ref={ticketRef} order={order} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
