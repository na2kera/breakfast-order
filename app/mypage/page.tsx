"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        ログインしてください
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => router.push("/order")}
        className="px-4 py-2 m-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300"
      >
        注文する
      </button>
      <button
        onClick={() => router.push("/history")}
        className="px-4 py-2 m-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-300"
      >
        履歴を見る
      </button>
    </div>
  );
};

export default Page;
