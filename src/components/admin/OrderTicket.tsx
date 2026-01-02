import { forwardRef } from 'react';

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
  created_at: string;
  order_items?: OrderItem[];
}

interface OrderTicketProps {
  order: Order;
}

const OrderTicket = forwardRef<HTMLDivElement, OrderTicketProps>(({ order }, ref) => {
  const formatCurrency = (value: number) => {
    return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
  };

  const paymentLabels = {
    pix: 'PIX',
    card: 'CARTÃO',
    cash: 'DINHEIRO',
  };

  return (
    <div
      ref={ref}
      className="bg-white text-black p-4 font-mono text-sm"
      style={{ width: '300px' }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-dashed border-black pb-3 mb-3">
        <h1 className="text-xl font-bold">COLOSSAL BURGUER</h1>
        <p className="text-xs">COMANDA DA COZINHA</p>
      </div>

      {/* Order Info */}
      <div className="border-b-2 border-dashed border-black pb-3 mb-3">
        <div className="flex justify-between font-bold text-lg">
          <span>PEDIDO</span>
          <span>#{order.order_number}</span>
        </div>
        <p className="text-xs">
          {new Date(order.created_at).toLocaleString('pt-BR')}
        </p>
        <div className="mt-2 p-2 bg-gray-100 text-center font-bold text-lg">
          {order.delivery_type === 'pickup' ? '🏪 RETIRADA' : '🚚 ENTREGA'}
        </div>
      </div>

      {/* Customer */}
      <div className="border-b-2 border-dashed border-black pb-3 mb-3">
        <p className="font-bold">CLIENTE:</p>
        <p>{order.customer_name}</p>
        <p className="text-xs">{order.customer_phone}</p>
        
        {order.delivery_type === 'delivery' && (
          <div className="mt-2">
            <p className="font-bold">ENDEREÇO:</p>
            <p>
              {order.delivery_address}, {order.delivery_number}
              {order.delivery_complement && ` - ${order.delivery_complement}`}
            </p>
            <p>{order.delivery_neighborhood}</p>
            {order.delivery_reference && (
              <p className="text-xs italic">Ref: {order.delivery_reference}</p>
            )}
          </div>
        )}
      </div>

      {/* Items */}
      <div className="border-b-2 border-dashed border-black pb-3 mb-3">
        <p className="font-bold mb-2">ITENS:</p>
        {order.order_items?.map((item, index) => (
          <div key={item.id} className="mb-3">
            <div className="flex justify-between font-bold">
              <span>
                {item.quantity}x {item.item_name}
              </span>
            </div>
            {item.item_size && (
              <p className="text-xs ml-3">Tamanho: {item.item_size}</p>
            )}
            {item.item_extras && item.item_extras.length > 0 && (
              <div className="ml-3">
                {item.item_extras.map((extra, i) => (
                  <p key={i} className="text-xs">+ {extra}</p>
                ))}
              </div>
            )}
            {item.item_observations && (
              <p className="text-xs ml-3 italic bg-yellow-100 p-1 mt-1">
                OBS: {item.item_observations}
              </p>
            )}
            {index < (order.order_items?.length || 0) - 1 && (
              <div className="border-b border-dotted border-gray-400 mt-2" />
            )}
          </div>
        ))}
      </div>

      {/* Payment */}
      <div className="border-b-2 border-dashed border-black pb-3 mb-3">
        <p className="font-bold">PAGAMENTO:</p>
        <p className="text-lg font-bold">{paymentLabels[order.payment_method]}</p>
        {order.payment_method === 'cash' && order.payment_change_for && (
          <p className="bg-yellow-100 p-1 font-bold">
            TROCO PARA: {formatCurrency(order.payment_change_for)}
          </p>
        )}
      </div>

      {/* Total */}
      <div className="text-center">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Entrega:</span>
          <span>{formatCurrency(order.delivery_fee)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-2 pt-2 border-t-2 border-black">
          <span>TOTAL:</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4 pt-3 border-t-2 border-dashed border-black">
        <p className="text-xs">--- FIM DA COMANDA ---</p>
      </div>
    </div>
  );
});

OrderTicket.displayName = 'OrderTicket';

export default OrderTicket;
