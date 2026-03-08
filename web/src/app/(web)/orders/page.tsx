import { Metadata, NextPage } from "next";
import Orders from "@/components/pages/orders";

export const metadata: Metadata = {
  title: "Realtime Commerce | Orders",
  description: "Track your orders with live status updates.",
};

const OrdersPage: NextPage = () => {
  return <Orders />;
};

export default OrdersPage;
