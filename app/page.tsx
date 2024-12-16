"use client";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { supabase } from "./utils/supabase/server";

export default function Home() {
  const { data: session } = useSession();

  //supabaseから値を取り出す
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("test").select("*");
      console.log(data);
      if (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (session) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-2xl font-bold">
          Signed in as {session?.user?.email}
        </h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="text-center mt-12">
      <h1 className="text-2xl font-bold">Not signed in</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => signIn("google", { callbackUrl: "/saveuser" })}
      >
        Sign in
      </button>
    </div>
  );
}
