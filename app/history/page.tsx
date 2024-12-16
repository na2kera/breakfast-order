"use client";

import { useSession } from "next-auth/react";
import { supabase } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
  id: number;
  created_at: string;
  user_id: number;
  is_received: boolean;
  details: {
    order_id: number;
    product: string;
    number: number;
  }[];
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
        .select("*, details!inner(order_id)")
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

  return (
    <div>
      {/* 注文履歴の表示ロジック */}
      {JSON.stringify(orders)}
    </div>
  );
}
