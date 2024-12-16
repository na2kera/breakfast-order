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
    };

    fetchData();
  }, []);

  if (session) {
    return (
      <>
        <h1>Signed in as {session?.user?.email}</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <h1>Not signed in</h1>
      <button onClick={() => signIn("google")}>Sign in</button>
    </>
  );
}
