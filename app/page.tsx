import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#0f172a] to-[#111827] text-white font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-[#0f172a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tight text-white">
            AstraCart
          </div>
          <nav className="flex items-center gap-8 text-sm font-medium text-gray-300">
            <Link href="#" className="hover:text-white transition-colors">
              Platform
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Docs
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col flex-1 w-full pt-20">
        {/* Hero Section */}
        <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center rounded-full border border-gray-800 bg-gray-900/50 px-3 py-1 text-xs text-gray-400 backdrop-blur-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Now in Early Access
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl leading-tight">
              Commerce Infrastructure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                for Modern Brands
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl leading-relaxed">
              Scale your e-commerce operations with automation, analytics, and
              custom pricing control. Built for the next generation of digital
              retail.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="rounded-md bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105 min-w-[160px]">
                Explore Platform
              </button>

              <button className="rounded-md border border-gray-700 bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white hover:scale-105 min-w-[160px]">
                Enterprise Demo
              </button>
            </div>

            <div className="mt-16 text-sm text-gray-600">
              Trusted by innovative teams worldwide
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full bg-black/20 border-t border-white/5 py-24">
          <div className="mx-auto max-w-[1200px] space-y-12 px-6">
            <h2 className="text-3xl font-bold text-center tracking-tight">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="group rounded-xl border border-white/10 bg-[#1e293b]/50 p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 border border-green-500/20">
                    In Stock
                  </span>
                  <span className="text-lg font-bold">$299</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  Quantum Wireless Headset
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Immersive sound with active noise cancellation and 40-hour
                  battery life.
                </p>
                <div className="h-40 w-full rounded-md bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  <span className="text-gray-600 text-xs">Product Image</span>
                </div>
                <button className="w-full rounded-md border border-white/10 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black">
                  View Details
                </button>
              </div>

              {/* Product 2 */}
              <div className="group rounded-xl border border-white/10 bg-[#1e293b]/50 p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block rounded-md bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-500 border border-orange-500/20">
                    Limited
                  </span>
                  <span className="text-lg font-bold">$399</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  Nova Smartwatch Pro
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Advanced health tracking, seamless connectivity, and titanium
                  build.
                </p>
                <div className="h-40 w-full rounded-md bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  <span className="text-gray-600 text-xs">Product Image</span>
                </div>
                <button className="w-full rounded-md border border-white/10 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black">
                  View Details
                </button>
              </div>

              {/* Product 3 */}
              <div className="group rounded-xl border border-white/10 bg-[#1e293b]/50 p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-white/20 hover:shadow-xl hover:shadow-black/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 border border-green-500/20">
                    In Stock
                  </span>
                  <span className="text-lg font-bold">$149</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  Orion Mechanical Keyboard
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Precision tactile switches, RGB customization, and aerospace
                  aluminum.
                </p>
                <div className="h-40 w-full rounded-md bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  <span className="text-gray-600 text-xs">Product Image</span>
                </div>
                <button className="w-full rounded-md border border-white/10 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="w-full py-8 text-center text-xs text-gray-700">
        © 2026 AstraCart Inc. All rights reserved.
      </footer>
    </div>
  );
}
