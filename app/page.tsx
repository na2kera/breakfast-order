"use client";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { supabase } from "./utils/supabase/server";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

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
    router.push("/mypage");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
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
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Not signed in</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => signIn("google", { callbackUrl: "/saveuser" })}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
