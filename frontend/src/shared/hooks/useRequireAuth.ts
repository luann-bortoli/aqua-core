'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../services/me"

export function useRequireAuth() {
    const router = useRouter();

    useEffect(() => {
        async function authenticate() {
            try
            {
                await getCurrentUser();
            } catch
            {
                router.replace("/login");
            }
        }

        authenticate();
    }, [router]);
}