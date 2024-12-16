"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/server";

interface Order {
  id: string;
  created_at: string;
  user_id: string;
  is_received: boolean;
}

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
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

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="p-4 border-b border-gray-200">
          <div className="text-lg font-semibold">{order.id}</div>
          <div className="text-sm text-gray-500">{order.created_at}</div>
          <div
            className={`text-sm ${
              order.is_received ? "text-green-500" : "text-red-500"
            }`}
          >
            {order.is_received ? "受取済み" : "未受取"}
          </div>
          {!order.is_received && (
            <button
              onClick={() => handleMarkAsReceived(order.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
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
