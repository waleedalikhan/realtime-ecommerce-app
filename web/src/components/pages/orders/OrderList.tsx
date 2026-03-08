import OrderItem from "@/components/pages/orders/OrderItem";

type Props = {
  orders: Order[];
};

const OrderList: React.FC<Props> = ({ orders }) => {
  return (
    <ul className="mt-8 space-y-4">
      {orders.map((o) => (
        <OrderItem key={o.id} order={o} />
      ))}
    </ul>
  );
};

export default OrderList;
