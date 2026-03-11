import React from "react";
import { View } from "react-native";
import OrderItem from "@/components/pages/orders/OrderItem";
import { orderListStyles as styles } from "@/styles/Orders.styles";

type Props = { orders: Order[] };

const OrderList: React.FC<Props> = ({ orders }) => (
  <View style={styles.list}>
    {orders.map((o) => (
      <OrderItem key={o.id} order={o} />
    ))}
  </View>
);

export default OrderList;
