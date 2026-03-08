"use client";
import { useEffect } from "react";
import useOrders from "@/hooks/useOrders";
import AuthWall from "@/components/global/AuthWall";
import OrderEmpty from "@/components/pages/orders/OrderEmpty";
import OrderList from "@/components/pages/orders/OrderList";

const Orders: React.FC = () => {
  const { orders, isLoading, lastOrderUpdate, refetch, token } = useOrders();

  useEffect(() => {
    if (lastOrderUpdate && token) refetch();
  }, [lastOrderUpdate, token, refetch]);

  if (!token) return <AuthWall message="Please log in to view your orders." />;
  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-stone-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6">
      <h1 className="text-2xl font-bold text-white">Orders</h1>
      <p className="mt-1 text-stone-400">
        Track your orders with live status updates.
      </p>
      {!orders?.length ? <OrderEmpty /> : <OrderList orders={orders} />}
    </div>
  );
};

export default Orders;
