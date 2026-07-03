import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Chrome,
  Sparkles,
  Zap,
  LayoutGrid,
  BellRing,
  CheckCircle2,
  Mail,
  CreditCard,
  User,
  ShieldCheck,
  Settings,
  LogOut,
  Search,
  Clock3,
} from "lucide-react";

const NAV_LINKS = ["Features", "How it works", "Pricing", "FAQ"];

function Logo({ dark }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-8 w-8 rounded-2xl flex items-center justify-center ${
          dark ? "bg-white" : "bg-stone-900"
        }`}
      >
        <Sparkles className={`h-4 w-4 ${dark ? "text-stone-900" : "text-white"}`} strokeWidth={2.25} />
      </div>
      <span className={`font-semibold tracking-tight text-[15px] ${dark ? "text-white" : "text-stone-900"}`}>
        Kaizen
      </span>
    </div>
  );
}

function PreviewSwitcher({ page, setPage }) {
  const pages = [
    { id: "home", label: "Landing" },
    { id: "signin", label: "Sign in" },
    { id: "billing", label: "Billing" },
    { id: "profile", label: "Profile" },
  ];
  return (
    <div className="sticky top-0 z-50 flex justify-center pt-4 pb-2 bg-stone-50/80 backdrop-blur">
      <div className="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white p-1 shadow-sm">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              page === p.id
                ? "bg-stone-900 text-white"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Nav({ setPage }) {
  return (
    <header className="max-w-6xl mx-auto px-6 pt-6">
      <div className="flex items-center justify-between rounded-full border border-stone-200 bg-white/80 backdrop-blur px-4 py-2.5 shadow-sm">
        <Logo />
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[13.5px] text-stone-500 hover:text-stone-900 transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage("signin")}
            className="hidden sm:inline-flex text-[13.5px] font-medium text-stone-600 hover:text-stone-900 px-3 py-2 transition-colors"
          >
            Sign in
          </button>
          <button className="inline-flex items-center gap-1.5 text-[13.5px] font-medium bg-stone-900 text-white rounded-full pl-4 pr-3.5 py-2 hover:bg-stone-800 transition-colors">
            <Chrome className="h-3.5 w-3.5" />
            Add to Chrome
          </button>
        </div>
      </div>
    </header>
  );
}

function KaizenBoardMockup() {
  const columns = [
    {
      name: "New",
      accent: "bg-stone-300",
      cards: [{ t: "Campus Drive — Atlassian", tag: "Today" }],
    },
    {
      name: "OA",
      accent: "bg-amber-400",
      cards: [{ t: "HackerRank · Round 1", tag: "2d left" }],
    },
    {
      name: "Interview",
      accent: "bg-emerald-500",
      cards: [
        { t: "Systems Design — L2", tag: "Tomorrow, 4:00 PM" },
        { t: "HR Round — Zeta Labs", tag: "Fri" },
      ],
    },
    {
      name: "Offer",
      accent: "bg-stone-900",
      cards: [{ t: "Backend Intern — Nimbus", tag: "Respond by Mon" }],
    },
  ];

  return (
    <div className="relative rounded-[28px] border border-stone-200 shadow-2xl overflow-hidden">
      {/* wallpaper */}
      <div
        className="relative h-[420px] w-full"
        style={{
          background:
            "linear-gradient(180deg, #cfe0d8 0%, #9fb8ac 28%, #5c7a6c 55%, #2f4438 78%, #1c2a22 100%)",
        }}
      >
        {/* ambient mountain silhouettes */}
        <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-90" viewBox="0 0 800 260" preserveAspectRatio="none">
          <polygon points="0,260 0,140 120,60 240,150 360,40 480,160 600,90 720,170 800,120 800,260" fill="#24352a" opacity="0.55" />
          <polygon points="0,260 0,190 150,120 300,200 460,110 620,205 800,160 800,260" fill="#16221b" opacity="0.75" />
        </svg>

        {/* top chrome bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-5 text-white">
          <div className="flex items-baseline gap-1">
            <Clock3 className="h-4 w-4 mb-1 opacity-80" />
            <span className="text-2xl font-semibold tracking-tight">11:05</span>
            <span className="text-xs font-medium opacity-80">PM</span>
          </div>
          <Settings className="h-4 w-4 opacity-80" />
        </div>

        {/* search pill */}
        <div className="relative z-10 flex justify-center mt-2">
          <div className="flex items-center gap-2 bg-black/45 backdrop-blur-md text-white/80 text-[13px] rounded-full px-4 py-2 w-72">
            <Search className="h-3.5 w-3.5" />
            Search the web
          </div>
        </div>

        {/* kanban overlay */}
        <div className="relative z-10 mx-4 mt-6 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[13px] font-semibold text-stone-800">Placement Board</span>
            <span className="text-[11px] text-stone-400">Synced 4s ago</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {columns.map((col) => (
              <div key={col.name}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${col.accent}`} />
                  <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wide">
                    {col.name}
                  </span>
                </div>
                <div className="space-y-2">
                  {col.cards.map((c) => (
                    <div key={c.t} className="rounded-lg border border-stone-200 bg-white p-2.5 shadow-sm">
                      <div className="text-[11.5px] font-medium text-stone-800 leading-snug">{c.t}</div>
                      <div className="text-[10.5px] text-stone-400 mt-1">{c.tag}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 left-5 text-[10.5px] text-white/60 z-10">
        Your inbox, sorted before you open it
      </div>
    </div>
  );
}

function Home({ setPage }) {
  const features = [
    {
      icon: Zap,
      title: "Rule Engine",
      desc: "Predictable, instant sorting for the senders and subjects you already recognize — no AI guesswork needed.",
    },
    {
      icon: Sparkles,
      title: "AI classification",
      desc: "Everything else gets a summary, a priority, and a deadline pulled straight from the email body.",
    },
    {
      icon: LayoutGrid,
      title: "Lives in your new tab",
      desc: "No app to check. Your board is the first thing you see, every time you open a tab.",
    },
    {
      icon: BellRing,
      title: "Never miss a date",
      desc: "High-priority cards surface as notifications the moment they land — interviews, OAs, offer windows.",
    },
  ];

  const steps = [
    { n: "01", t: "Connect Gmail", d: "One OAuth grant. Kaizen never sees your password, and read access starts read-only." },
    { n: "02", t: "It sorts itself", d: "Rules catch the obvious ones instantly. AI fills in the rest with a summary and a deadline." },
    { n: "03", t: "Act from the board", d: "Drag cards as you apply, interview, and hear back. Open the original email in one click." },
  ];

  return (
    <>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11.5px] font-medium uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1 mb-7">
          <Sparkles className="h-3 w-3" />
          Gmail workflow, reimagined
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-900 leading-[1.05]">
          Turn your inbox into
          <br />
          an opportunity board
        </h1>
        <p className="mt-6 text-[17px] text-stone-500 max-w-xl mx-auto leading-relaxed">
          Kaizen watches your placement emails, sorts them into a Kanban board, and puts it
          right in your browser's new tab — so nothing gets buried again.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 bg-stone-900 text-white text-sm font-medium rounded-full pl-5 pr-4 py-3 hover:bg-stone-800 transition-colors shadow-sm">
            <Chrome className="h-4 w-4" />
            Add to Chrome — it's free
          </button>
          <button className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-full px-4 py-3 border border-stone-200 hover:border-stone-300 transition-colors">
            See how it works
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-5 text-xs text-stone-400">
          Built for placement season · Free to start · No credit card
        </p>
      </section>

      {/* MOCKUP */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <KaizenBoardMockup />
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="max-w-lg mb-10">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">Features</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
            Everything sorts itself out
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-stone-100 border border-stone-200 p-6">
              <div className="h-9 w-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center mb-4 shadow-sm">
                <f.icon className="h-4 w-4 text-stone-700" strokeWidth={2} />
              </div>
              <h3 className="text-[15px] font-semibold text-stone-900">{f.title}</h3>
              <p className="mt-1.5 text-[13.5px] text-stone-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="max-w-lg mb-10">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">Process</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
            Three steps, once
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-stone-200 pt-5">
              <span className="text-xs font-mono text-emerald-700">{s.n}</span>
              <h3 className="mt-2 text-[15px] font-semibold text-stone-900">{s.t}</h3>
              <p className="mt-1.5 text-[13.5px] text-stone-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="max-w-lg mb-10 mx-auto text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">Pricing</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">
            Start free. Upgrade if you need to.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-stone-200 bg-white p-7">
            <span className="text-sm font-medium text-stone-500">Free</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-stone-900">$0</span>
              <span className="text-sm text-stone-400">/ semester</span>
            </div>
            <ul className="mt-6 space-y-2.5">
              {["Unlimited rule-based sorting", "1 workspace", "New tab board"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-stone-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {i}
                </li>
              ))}
            </ul>
            <button className="mt-7 w-full rounded-full border border-stone-300 text-stone-800 text-sm font-medium py-2.5 hover:bg-stone-50 transition-colors">
              Get started
            </button>
          </div>
          <div className="rounded-3xl bg-stone-900 p-7 text-white relative overflow-hidden">
            <span className="text-sm font-medium text-stone-400">Pro</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">$3</span>
              <span className="text-sm text-stone-400">/ month</span>
            </div>
            <ul className="mt-6 space-y-2.5">
              {["Everything in Free", "AI classification + deadlines", "Priority notifications", "Custom rules"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-stone-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {i}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setPage("billing")}
              className="mt-7 w-full rounded-full bg-white text-stone-900 text-sm font-medium py-2.5 hover:bg-stone-100 transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-stone-900 px-10 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Stop hunting through your inbox.
          </h2>
          <p className="mt-3 text-stone-400 text-[15px]">
            Install Kaizen and let your next tab do the sorting.
          </p>
          <button className="mt-7 inline-flex items-center gap-2 bg-white text-stone-900 text-sm font-medium rounded-full pl-5 pr-4 py-3 hover:bg-stone-100 transition-colors">
            <Chrome className="h-4 w-4" />
            Add to Chrome — it's free
          </button>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-14 flex items-center justify-between text-xs text-stone-400">
        <Logo />
        <span>© 2026 Kaizen. Built for placement season.</span>
      </footer>
    </>
  );
}

function AuthCard({ title, subtitle, children }) {
  return (
    <section className="min-h-[75vh] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto h-11 w-11 rounded-2xl bg-stone-900 flex items-center justify-center mb-5">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">{title}</h1>
          {subtitle && <p className="mt-2 text-[13.5px] text-stone-500">{subtitle}</p>}
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">{children}</div>
      </div>
    </section>
  );
}

function SignIn() {
  return (
    <AuthCard title="Sign in to Kaizen" subtitle="Connect Gmail to start sorting your inbox.">
      <button className="w-full flex items-center justify-center gap-3 rounded-full border border-stone-300 py-3 text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors">
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.89c2.28-2.1 3.56-5.2 3.56-8.82Z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.89-3.02c-1.08.73-2.46 1.16-4.04 1.16-3.1 0-5.73-2.1-6.67-4.92H1.3v3.1A12 12 0 0 0 12 24Z" />
          <path fill="#FBBC05" d="M5.33 14.32a7.2 7.2 0 0 1 0-4.63v-3.1H1.3a12 12 0 0 0 0 10.83l4.03-3.1Z" />
          <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.94 1.19 15.23 0 12 0 7.4 0 3.44 2.6 1.3 6.6l4.03 3.1c.94-2.83 3.57-4.93 6.67-4.93Z" />
        </svg>
        Continue with Google
      </button>
      <p className="mt-4 text-[11.5px] text-stone-400 text-center leading-relaxed">
        Kaizen requests read-only Gmail access. We never send email or delete anything
        on your behalf.
      </p>
      <div className="mt-5 pt-5 border-t border-stone-100 flex items-center gap-2 text-[11.5px] text-stone-400">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
        Your refresh token is encrypted and never leaves our servers.
      </div>
    </AuthCard>
  );
}

function SidebarShell({ active, children }) {
  const items = [
    { id: "profile", label: "Profile", icon: User },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];
  return (
    <section className="max-w-4xl mx-auto px-6 py-14">
      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        <aside>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-9 w-9 rounded-full bg-stone-900 flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <div>
              <div className="text-[13px] font-medium text-stone-900">Ananya R.</div>
              <div className="text-[11.5px] text-stone-400">Final year, CSE</div>
            </div>
          </div>
          <nav className="space-y-1">
            {items.map((it) => (
              <div
                key={it.id}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] font-medium ${
                  active === it.id ? "bg-stone-100 text-stone-900" : "text-stone-500"
                }`}
              >
                <it.icon className="h-4 w-4" />
                {it.label}
              </div>
            ))}
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] font-medium text-stone-400 mt-4">
              <LogOut className="h-4 w-4" />
              Sign out
            </div>
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  );
}

function Billing() {
  return (
    <SidebarShell active="billing">
      <h1 className="text-xl font-semibold tracking-tight text-stone-900 mb-1">Billing</h1>
      <p className="text-[13.5px] text-stone-500 mb-7">Manage your plan and payment details.</p>

      <div className="rounded-2xl border border-stone-200 p-5 flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-semibold text-stone-900">Free plan</span>
            <span className="text-[10.5px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
              Active
            </span>
          </div>
          <p className="text-[12.5px] text-stone-500 mt-1">Rule-based sorting · 1 workspace</p>
        </div>
        <button className="text-[13px] font-medium bg-stone-900 text-white rounded-full px-4 py-2 hover:bg-stone-800 transition-colors">
          Upgrade to Pro
        </button>
      </div>

      <div className="rounded-2xl border border-stone-200 p-5 mb-4">
        <span className="text-[13px] font-medium text-stone-900">Payment method</span>
        <div className="mt-3 flex items-center justify-between text-[13px] text-stone-500">
          <span>No card on file</span>
          <button className="text-emerald-700 font-medium">Add card</button>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 p-5">
        <span className="text-[13px] font-medium text-stone-900">Invoices</span>
        <p className="mt-3 text-[13px] text-stone-400">No invoices yet.</p>
      </div>
    </SidebarShell>
  );
}

function Profile() {
  return (
    <SidebarShell active="profile">
      <h1 className="text-xl font-semibold tracking-tight text-stone-900 mb-1">Profile</h1>
      <p className="text-[13.5px] text-stone-500 mb-7">Your account and connected Gmail.</p>

      <div className="rounded-2xl border border-stone-200 p-5 mb-4">
        <span className="text-[13px] font-medium text-stone-900">Account</span>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-stone-500">Name</span>
            <span className="text-stone-900">Ananya R.</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-stone-500">Email</span>
            <span className="text-stone-900">ananya.r@college.edu</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-stone-500">Workspace</span>
            <span className="text-stone-900">Student Placement</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 p-5 mb-4">
        <span className="text-[13px] font-medium text-stone-900">Connected Gmail</span>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mail className="h-4 w-4 text-stone-400" />
            <span className="text-[13px] text-stone-700">ananya.r@gmail.com</span>
            <span className="text-[10.5px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
              Connected
            </span>
          </div>
          <button className="text-[13px] font-medium text-red-500">Disconnect</button>
        </div>
      </div>

      <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
        <span className="text-[13px] font-medium text-red-600">Danger zone</span>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-[12.5px] text-stone-500 max-w-xs">
            Deleting your account removes your board, rules, and stored emails permanently.
          </p>
          <button className="text-[13px] font-medium text-red-600 border border-red-200 rounded-full px-3.5 py-1.5 hover:bg-red-50 transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </SidebarShell>
  );
}

export default function KaizenWebsite() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <PreviewSwitcher page={page} setPage={setPage} />
      {page !== "home" ? (
        <div className="max-w-6xl mx-auto px-6 pt-2">
          <button
            onClick={() => setPage("home")}
            className="text-[12.5px] text-stone-400 hover:text-stone-700 flex items-center gap-1"
          >
            ← Back to site
          </button>
        </div>
      ) : (
        <Nav setPage={setPage} />
      )}
      {page === "home" && <Home setPage={setPage} />}
      {page === "signin" && <SignIn />}
      {page === "billing" && <Billing />}
      {page === "profile" && <Profile />}
    </div>
  );
}
