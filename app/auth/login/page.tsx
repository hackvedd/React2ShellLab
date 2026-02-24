"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    if (email === "admin@astracart.io" && password === "AstraSecure2025") {
      document.cookie = "auth=true; path=/";
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-astracart-dark text-slate-300 font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(220,38,38,0.1)_1px,transparent_0)] bg-[size:40px_40px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(15,23,42,1)_0%,rgba(2,6,23,1)_100%)] opacity-80"></div>
      </div>

      <main className="w-full max-w-md relative z-10">
        <div className="bg-astracart-navy/40 backdrop-blur-2xl border border-white/10 p-12 rounded-2xl shadow-2xl relative overflow-hidden group">
          {/* AstraCart Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-astracart-crimson rounded-lg mb-6 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
              <span className="text-white font-black text-3xl italic tracking-tighter">
                AC
              </span>
            </div>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter scale-y-110">
              Console_Access
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
              Enterprise Infrastructure Platform
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                Identity_Handle
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-white font-medium text-sm focus:outline-none focus:border-astracart-crimson/50 focus:bg-white/10 transition-all placeholder:text-slate-700"
                placeholder="ADMIN@ASTRACART.IO"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                Security_Cipher
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-white font-medium text-sm focus:outline-none focus:border-astracart-crimson/50 focus:bg-white/10 transition-all placeholder:text-slate-700"
                placeholder="••••••••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-astracart-crimson text-white font-black uppercase tracking-[0.3em] italic text-xs shadow-lg shadow-astracart-crimson/20 hover:scale-[1.02] transition-all"
            >
              Synchronize_Access
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              New Instance Deployment?
            </p>
            <Link
              href="/auth/register"
              className="text-xs font-black text-astracart-crimson uppercase tracking-widest hover:text-white transition-all italic"
            >
              Create_Infrastructure_Account
            </Link>
          </div>
        </div>
      </main>

      {/* Aesthetic Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[60] bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-60"></div>
    </div>
  );
}
