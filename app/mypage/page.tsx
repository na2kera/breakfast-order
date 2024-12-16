"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => router.push("/order")}
        className="px-4 py-2 m-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        注文する
      </button>
      <button
        onClick={() => router.push("/history")}
        className="px-4 py-2 m-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        履歴を見る
      </button>
    </div>
  );
};

export default Page;
