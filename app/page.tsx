import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-astracart-dark text-slate-200 overflow-hidden font-sans selection:bg-astracart-crimson/30">
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-astracart-dark via-astracart-navy to-astracart-dark"></div>
        <div className="absolute inset-0 holographic-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-20"></div>

        {/* Cinematic Crimson Accents */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-astracart-crimson/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-astracart-crimson/5 rounded-full blur-[100px] animate-float"></div>
      </div>

      {/* Global Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-astracart-dark/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-astracart-crimson flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              <span className="text-white font-black text-2xl italic tracking-tighter">
                AC
              </span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-white uppercase italic">
              AstraCart
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            <Link
              href="#features"
              className="hover:text-astracart-crimson transition-all"
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="hover:text-astracart-crimson transition-all"
            >
              Scale
            </Link>
            <Link
              href="/docs"
              className="hover:text-astracart-crimson transition-all"
            >
              Engine
            </Link>
            <Link
              href="/auth/login"
              className="px-6 py-2 border border-astracart-crimson/30 text-astracart-crimson hover:bg-astracart-crimson hover:text-white transition-all rounded"
            >
              Console_Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
          <div className="inline-flex items-center gap-3 rounded-full border border-astracart-crimson/20 bg-astracart-crimson/5 px-5 py-2 text-[10px] font-bold tracking-[0.3em] text-astracart-crimson uppercase backdrop-blur-sm mb-12">
            <span className="flex h-2 w-2 rounded-full bg-astracart-crimson animate-ping"></span>
            Enterprise Commerce Stack
          </div>

          <h1 className="max-w-5xl text-6xl sm:text-8xl lg:text-[110px] font-black tracking-tighter text-white leading-[0.85] italic uppercase mb-8">
            <span className="block opacity-40 text-4xl sm:text-5xl lg:text-6xl not-italic font-light mb-4 tracking-normal">
              The Future of
            </span>
            GLOBAL TRADE
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-slate-400 font-light tracking-wide leading-relaxed mb-12">
            High-availability infrastructure for modern retailers. Deploy
            low-latency digital storefronts with{" "}
            <span className="text-white underline decoration-astracart-crimson/50 underline-offset-4">
              miltary-grade security
            </span>{" "}
            and infinite scaling.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="/auth/login"
              className="group relative px-12 py-5 bg-astracart-crimson text-white font-black uppercase text-sm tracking-[0.2em] italic shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-105 transition-all"
            >
              Initialize Instance
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              href="#features"
              className="px-12 py-5 border border-white/10 text-white font-bold uppercase text-sm tracking-[0.2em] hover:bg-white/5 transition-all"
            >
              Systems_Overview
            </Link>
          </div>

          {/* Animated Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.02] pointer-events-none font-mono text-[10px] sm:text-sm leading-relaxed select-none animate-terminal-slide">
            {[...Array(20)].map((_, i) => (
              <p key={i}>
                ASTRA_LOG: SYNC_COMPLETE // NODE_{i}_ACTIVE // PROTOCOL_V3.8 //{" "}
                {Math.random().toString(36).substring(7)}
              </p>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-32 px-10 bg-black/40 border-y border-white/5 relative overflow-hidden text-slate-300 font-sans selection:bg-astracart-crimson/40"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-24">
              <h2 className="text-sm font-black text-astracart-crimson uppercase tracking-[0.4em] mb-4">
                Core Capacities
              </h2>
              <h3 className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter uppercase">
                Infrastructure Built to Scale
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quantum Engine",
                  desc: "Process million of transactions per microsecond with zero queue latency.",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                },
                {
                  title: "Shield OS",
                  desc: "Built-in DDoS protection and encrypted payment tunnels at the edge.",
                  icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                },
                {
                  title: "Global Mesh",
                  desc: "Distribute your inventory across 400+ edge locations for instant access.",
                  icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-astracart-navy/40 backdrop-blur-xl border border-white/5 p-10 rounded-xl group hover:border-astracart-crimson/30 transition-all"
                >
                  <div className="w-12 h-12 bg-astracart-crimson/10 border border-astracart-crimson/20 rounded flex items-center justify-center mb-8 group-hover:bg-astracart-crimson group-hover:text-white transition-all">
                    <svg
                      className="w-6 h-6 text-astracart-crimson group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={f.icon}
                      ></path>
                    </svg>
                  </div>
                  <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-4">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 font-light leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="py-32 px-10 relative text-slate-300 font-sans selection:bg-astracart-crimson/40"
        >
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-sm font-black text-astracart-crimson uppercase tracking-[0.4em] mb-4">
                Tier Selection
              </h2>
              <h3 className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter uppercase">
                Predictable Costs At Scale
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                {
                  name: "Entry",
                  price: "299",
                  features: ["12 Edge Nodes", "Basic API", "Shield OS Lite"],
                  active: false,
                },
                {
                  name: "Enterprise",
                  price: "999",
                  features: [
                    "Global Mesh Access",
                    "Full API Control",
                    "Shield OS Pro",
                    "24/7 Ops Support",
                  ],
                  active: true,
                },
                {
                  name: "Custom",
                  price: "POA",
                  features: [
                    "Dedicated Hardware",
                    "White-Glove Setup",
                    "Custom SLAs",
                  ],
                  active: false,
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`p-12 border-y border-x border-white/5 relative group transition-all ${plan.active ? "bg-astracart-crimson/5 z-10 border-astracart-crimson/40 shadow-[0_0_50px_rgba(220,38,38,0.1)]" : "hover:bg-white/[0.02]"}`}
                >
                  {plan.active && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-astracart-crimson"></div>
                  )}
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-sm font-bold opacity-40">$</span>
                    <span className="text-5xl font-black text-white tracking-tighter italic italic">
                      {plan.price}
                    </span>
                    <span className="text-xs font-mono opacity-20">/MO</span>
                  </div>

                  <ul className="space-y-4 mb-12">
                    {plan.features.map((feat, fi) => (
                      <li
                        key={fi}
                        className="text-xs font-bold uppercase tracking-widest flex items-center gap-3"
                      >
                        <span className="w-1.5 h-1.5 bg-astracart-crimson rounded-full"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 font-black uppercase text-xs tracking-[0.2em] transition-all ${plan.active ? "bg-astracart-crimson text-white shadow-lg shadow-astracart-crimson/30" : "border border-white/10 text-slate-400 hover:border-white hover:text-white"}`}
                  >
                    Initialize_{plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-10 border-t border-white/5 bg-black/60 backdrop-blur-3xl text-slate-300 font-sans selection:bg-astracart-crimson/40">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-astracart-crimson flex items-center justify-center">
                <span className="text-white font-black italic">A</span>
              </div>
              <span className="text-sm font-black text-white uppercase italic">
                AstraCart
              </span>
            </div>
            <div className="flex gap-10 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <Link
                href="#"
                className="hover:text-astracart-crimson transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-astracart-crimson transition-colors"
              >
                Compliance
              </Link>
              <Link
                href="#"
                className="hover:text-astracart-crimson transition-colors"
              >
                Infrastructure_Status
              </Link>
            </div>
            <p className="text-[9px] font-mono text-slate-700">
              © 2026 ASTRACART_SYSTEMS_GLOBAL // ESTABLISHED
            </p>
          </div>
        </footer>
      </main>

      {/* Cinematic Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[40] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
}
