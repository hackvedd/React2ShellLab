"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-astracart-dark text-slate-300 font-sans flex items-center justify-center p-6 relative overflow-hidden selection:bg-astracart-crimson/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-astracart-dark via-astracart-navy to-astracart-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(220,38,38,0.05)_1px,transparent_0)] bg-[size:40px_40px] opacity-20"></div>

        {/* Cinematic Crimson Accents */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-astracart-crimson/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-astracart-crimson/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      <main className="w-full max-w-lg relative z-10 text-center">
        <div className="bg-astracart-navy/40 backdrop-blur-3xl border border-white/5 p-16 rounded-2xl shadow-2xl relative overflow-hidden group">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-astracart-crimson to-transparent opacity-50"></div>

          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-astracart-crimson/10 border border-astracart-crimson/30 rounded-2xl mb-8 relative">
              <span className="text-astracart-crimson font-black text-4xl italic tracking-tighter">
                404
              </span>
              <div className="absolute inset-0 bg-astracart-crimson blur-xl opacity-20 animate-pulse"></div>
            </div>

            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter scale-y-110 mb-4">
              Endpoint_Not_Found
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mb-12">
              Resource_Identifier_Invalid // Protocol_Error
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-black/40 border border-white/5 rounded-xl font-mono text-[10px] text-left text-slate-600 leading-relaxed">
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-astracart-crimson"></span>
                ERROR_CODE: 0x800404_RES_MISSING
              </p>
              <p className="flex items-center gap-3 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                ACTION: TERMINATE_PROTOCOL_STREAM
              </p>
              <p className="flex items-center gap-3 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                REASON: UNMAPPED_INFRASTRUCTURE_NODE
              </p>
            </div>

            <Link
              href="/"
              className="block w-full py-5 bg-astracart-crimson text-white font-black uppercase tracking-[0.3em] italic text-xs shadow-lg shadow-astracart-crimson/20 hover:scale-[1.02] active:scale-95 transition-all text-center"
            >
              Return_To_Central_Console
            </Link>
          </div>
        </div>

        {/* Animated Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] pointer-events-none font-mono text-[10px] leading-relaxed select-none animate-terminal-slide">
          {[...Array(10)].map((_, i) => (
            <p key={i}>
              CRITICAL_ERR: NODE_RELAY_FAILURE // PATH_UNRESOLVED // ATTEMPT_{i}
              _FAILED
            </p>
          ))}
        </div>
      </main>

      {/* Aesthetic Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[60] bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-60"></div>
    </div>
  );
}
