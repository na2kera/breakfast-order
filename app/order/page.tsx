"use client";
import React, { useState } from "react";

const OrderPage = () => {
  const [japaneseSet, setJapaneseSet] = useState(0);
  const [westernSet, setWesternSet] = useState(0);

  const handleOrderSubmit = () => {
    // Handle order submission logic here
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
