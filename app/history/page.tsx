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
    return <div>ログインしてください</div>;
  }

  console.log("orders", orders);

  return (
    <div className="p-4">
      {orders.map((order) => (
        <div key={order.id} className="mb-4 p-4 border rounded">
          <div>注文日時: {new Date(order.created_at).toLocaleString()}</div>
          <div>
            受け取り状況: {order.is_received ? "受け取り済み" : "未受け取り"}
          </div>
          <div>注文ID: {order.id}</div>
          <div>
            詳細:
            {order.details.map(
              (detail, index) =>
                detail.number > 0 && (
                  <div key={index} className="ml-4">
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
