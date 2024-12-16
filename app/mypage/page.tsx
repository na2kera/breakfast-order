import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button className="px-4 py-2 m-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        注文する
      </button>
      <button className="px-4 py-2 m-2 text-white bg-green-500 rounded hover:bg-green-600">
        履歴を見る
      </button>
    </div>
  );
};

export default Page;
