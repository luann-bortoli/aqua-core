'use client'

import { useRouter } from "next/navigation";
import { api } from "../shared/lib/api";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()

  async function redirectUser() {
    try
    {
      await api.get("/auth/me");

      router.replace("/dashboard");
    } catch
    {
      router.replace("/login");
    }
  }

  useEffect(() => {
    redirectUser()
  }, [])

  return (
    <>
    </>
  );
}
