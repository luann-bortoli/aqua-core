'use client'

import { useEffect, useState } from "react";
import { getCurrentUser } from '../services/me';
import { LoginResponse } from "../types/entity";

export function useCurrentUser() {
    const [user, setUser] = useState<LoginResponse | null>(null);

    useEffect(() => {
        getCurrentUser().then(setUser);
    }, []);

    return user;
}