"use client";
import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import { supabase } from "../utils/supabase/server";
import { useRouter } from "next/navigation";

const SaveUser = () => {
  const router = useRouter();
  useEffect(() => {
    const sendUserData = async () => {
      const session = await getSession();
      console.log(session);

      const { data, error } = await supabase.from("users").upsert(
        {
          email: session?.user?.email,
          name: session?.user?.name,
        },
        {
          onConflict: "email",
        }
      );

      console.log(data);
      if (error) {
        console.error(error);
      } else {
        router.push("/mypage");
      }
    };
    sendUserData();
  }, []);
  return <div>しばらくお待ちください</div>;
};

export default SaveUser;
