"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");






    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });


            const data = await res.json();



            if (res.ok) {
                // localStorage.setItem("token", data.token);
                localStorage.setItem("token", data.token);
                router.push("/dashboard"); // Navigate to dashboard on successful login


            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again later.");
        }
    };


    return (
        <section className="bg-black min-h-screen absolute inset-0 flex items-center justify-center z-50">
            <div className="max-w-md w-full bg-white p-8 rounded shadow">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-full py-2 rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
}
