"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Background animation setup (consistent with landing page)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate auth sequence
    setTimeout(() => {
      // Set auth cookie
      document.cookie = "auth=true; path=/";
      router.push("/admin/dashboard");
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-astracart-dark text-slate-300 font-sans flex items-center justify-center p-6 relative overflow-hidden selection:bg-astracart-crimson/30">
      {/* Cinematic Background (Consistent with Landing Page) */}
      <div className="fixed inset-0 z-0 text-slate-200">
        <div className="absolute inset-0 bg-gradient-to-br from-astracart-dark via-astracart-navy to-astracart-dark"></div>
        <div className="absolute inset-0 holographic-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20"></div>

        {/* Cinematic Crimson Accents */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-astracart-crimson/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-astracart-crimson/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      {/* Login Card */}
      <main className="w-full max-w-md relative z-10 glass-panel overflow-hidden animate-in fade-in zoom-in duration-700">
        <div className="bg-astracart-navy/40 backdrop-blur-3xl border border-white/5 p-12 rounded-2xl shadow-2xl relative">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-astracart-crimson to-transparent opacity-50"></div>

          {/* AstraCart Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-astracart-crimson rounded-xl mb-6 shadow-[0_0_40px_rgba(220,38,38,0.4)] relative group transition-all hover:scale-110">
              <span className="text-white font-black text-3xl italic tracking-tighter">
                AC
              </span>
              <div className="absolute inset-0 bg-astracart-crimson blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter scale-y-110">
              AstraCart
            </h1>
            <p className="text-[10px] font-bold text-astracart-crimson uppercase tracking-[0.4em] mt-3 animate-pulse">
              Admin Control Panel Access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            {/* Identity Field */}
            <div className="space-y-3 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 group-focus-within:text-astracart-crimson transition-colors">
                System_Identity
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 py-5 px-6 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-astracart-crimson/50 focus:bg-white/10 transition-all placeholder:text-slate-700 italic tracking-wider shadow-inner"
                  placeholder="ADMIN@ASTRACART.IO"
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-20">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Credential Field */}
            <div className="space-y-3 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 group-focus-within:text-astracart-crimson transition-colors">
                Security_Cipher
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 py-5 px-6 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-astracart-crimson/50 focus:bg-white/10 transition-all placeholder:text-slate-700 tracking-widest"
                  placeholder="••••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-astracart-crimson transition-colors"
                >
                  <svg
                    className="w-5 h-5 font-bold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="#"
                className="text-[10px] font-black text-slate-600 hover:text-white uppercase tracking-widest transition-colors italic"
              >
                [ORPHANED_CREDENTIALS?]
              </Link>
            </div>

            {/* Action Trigger */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-6 bg-astracart-crimson text-white font-black uppercase tracking-[0.4em] italic text-xs shadow-2xl shadow-astracart-crimson/30 hover:scale-[1.02] active:scale-95 transition-all relative overflow-hidden group ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">
                {loading ? "INITIALIZING_STREAM..." : "Sign In to Admin"}
              </span>
            </button>
          </form>

          {/* Security Footer */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-3 opacity-20">
              <div className="w-1.5 h-1.5 rounded-full bg-astracart-crimson animate-ping"></div>
              <p className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.5em]">
                Encrypted_Data_Link_Active
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Aesthetic Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[60] bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-60"></div>
    </div>
  );
}
