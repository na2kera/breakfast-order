"use client";
import React, { useState } from "react";
import { supabase } from "../utils/supabase/server";
import { useSession } from "next-auth/react";

const OrderPage = () => {
  const { data: session } = useSession();
  const [japaneseSet, setJapaneseSet] = useState(0);
  const [westernSet, setWesternSet] = useState(0);

  const handleOrderSubmit = async () => {
    // Handle order submission logic here

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", session?.user?.email)
      .single();

    if (userError) {
      console.error(userError);
      return;
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([{ user_id: userData.id, is_received: false }])
      .select()
      .single();

    if (orderError) {
      console.error(orderError);
      return;
    }

    const { error: detailsError } = await supabase.from("details").insert([
      {
        order_id: orderData.id,
        product: "Japanese Set",
        number: japaneseSet,
      },
      {
        order_id: orderData.id,
        product: "Western Set",
        number: westernSet,
      },
    ]);

    if (detailsError) {
      console.error(detailsError);
      return;
    }

    console.log(`Japanese Set: ${japaneseSet}, Western Set: ${westernSet}`);
    alert("注文が確定されました！");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">注文フォーム</h1>
      <div className="mb-4">
        <label className="block mb-2">和食セット（個数を選択）</label>
        <input
          type="number"
          value={japaneseSet}
          onChange={(e) => setJapaneseSet(Number(e.target.value))}
          className="px-4 py-2 border rounded"
          min="0"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">洋食セット（個数を選択）</label>
        <input
          type="number"
          value={westernSet}
          onChange={(e) => setWesternSet(Number(e.target.value))}
          className="px-4 py-2 border rounded"
          min="0"
        />
      </div>
      <button
        onClick={handleOrderSubmit}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        注文を確定
      </button>
    </div>
  );
};

export default OrderPage;
