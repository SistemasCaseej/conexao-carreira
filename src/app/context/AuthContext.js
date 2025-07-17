"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if(firebaseUser) {
                console.log("🔥 Firebase detectou:", firebaseUser);
                setUser(firebaseUser);
                setLoading(false);
            }else {
                console.log("User is signed out")
            }
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
