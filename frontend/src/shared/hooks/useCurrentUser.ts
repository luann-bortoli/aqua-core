'use client'

import { useEffect, useState } from "react";
import { getCurrentUser } from '../services/me';

export function useCurrentUser() {
    const [user, setUser] = useState<LoginResponse | null>(null);

    useEffect(() => {
        getCurrentUser().then(setUser);
    }, []);

    return user;
}