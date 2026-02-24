"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/auth/login");
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
              System_Provision
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
              Initialize Global Commerce Node
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                Company_Identifier
              </label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-white font-medium text-sm focus:outline-none focus:border-astracart-crimson/50 transition-all"
                placeholder="ENTERPRISE_NAME_LLC"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                Admin_Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-white font-medium text-sm focus:outline-none focus:border-astracart-crimson/50 transition-all"
                placeholder="ADMIN@DOMAIN.COM"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                Primary_Security_Key
              </label>
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 py-4 px-6 rounded-lg text-white font-medium text-sm focus:outline-none focus:border-astracart-crimson/50 transition-all"
                placeholder="CREATE_PASSWORD"
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-astracart-crimson text-white font-black uppercase tracking-[0.3em] italic text-xs shadow-lg shadow-astracart-crimson/20 hover:scale-[1.02] transition-all mt-4"
            >
              Deploy_Tenant_Environment
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
              Instance already provisioned?
            </p>
            <Link
              href="/auth/login"
              className="text-xs font-black text-astracart-crimson uppercase tracking-widest hover:text-white transition-all italic"
            >
              Connect_To_Existing_Console
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
