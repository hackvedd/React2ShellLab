"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Input Sanitization Utility
const sanitizeInput = (str: string) => {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "") // Basic tag stripping
    .trim()
    .slice(0, 500); // Prevent buffer overflow/DOS via long strings
};

// Animated Counter Component
const CountUp = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Mock Data
const INITIAL_PRODUCTS = [
  {
    id: "PRD-X01",
    name: "CyberCore Server",
    category: "Hardware",
    stock: 45,
    price: 12400,
    img: "https://api.dicebear.com/7.x/shapes/svg?seed=X01&backgroundColor=0f172a",
  },
  {
    id: "PRD-X02",
    name: "Optic Tunnel Bundle",
    category: "Networking",
    stock: 124,
    price: 890,
    img: "https://api.dicebear.com/7.x/shapes/svg?seed=X02&backgroundColor=0f172a",
  },
  {
    id: "PRD-X03",
    name: "Security Module Pro",
    category: "Software",
    stock: 8,
    price: 4200,
    img: "https://api.dicebear.com/7.x/shapes/svg?seed=X03&backgroundColor=0f172a",
  },
  {
    id: "PRD-X04",
    name: "Quantum Chipset",
    category: "Computing",
    stock: 0,
    price: 15600,
    img: "https://api.dicebear.com/7.x/shapes/svg?seed=X04&backgroundColor=0f172a",
  },
];

const INITIAL_ORDERS = [
  {
    id: "ORD-9901",
    customer: "TechNexus Corp",
    date: "2026-02-24",
    amount: 15400,
    status: "Delivered",
  },
  {
    id: "ORD-9902",
    customer: "Global Edge Inc",
    date: "2026-02-24",
    amount: 2400,
    status: "Processing",
  },
  {
    id: "ORD-9903",
    customer: "Nilesh Systems",
    date: "2026-02-23",
    amount: 42000,
    status: "Shipped",
  },
];

const INITIAL_USERS = [
  {
    id: "USR-001",
    name: "Nilesh S.",
    email: "nilesh@astracart.io",
    role: "Super Admin",
    lastActive: "Just now",
  },
  {
    id: "USR-002",
    name: "Sarah Connor",
    email: "sarah@skynet.com",
    role: "Editor",
    lastActive: "2h ago",
  },
  {
    id: "USR-003",
    name: "astracartdev",
    email: "dev@astracart.io",
    role: "Editor",
    lastActive: "2h ago",
  },
];

const INITIAL_PLUGINS = [
  {
    id: "PLG-01",
    name: "AstraShield SEO",
    version: "1.0.4",
    author: "AstraCart Dev",
    status: true,
    description: "Advanced SEO optimization for enterprise nodes.",
  },
  {
    id: "PLG-02",
    name: "Lumina Analytics",
    version: "2.1.0",
    author: "Lumina Labs",
    status: true,
    description: "Real-time behavior tracking and telemetry.",
  },
  {
    id: "PLG-03",
    name: "Global Tax Relay",
    version: "0.9.8",
    author: "Fiscal Systems",
    status: false,
    description: "Automated tax calculation across 200+ jurisdictions.",
  },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeSettingsTab, setActiveSettingsTab] = useState("plugins");
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders] = useState(INITIAL_ORDERS);
  const [users] = useState(INITIAL_USERS);
  const [plugins, setPlugins] = useState(INITIAL_PLUGINS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPluginModalOpen, setIsPluginModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const preventDefault = (e: DragEvent) => e.preventDefault();
    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);
    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  if (!mounted) return null;

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newPrd = {
      id: editingProduct?.id || `PRD-X${Math.floor(Math.random() * 1000)}`,
      name: sanitizeInput(formData.get("name") as string),
      category: sanitizeInput(formData.get("category") as string),
      stock: Math.max(0, parseInt(formData.get("stock") as string) || 0),
      price: Math.max(0, parseInt(formData.get("price") as string) || 0),
      img:
        editingProduct?.img ||
        `https://api.dicebear.com/7.x/shapes/svg?seed=${Math.random()}&backgroundColor=0f172a`,
    };
    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? newPrd : p)),
      );
    } else {
      setProducts([...products, newPrd]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-astracart-dark text-slate-300 font-sans selection:bg-astracart-crimson/30 overflow-hidden">
      {/* Sidebar navigation */}
      <aside className="w-72 border-r border-white/5 bg-astracart-navy/40 backdrop-blur-3xl flex flex-col z-20">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-astracart-crimson flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <span className="text-white font-black text-2xl italic tracking-tighter">
              AC
            </span>
          </div>
          <div>
            <h2 className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">
              AstraCart
            </h2>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              Management_Console
            </p>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2 mt-4">
          {[
            {
              id: "dashboard",
              label: "Dashboard",
              icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
            },
            {
              id: "products",
              label: "Products",
              icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
            },
            {
              id: "orders",
              label: "Orders",
              icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
            },
            {
              id: "users",
              label: "Users",
              icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
            },
            {
              id: "settings",
              label: "Settings",
              icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 transition-all duration-300 border-l-2 ${
                activeTab === item.id
                  ? "bg-astracart-crimson/10 text-white border-astracart-crimson shadow-[inset_0_0_15px_rgba(220,38,38,0.05)]"
                  : "text-slate-500 hover:text-white border-transparent hover:bg-white/5"
              }`}
            >
              <svg
                className={`w-5 h-5 ${activeTab === item.id ? "text-astracart-crimson" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={item.icon}
                ></path>
              </svg>
              <span className="text-xs font-bold uppercase tracking-widest">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-white/5 rounded-xl p-6 border border-white/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded bg-astracart-crimson flex items-center justify-center text-white font-black italic">
                N
              </div>
              <div>
                <p className="text-xs font-black text-white italic uppercase tracking-tighter">
                  Nilesh_Admin
                </p>
                <p className="text-[9px] text-slate-500 font-mono">
                  NODE_7_MASTER
                </p>
              </div>
            </div>
            <Link
              href="/"
              className="w-full py-3 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all text-center block"
            >
              Terminate_Session
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Header */}
        <header className="h-24 min-h-[96px] flex items-center justify-between px-12 border-b border-white/5 bg-astracart-dark/40 backdrop-blur-xl">
          <div className="flex flex-col">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter scale-y-110">
              {activeTab}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                Protocol_Stream: STABLE
              </span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                Global_Status
              </span>
              <span className="text-[10px] text-astracart-crimson font-mono font-black italic tracking-tighter uppercase mt-1">
                OPERATIONAL_99.9%
              </span>
            </div>
            <button className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-astracart-crimson/50 transition-all text-slate-400 hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {activeTab === "dashboard" && (
            <div className="space-y-12">
              {/* KPI Row */}
              <div className="grid grid-cols-4 gap-8">
                {[
                  {
                    label: "Total Revenue",
                    val: 124890,
                    prefix: "$",
                    trend: "+12.4%",
                    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                  },
                  {
                    label: "Active Nodes",
                    val: 842,
                    prefix: "",
                    trend: "+2.1%",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  },
                  {
                    label: "User Access",
                    val: 12402,
                    prefix: "",
                    trend: "+5.6%",
                    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                  },
                  {
                    label: "Alert Level",
                    val: 0.2,
                    prefix: "",
                    suffix: "%",
                    trend: "-0.4%",
                    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                  },
                ].map((kpi, i) => (
                  <div
                    key={i}
                    className="bg-astracart-navy/40 backdrop-blur-xl border border-white/5 p-8 rounded-xl relative group overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 bg-white/5 border border-white/5 rounded flex items-center justify-center text-astracart-crimson group-hover:bg-astracart-crimson group-hover:text-white transition-all">
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
                            d={kpi.icon}
                          ></path>
                        </svg>
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase p-1 rounded ${kpi.trend.startsWith("+") ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"}`}
                      >
                        {kpi.trend}
                      </span>
                    </div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                      {kpi.label}
                    </p>
                    <h3 className="text-3xl font-black text-white italic tracking-tighter">
                      <CountUp
                        end={kpi.val}
                        prefix={kpi.prefix}
                        suffix={kpi.suffix || ""}
                      />
                    </h3>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-astracart-crimson/0 group-hover:bg-astracart-crimson transition-all"></div>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 bg-astracart-navy/40 backdrop-blur-xl border border-white/5 p-10 rounded-xl h-[450px] relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                        Throughput_Performance
                      </h3>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                        Real-time revenue streaming
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-x-10 bottom-10 top-32">
                    <svg
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                      viewBox="0 0 1000 300"
                    >
                      <path
                        d="M0,280 Q250,220 500,100 T1000,50 V300 H0 Z"
                        fill="url(#chartGrad)"
                        opacity="0.1"
                      />
                      <path
                        d="M0,280 Q250,220 500,100 T1000,50"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="3"
                        className="drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                      />
                      <defs>
                        <linearGradient
                          id="chartGrad"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="bg-astracart-navy/40 backdrop-blur-xl border border-white/5 p-10 rounded-xl space-y-8">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                    Alert_Protocols
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Quantum Chipset",
                        msg: "Inventory depletion reached 0%",
                        type: "critical",
                      },
                      {
                        title: "Global Mesh Hub",
                        msg: "Latency spike detected in HK Node",
                        type: "warning",
                      },
                      {
                        title: "Security Module",
                        msg: "Patch 4.28 deployment started",
                        type: "info",
                      },
                    ].map((al, i) => (
                      <div
                        key={i}
                        className={`p-5 border-l-2 bg-white/[0.02] flex items-center gap-4 ${al.type === "critical" ? "border-astracart-crimson" : "border-slate-500"}`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${al.type === "critical" ? "bg-astracart-crimson animate-pulse" : "bg-slate-500"}`}
                        ></div>
                        <div>
                          <p className="text-[11px] font-black text-white uppercase tracking-tighter">
                            {al.title}
                          </p>
                          <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                            {al.msg}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 border border-white/5 text-[9px] font-black uppercase text-slate-500 hover:text-white transition-all uppercase tracking-widest">
                    Execute_Diagnostics
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-white/5 p-6 rounded-xl border border-white/5">
                <div className="w-96 flex items-center gap-4 px-6 py-3 bg-black/40 border border-white/5 rounded-lg">
                  <svg
                    className="w-4 h-4 text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <input
                    type="text"
                    placeholder="SCAN_ASSET_REPOSITORY..."
                    className="bg-transparent border-none outline-none text-xs font-mono uppercase text-white w-full"
                  />
                </div>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsModalOpen(true);
                  }}
                  className="px-8 py-4 bg-astracart-crimson text-white font-black uppercase italic text-xs tracking-[0.2em] shadow-lg shadow-astracart-crimson/20"
                >
                  Deploy_New_Asset
                </button>
              </div>

              <div className="bg-astracart-navy/40 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
                      <th className="px-10 py-8">Asset_Class</th>
                      <th className="px-10 py-8">Model_ID</th>
                      <th className="px-10 py-8">Reference</th>
                      <th className="px-10 py-8">Stock_Level</th>
                      <th className="px-10 py-8 text-right">Value</th>
                      <th className="px-10 py-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-white/[0.02] transition-all group font-mono"
                      >
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded border border-white/5 bg-black/40 overflow-hidden">
                              <img
                                src={p.img}
                                alt={p.name}
                                className="w-full h-full object-cover p-2 opacity-60 group-hover:opacity-100 transition-all"
                              />
                            </div>
                            <span className="text-xs font-black text-white italic uppercase tracking-tighter">
                              {p.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-[10px] text-slate-500 italic uppercase font-bold">
                          {p.category}
                        </td>
                        <td className="px-10 py-6 text-xs text-astracart-crimson font-black opacity-60 italic">
                          {p.id}
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${p.stock > 0 ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-astracart-crimson animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.6)]"}`}
                            ></div>
                            <span className="text-xs font-bold text-white uppercase">
                              {p.stock} UN
                            </span>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right text-xs font-bold text-slate-400">
                          § {p.price.toLocaleString()}
                        </td>
                        <td className="px-10 py-6 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsModalOpen(true);
                              }}
                              className="text-[10px] font-black text-white hover:text-astracart-crimson uppercase tracking-widest"
                            >
                              [EDIT]
                            </button>
                            <button className="text-[10px] font-black text-white hover:text-red-900 uppercase tracking-widest">
                              [ERASE]
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-8">
              <div className="bg-astracart-navy/40 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
                      <th className="px-10 py-8">Order_Identifier</th>
                      <th className="px-10 py-8">Target_Identity</th>
                      <th className="px-10 py-8">Timestamp</th>
                      <th className="px-10 py-8">Gross_Value</th>
                      <th className="px-10 py-8">Protocol_State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {orders.map((o) => (
                      <tr
                        key={o.id}
                        className="hover:bg-white/[0.02] transition-all group font-mono"
                      >
                        <td className="px-10 py-8 text-xs font-black text-astracart-crimson italic">
                          {o.id}
                        </td>
                        <td className="px-10 py-8 text-xs font-black text-white uppercase tracking-tighter italic">
                          {o.customer}
                        </td>
                        <td className="px-10 py-8 text-[10px] text-slate-500 font-bold uppercase">
                          {o.date}
                        </td>
                        <td className="px-10 py-8 text-xs font-bold text-slate-400">
                          § {o.amount.toLocaleString()}
                        </td>
                        <td className="px-10 py-8">
                          <span
                            className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest italic rounded border ${o.status === "Delivered" ? "border-green-500/20 text-green-500 bg-green-500/5" : "border-astracart-crimson/20 text-astracart-crimson bg-astracart-crimson/5"}`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-8">
              <div className="bg-astracart-navy/40 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
                      <th className="px-10 py-8">Node_Admin</th>
                      <th className="px-10 py-8">Access_Rights</th>
                      <th className="px-10 py-8">Last_Telemetry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((u) => (
                      <tr
                        key={u.id}
                        className="hover:bg-white/[0.02] transition-all group font-mono"
                      >
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded border border-white/5 bg-astracart-dark p-2 flex items-center justify-center font-black italic text-astracart-crimson group-hover:bg-astracart-crimson group-hover:text-white transition-all">
                              {u.name[0]}
                            </div>
                            <div>
                              <p className="text-xs font-black text-white italic  tracking-tighter">
                                {u.name}
                              </p>
                              <p className="text-[9px] text-slate-500 font-mono mt-0.5  tracking-widest">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-xs font-black text-slate-400 italic uppercase italic tracking-widest">
                          {u.role}
                        </td>
                        <td className="px-10 py-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {u.lastActive}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-12">
              <div className="flex items-center gap-10 border-b border-white/5 pb-0">
                {[
                  { id: "general", label: "General" },
                  { id: "plugins", label: "Plugin Manager" },
                  { id: "security", label: "Security_Protocols" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveSettingsTab(st.id)}
                    className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                      activeSettingsTab === st.id
                        ? "text-astracart-crimson"
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {st.label}
                    {activeSettingsTab === st.id && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-astracart-crimson shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>
                    )}
                  </button>
                ))}
              </div>

              {activeSettingsTab === "plugins" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center bg-white/5 p-8 rounded-xl border border-white/5">
                    <div>
                      <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                        Module_Expansion_Control
                      </h3>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                        Active node extensions:{" "}
                        {plugins.filter((p) => p.status).length} /{" "}
                        {plugins.length}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setIsPluginModalOpen(true);
                      }}
                      className="px-8 py-4 bg-astracart-crimson text-white font-black uppercase italic text-xs tracking-[0.2em] shadow-lg shadow-astracart-crimson/20 hover:scale-105 transition-all"
                    >
                      Initialize_New_Plugin
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {plugins.map((plg) => (
                      <div
                        key={plg.id}
                        className="bg-astracart-navy/40 backdrop-blur-xl border border-white/5 p-8 rounded-xl flex items-center justify-between group hover:border-astracart-crimson/30 transition-all"
                      >
                        <div className="flex items-center gap-8">
                          <div
                            className={`w-14 h-14 rounded bg-white/5 border border-white/5 flex items-center justify-center text-astracart-crimson group-hover:bg-astracart-crimson group-hover:text-white transition-all`}
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 4a2 2 0 114 0v1a2 2 0 002 2h1a2 2 0 110 4h-1a2 2 0 00-2 2v1a2 2 0 11-4 0V11a2 2 0 00-2-2H7a2 2 0 110-4h1a2 2 0 002-2V4z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <div className="flex items-center gap-4 mb-2">
                              <h4 className="text-lg font-black text-white italic uppercase tracking-tighter">
                                {plg.name}
                              </h4>
                              <span className="text-[9px] font-mono text-slate-600 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                v{plg.version}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-light mb-1">
                              Author:{" "}
                              <span className="text-slate-400 font-bold">
                                {plg.author}
                              </span>
                            </p>
                            <p className="text-[10px] text-slate-600 font-mono tracking-tight uppercase">
                              {plg.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-10">
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">
                              Protocol_Status
                            </span>
                            <button
                              onClick={() => {
                                setPlugins(
                                  plugins.map((p) =>
                                    p.id === plg.id
                                      ? { ...p, status: !p.status }
                                      : p,
                                  ),
                                );
                              }}
                              className={`w-12 h-6 rounded-full p-1 transition-all relative ${
                                plg.status
                                  ? "bg-astracart-crimson/40"
                                  : "bg-white/5"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full shadow-lg transition-all ${
                                  plg.status
                                    ? "bg-astracart-crimson translate-x-6"
                                    : "bg-slate-700 translate-x-0"
                                }`}
                              ></div>
                            </button>
                          </div>
                          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                            <button className="text-[9px] font-black text-white hover:text-astracart-crimson uppercase tracking-widest">
                              [RECONFIGURE]
                            </button>
                            <button className="text-[9px] font-black text-red-900 hover:text-red-600 uppercase tracking-widest">
                              [PURGE]
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSettingsTab === "general" && (
                <div className="p-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <p className="text-xs font-mono text-slate-600 uppercase tracking-[0.5em]">
                    SYSTEM_CORE_PARAMETERS_LOCKED
                  </p>
                </div>
              )}

              {activeSettingsTab === "security" && (
                <div className="p-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                  <p className="text-xs font-mono text-slate-600 uppercase tracking-[0.5em]">
                    ENCRYPTION_LAYER_ACTIVE
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Extreme Cinematic Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-60"></div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
          <div className="w-full max-w-2xl bg-astracart-navy border-t-2 border-astracart-crimson p-1 shadow-2xl relative">
            <div className="p-12 space-y-12">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter scale-y-110">
                    {editingProduct
                      ? "Modify_Asset_Protocol"
                      : "Deploy_Core_Asset"}
                  </h2>
                  <p className="text-[10px] font-bold text-astracart-crimson uppercase tracking-[0.4em] mt-2">
                    Secure Cloud Infrastructure Provider
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-700 hover:text-white transition-all font-mono font-bold"
                >
                  [TERMINATE_MODAL]
                </button>
              </div>

              <form onSubmit={saveProduct} className="grid grid-cols-2 gap-10">
                <div className="col-span-2 flex items-center gap-6 p-6 border border-white/5 bg-black/20 rounded-xl">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded flex items-center justify-center text-slate-700 hover:text-astracart-crimson transition-all cursor-pointer group">
                    <svg
                      className="w-10 h-10 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 012 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest italic mb-1">
                      Asset_Module_Visual
                    </p>
                    <p className="text-[9px] text-slate-500 font-mono uppercase">
                      Upload encrypted JPG/PNG/WebP
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                    Asset_Title
                  </label>
                  <input
                    name="name"
                    defaultValue={editingProduct?.name}
                    required
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-lg text-white font-bold text-[11px] uppercase italic focus:outline-none focus:border-astracart-crimson/50"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                    Asset_Class
                  </label>
                  <select
                    name="category"
                    defaultValue={editingProduct?.category}
                    className="w-full bg-black/40 border border-white/10 p-5 rounded-lg text-white font-bold text-[11px] uppercase italic focus:outline-none focus:border-astracart-crimson/50"
                  >
                    <option value="Hardware">HARDWARE</option>
                    <option value="Networking">NETWORKING</option>
                    <option value="Software">SOFTWARE</option>
                    <option value="Computing">COMPUTING</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                    Node_Availability
                  </label>
                  <input
                    name="stock"
                    type="number"
                    defaultValue={editingProduct?.stock}
                    required
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-astracart-crimson/50"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                    Unit_Credit_Valuation
                  </label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={editingProduct?.price}
                    required
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-astracart-crimson/50"
                  />
                </div>

                <div className="col-span-2 pt-6 flex gap-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-5 border border-white/5 font-black uppercase tracking-widest text-[10px] text-slate-500 hover:text-white transition-all"
                  >
                    Abort_Changes
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-5 bg-astracart-crimson text-white font-black uppercase tracking-[0.2em] text-[10px] italic shadow-lg shadow-astracart-crimson/20"
                  >
                    Commit_To_Repository
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Plugin Upload Modal */}
      {isPluginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-xl bg-astracart-navy border border-white/10 p-1 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-astracart-crimson animate-pulse"></div>
            <div className="p-10 space-y-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                    Inject_Extension_Module
                  </h2>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">
                    AstraCart Core Plugin Gateway
                  </p>
                </div>
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setIsPluginModalOpen(false);
                  }}
                  className="text-slate-700 hover:text-white transition-all font-mono font-bold"
                >
                  [DISCONNECT]
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.target as HTMLFormElement);
                  const newPlg = {
                    id: `PLG-${Math.floor(Math.random() * 100)}`,
                    name: sanitizeInput(fd.get("p_name") as string),
                    version: sanitizeInput(fd.get("p_version") as string),
                    author: sanitizeInput(fd.get("p_author") as string),
                    description: sanitizeInput(fd.get("p_desc") as string),
                    status: true,
                  };
                  setPlugins([newPlg, ...plugins]);
                  setUploadedFile(null);
                  setIsPluginModalOpen(false);
                }}
                className="space-y-8"
              >
                {/* Drag and Drop Area */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files[0];
                    if (file) setUploadedFile(file);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-10 text-center group transition-all cursor-pointer bg-white/[0.02] ${
                    isDragging
                      ? "border-astracart-crimson bg-astracart-crimson/5 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
                      : "border-white/10 hover:border-astracart-crimson/50"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setUploadedFile(file);
                    }}
                    className="hidden"
                    accept=".zip,.js"
                  />
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all ${
                      isDragging
                        ? "bg-astracart-crimson text-white scale-110"
                        : "bg-white/5 text-slate-600 group-hover:bg-astracart-crimson/10 group-hover:text-astracart-crimson"
                    }`}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-xs font-black text-white uppercase tracking-widest mb-2">
                    {uploadedFile
                      ? "Bundle_Ready_For_Injection"
                      : "Drag_Drop_Plugin_Bundle"}
                  </p>
                  <p className="text-[9px] text-slate-600 font-mono italic">
                    {uploadedFile
                      ? `SELECTED: ${uploadedFile.name.toUpperCase()} (${(uploadedFile.size / 1024).toFixed(1)} KB)`
                      : "OR CLICK TO SELECT FROM ENCRYPTED STORAGE (.ZIP / .JS)"}
                  </p>
                  {uploadedFile && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">
                        Protocol_Verified_Stable
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                      Extension_Name
                    </label>
                    <input
                      name="p_name"
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-bold text-[10px] uppercase focus:outline-none focus:border-astracart-crimson/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                      Version_ID
                    </label>
                    <input
                      name="p_version"
                      defaultValue="1.0.0"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-mono text-[10px] focus:outline-none focus:border-astracart-crimson/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                      Module_Author
                    </label>
                    <input
                      name="p_author"
                      required
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-bold text-[10px] uppercase focus:outline-none focus:border-astracart-crimson/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block ml-1">
                      Protocol_Description
                    </label>
                    <input
                      name="p_desc"
                      className="w-full bg-white/5 border border-white/10 p-4 rounded-lg text-white font-bold text-[10px] uppercase focus:outline-none focus:border-astracart-crimson/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-astracart-crimson text-white font-black uppercase tracking-[0.3em] italic text-xs shadow-lg shadow-astracart-crimson/20 hover:scale-[1.02] transition-all"
                >
                  Install_and_Activate_Module
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
