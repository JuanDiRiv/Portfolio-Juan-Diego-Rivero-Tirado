"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
    const [loading, setLoading] = useState(false);

    return (
        <Button
            variant="secondary"
            size="sm"
            disabled={loading}
            onClick={async () => {
                setLoading(true);
                try {
                    await fetch("/api/admin/logout", { method: "POST" });
                    if (auth) await signOut(auth);
                    window.location.href = "/admin/login";
                } finally {
                    setLoading(false);
                }
            }}
        >
            {loading ? "Saliendo…" : "Cerrar sesión"}
        </Button>
    );
}
