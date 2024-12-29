"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/server";

interface Order {
  id: string;
  created_at: string;
  user_id: string;
  is_received: boolean;
  details: {
    id: string;
    product: string;
    number: number;
  }[];
}

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `id, created_at, user_id, is_received, details(id, product, number)`
        )
        .eq("is_received", false);

      if (error) {
        console.error(error);

        return;
      }
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  const handleMarkAsReceived = async (orderId: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ is_received: true })
      .eq("id", orderId);

    if (error) {
      console.error(error);
      return;
    }

    // Update the local state to reflect the change
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, is_received: true } : order
      )
    );
  };

  console.log(orders);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">未受取の注文</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-4 mb-4 bg-white shadow-md rounded-lg border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">{order.id}</div>
            <div
              className={`text-sm ${
                order.is_received ? "text-green-600" : "text-red-600"
              }`}
            >
              {order.is_received ? "受取済み" : "未受取"}
            </div>
          </div>
          <div className="text-sm text-gray-500">{order.created_at}</div>
          {!order.is_received && (
            <button
              onClick={() => handleMarkAsReceived(order.id)}
              className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300"
            >
              受取済みにする
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
