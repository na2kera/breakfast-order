"use client";

import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderDetail {
  order_id: string;
  product: string;
  number: number;
}

interface Order {
  id: string;
  created_at: string;
  user_id: string;
  is_received: boolean;
  details: OrderDetail[];
}

export default function HistoryPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) {
        redirect("/login");
        return;
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", session.user?.email)
        .single();

      if (userError) {
        console.error(userError);
        return;
      }

      const { data: orderData, error } = await supabase
        .from("orders")
        .select("*, details!inner(order_id, product, number)")
        .eq("user_id", user?.id);

      if (error) {
        console.error(error);
        return;
      }

      setOrders(orderData);
    };

    fetchOrders();
  }, [session]);

  if (!session) {
    return <div className="text-center text-red-500">ログインしてください</div>;
  }

  console.log("orders", orders);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {orders.map((order) => (
        <div
          key={order.id}
          className="mb-4 p-4 border rounded shadow-lg bg-white"
        >
          <div className="font-bold text-lg">
            注文日時: {new Date(order.created_at).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            受け取り状況:{" "}
            <span
              className={order.is_received ? "text-green-500" : "text-red-500"}
            >
              {order.is_received ? "受け取り済み" : "未受け取り"}
            </span>
          </div>
          <div className="text-sm">注文ID: {order.id}</div>
          <div className="mt-2">
            <div className="font-semibold">詳細:</div>
            {order.details.map(
              (detail, index) =>
                detail.number > 0 && (
                  <div key={index} className="ml-4 text-sm">
                    注文詳細 {index + 1}: {detail.product} {detail.number}個
                  </div>
                )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
