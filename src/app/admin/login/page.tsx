"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // If already has a valid server session, go straight to /admin
        fetch("/api/admin/me")
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (data?.authenticated) window.location.href = "/admin";
            })
            .catch(() => { });
    }, []);

    return (
        <Container className="py-12">
            <div className="mx-auto max-w-md">
                <h1 className="text-2xl font-semibold tracking-tight">Admin login</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Acceso restringido. No hay registro.
                </p>

                <Card className="mt-6 p-5">
                    {!isFirebaseConfigured ? (
                        <div className="text-sm text-muted-foreground">
                            Firebase no está configurado (faltan variables `NEXT_PUBLIC_FIREBASE_*`).
                        </div>
                    ) : (
                        <form
                            className="space-y-3"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setError(null);

                                if (!auth) {
                                    setError("Firebase Auth no disponible.");
                                    return;
                                }

                                setLoading(true);
                                try {
                                    const cred = await signInWithEmailAndPassword(auth, email, password);
                                    const idToken = await cred.user.getIdToken(true);

                                    const res = await fetch("/api/admin/session", {
                                        method: "POST",
                                        headers: { "content-type": "application/json" },
                                        body: JSON.stringify({ idToken }),
                                    });

                                    if (!res.ok) {
                                        const data = await res.json().catch(() => ({}));
                                        setError(data?.error || "No autorizado.");
                                        return;
                                    }

                                    window.location.href = "/admin";
                                } catch {
                                    setError("Credenciales inválidas o usuario no existe.");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >
                            <div className="space-y-1">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Contraseña</label>
                                <input
                                    className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error ? (
                                <div className="rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground">
                                    {error}
                                </div>
                            ) : null}

                            <Button className="w-full" disabled={loading} type="submit">
                                {loading ? "Entrando…" : "Entrar"}
                            </Button>
                        </form>
                    )}
                </Card>
            </div>
        </Container>
    );
}
