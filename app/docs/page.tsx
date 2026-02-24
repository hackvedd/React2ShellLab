"use client";
import { useState } from "react";
import Link from "next/link";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    {
      id: "getting-started",
      label: "Getting Started",
      items: ["Quick Installation", "Project Structure", "Core Concepts"],
    },
    {
      id: "engine",
      label: "Commerce Engine",
      items: ["Order Lifecycle", "Inventory Sync", "Dynamic Pricing"],
    },
    {
      id: "security",
      label: "Shield_OS Security",
      items: ["AES Encryption", "DDoS Mitigation", "Audit Logging"],
    },
    {
      id: "api",
      label: "API Reference",
      items: ["Authentication", "Endpoints", "SDKs"],
    },
  ];

  return (
    <div className="flex h-screen bg-astracart-dark text-slate-300 font-sans selection:bg-astracart-crimson/30 overflow-hidden">
      {/* Sidebar navigation */}
      <aside className="w-80 border-r border-white/5 bg-astracart-dark/60 backdrop-blur-3xl flex flex-col z-20 overflow-y-auto custom-scrollbar">
        <div className="p-10 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-astracart-crimson flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <span className="text-white font-black text-xl italic tracking-tighter">
                AC
              </span>
            </div>
            <span className="text-lg font-black text-white italic tracking-tighter uppercase">
              AstraCart Docs
            </span>
          </Link>
        </div>

        <nav className="p-8 space-y-10">
          {sections.map((sec) => (
            <div key={sec.id} className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-astracart-crimson tracking-[0.4em] mb-4">
                {sec.label}
              </h3>
              <ul className="space-y-4">
                {sec.items.map((item, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setActiveSection(`${sec.id}-${i}`)}
                      className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all flex items-center gap-3 group"
                    >
                      <span className="w-1 h-1 bg-slate-700 group-hover:bg-astracart-crimson transition-colors rounded-full"></span>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10 px-20 py-24">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xs font-mono text-astracart-crimson font-black tracking-[0.3em] uppercase">
              <span>Infrastructure</span>
              <span className="opacity-20">/</span>
              <span>Core_Setup</span>
            </div>
            <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter scale-y-110">
              Quick Installation
            </h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Initialize the AstraCart Commerce Engine in your local environment
              within minutes. Our zero-configuration CLI ensures your
              infrastructure is ready for global scale immediately.
            </p>
          </div>

          <div className="space-y-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-10 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-4xl font-black italic select-none">
                NODE_INIT
              </div>
              <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">
                Command Line Deployment
              </h3>
              <div className="bg-black/80 rounded-lg p-6 font-mono text-sm border border-red-900/10">
                <p className="text-slate-500 mb-2"># Initialize core engine</p>
                <p className="text-red-500">
                  <span className="text-white">npx</span> astracart@latest
                  deploy --region-global
                </p>
                <p className="text-slate-500 mt-4 font-bold text-[10px] uppercase opacity-40 italic mt-6">
                  Searching for available edge nodes...
                </p>
                <p className="text-green-500 text-[10px] uppercase font-bold tracking-widest mt-1 animate-pulse">
                  Connection Established [OK]
                </p>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-light italic opacity-60">
                * Requires valid enterprise license key linked to your system
                hardware id.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-astracart-navy/20 border border-white/5 p-8 rounded-xl hover:bg-astracart-navy/40 transition-all cursor-pointer">
                <h4 className="text-[10px] font-black text-astracart-crimson uppercase tracking-[0.4em] mb-4">
                  Core Concepts
                </h4>
                <p className="text-sm text-slate-300 font-bold mb-2">
                  The Order Lifecycle
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Understand how order streaming works across global edge nodes
                  in real-time.
                </p>
              </div>
              <div className="bg-astracart-navy/20 border border-white/5 p-8 rounded-xl hover:bg-astracart-navy/40 transition-all cursor-pointer">
                <h4 className="text-[10px] font-black text-astracart-crimson uppercase tracking-[0.4em] mb-4">
                  Safety Protocols
                </h4>
                <p className="text-sm text-slate-300 font-bold mb-2">
                  Identity Shield OS
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  How we protect transaction data using custom-built P2P
                  encryption overlays.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-20 border-t border-white/5 flex justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-widest">
            <span>Next Version: v4.28-Stable</span>
            <div className="flex gap-10">
              <Link href="#" className="hover:text-astracart-crimson">
                Changelog
              </Link>
              <Link href="#" className="hover:text-astracart-crimson">
                Developer Portal
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-[5%] w-[400px] h-[400px] bg-astracart-crimson/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-astracart-navy/20 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
