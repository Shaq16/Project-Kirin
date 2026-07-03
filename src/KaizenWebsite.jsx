import { useState, useEffect } from "react";
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
  Github,
  Twitter,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import NeuralNodeLayout from "./components/HeroInteractiveBackground";

const NAV_LINKS = ["Features", "How it works", "Pricing", "FAQ"];

function Logo({ dark }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`h-8 w-8 rounded-2xl flex items-center justify-center ${dark ? "bg-[#121212]" : "bg-stone-900"
          }`}
      >
        <Sparkles className={`h-4 w-4 ${dark ? "text-stone-100" : "text-white"}`} strokeWidth={2.25} />
      </div>
      <span className={`font-semibold tracking-tight text-[15px] ${dark ? "text-white" : "text-stone-100"}`}>
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
    <div className="sticky top-0 z-50 flex justify-center pt-4 pb-2 bg-stone-950/80 backdrop-blur">
      <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#121212] p-1 shadow-sm">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${page === p.id
              ? "bg-stone-900 text-white"
              : "text-stone-400 hover:text-stone-100"
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
    <header className="sticky top-0 z-40 max-w-6xl mx-auto px-6 pt-6 pb-2">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#121212]/80 backdrop-blur-md px-4 py-2.5 shadow-sm transition-all hover:shadow-md hover:bg-[#121212]/95">
        <button onClick={() => setPage("home")} className="focus:outline-none">
          <Logo />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage("billing")}
            className="px-3 py-1.5 text-[13.5px] font-medium text-stone-400 hover:text-stone-100 transition-colors rounded-full hover:bg-white/5/50 hidden sm:block"
          >
            Billing
          </button>
          <button
            onClick={() => setPage("profile")}
            className="px-3 py-1.5 text-[13.5px] font-medium text-stone-400 hover:text-stone-100 transition-colors rounded-full hover:bg-white/5/50 hidden sm:block"
          >
            Profile
          </button>
          <Button
            variant="ghost"
            size="pillSm"
            onClick={() => setPage("signin")}
            className="hidden sm:inline-flex text-stone-400 ml-1"
          >
            Sign in
          </Button>
          <Button size="pillSm" className="gap-1.5 ml-2">
            <Chrome className="h-3.5 w-3.5" />
            Add to Chrome
          </Button>
        </div>
      </div>
    </header>
  );
}

function KaizenBoardMockup() {
  const [activeBoard, setActiveBoard] = useState(0);

  const boards = [
    {
      id: "job-search",
      label: "Job Search",
      bgGradient: "linear-gradient(180deg, #cfe0d8 0%, #9fb8ac 28%, #5c7a6c 55%, #2f4438 78%, #1c2a22 100%)",
      columns: [
        { name: "New", accent: "bg-stone-300", cards: [{ t: "Campus Drive — Atlassian", tag: "Today" }] },
        { name: "OA", accent: "bg-amber-400", cards: [{ t: "HackerRank · Round 1", tag: "2d left" }] },
        { name: "Interview", accent: "bg-emerald-500", cards: [{ t: "Systems Design — L2", tag: "Tomorrow, 4:00 PM" }, { t: "HR Round — Zeta Labs", tag: "Fri" }] },
        { name: "Offer", accent: "bg-stone-900", cards: [{ t: "Backend Intern — Nimbus", tag: "Respond by Mon" }] },
      ]
    },
    {
      id: "freelance",
      label: "Freelance",
      bgGradient: "linear-gradient(180deg, #d3c4e3 0%, #9b81b8 28%, #6a5285 55%, #3d2d52 78%, #20172b 100%)",
      columns: [
        { name: "Leads", accent: "bg-blue-400", cards: [{ t: "E-commerce Redesign", tag: "Needs reply" }] },
        { name: "Pitching", accent: "bg-purple-400", cards: [{ t: "Mobile App Prototyping", tag: "Sent yesterday" }] },
        { name: "In Progress", accent: "bg-amber-500", cards: [{ t: "Studio Branding", tag: "Due in 3d" }] },
        { name: "Invoiced", accent: "bg-emerald-500", cards: [{ t: "Startup Landing Page", tag: "Paid" }] },
      ]
    },
    {
      id: "tasks",
      label: "Tasks",
      bgGradient: "linear-gradient(180deg, #ebd8c8 0%, #c49d7e 28%, #8a6549 55%, #523928 78%, #291c13 100%)",
      columns: [
        { name: "Inbox", accent: "bg-stone-300", cards: [{ t: "Car maintenance", tag: "Important" }] },
        { name: "Doing", accent: "bg-amber-400", cards: [{ t: "Review pull requests", tag: "WIP" }] },
        { name: "Blocked", accent: "bg-red-400", cards: [{ t: "Visa application", tag: "Waiting on response" }] },
        { name: "Done", accent: "bg-emerald-500", cards: [{ t: "Book flight tickets", tag: "Today" }] },
      ]
    }
  ];

  const current = boards[activeBoard];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBoard((prev) => (prev + 1) % boards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [boards.length]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full rounded-[28px] border border-white/10 shadow-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-emerald-900/20 group animate-in fade-in zoom-in-95 duration-500" key={current.id}>
        {/* wallpaper */}
        <div
          className="relative h-[420px] w-full transition-colors duration-1000"
          style={{
            background: current.bgGradient,
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
              <span className="text-xs font-medium opacity-80">AM</span>
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
          <div className="relative z-10 mx-4 mt-6 rounded-2xl bg-[#121212]/95 backdrop-blur-md backdrop-blur-xl shadow-xl p-4 transition-all duration-500">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-semibold text-stone-200">{current.label} Board</span>
              <span className="text-[11px] text-stone-400">Synced just now</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {current.columns.map((col) => (
                <div key={col.name}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${col.accent}`} />
                    <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wide">
                      {col.name}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {col.cards.map((c) => (
                      <div key={c.t} className="rounded-lg border border-white/40 bg-[#121212]/60 backdrop-blur-md p-2.5 shadow-sm transition-all hover:bg-[#121212]/80 backdrop-blur-md">
                        <div className="text-[11.5px] font-medium text-stone-200 leading-snug">{c.t}</div>
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
    </div>
  );
}

function Home({ setPage }) {
  const features = [
    {
      icon: Zap,
      title: "Rule Engine",
      desc: "Predictable, instant sorting for the senders and subjects you already recognize — no AI guesswork needed."
    },
    {
      icon: Sparkles,
      title: "AI classification",
      desc: "Everything else gets a summary, a priority, and a deadline pulled straight from the email body."
    },
    {
      icon: LayoutGrid,
      title: "Lives in your new tab",
      desc: "No app to check. Your board is the first thing you see, every time you open a tab."
    },
    {
      icon: BellRing,
      title: "Never miss a date",
      desc: "High-priority cards surface as notifications the moment they land — interviews, OAs, offer windows."
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
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-[15vh] text-center">
        <Badge variant="spectral" className="mb-7 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="h-3 w-3 mr-1.5 text-purple-400" />
          Gmail workflow, reimagined
        </Badge>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-100 leading-[1.05] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          Turn your inbox into
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
            your work dashboard
          </span>
        </h1>
        <p className="mt-6 text-[17px] text-stone-400 max-w-xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          Kaizen watches your important emails, sorts them into intuitive Kanban boards, and puts them
          right in your browser's new tab — so nothing gets left behind.
        </p>

        {/* Neural Node inserted between text and email capture */}
        <NeuralNodeLayout />

        {/* Coming Soon waitlist capture form */}
        <div className="mt-8 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both">
          <div className="group relative rounded-full p-[1px] transition-all duration-500 focus-within:bg-gradient-to-r focus-within:from-blue-500 focus-within:via-purple-500 focus-within:to-orange-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.25)] bg-white/10">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center p-1 rounded-full bg-[#121212] w-full h-full"
            >
              <input
                type="email"
                placeholder="Your Email Address"
                required
                className="flex-1 bg-transparent border-none text-stone-100 px-5 py-2 text-[14.5px] placeholder:text-stone-400 focus:outline-none focus:ring-0"
              />
              <Button size="pillSm" className="shadow-none">
                Get Notified
              </Button>
            </form>
          </div>
        </div>

        <p className="mt-5 text-xs text-stone-400 animate-in fade-in duration-700 delay-700 fill-mode-both">
          Coming soon. Built for busy professionals · Free to start
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
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-100">
            Everything sorts itself out
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div key={f.title} className={`rounded-3xl bg-[#0d0d0d] border border-white/5 p-7 transition-all duration-300 hover:bg-[#151515] hover:border-white/10 group animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both`} style={{ animationDelay: `${i * 150}ms` }}>
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                <f.icon className="h-4.5 w-4.5 text-stone-400 transition-colors duration-300 group-hover:text-stone-200" strokeWidth={2} />
              </div>
              <h3 className="text-[15px] font-semibold text-stone-100">{f.title}</h3>
              <p className="mt-2 text-[13.5px] text-stone-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="max-w-lg mb-10">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">Process</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-100">
            Three steps, once
          </h2>
        </div>
        <div className="relative grid md:grid-cols-3 gap-8">
          <div className="absolute top-[13px] left-8 right-8 h-[2px] bg-white/5 hidden md:block z-0" />
          {steps.map((s, i) => (
            <div key={s.n} className={`relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both group`} style={{ animationDelay: `${i * 200}ms` }}>
              <div className="h-7 w-7 rounded-full bg-[#121212] flex items-center justify-center mb-4 transition-all duration-300 cursor-default border border-white/20 text-stone-300 text-[11px] font-mono group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.3)] group-hover:border-purple-500/50 group-hover:text-purple-400">
                {s.n}
              </div>
              <h3 className="text-[15px] font-semibold text-stone-100">{s.t}</h3>
              <p className="mt-2 text-[13.5px] text-stone-400 leading-relaxed pr-4">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="max-w-lg mb-10 mx-auto text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">Pricing</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-100">
            Start free. Upgrade if you need to.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-[#121212] p-7">
            <span className="text-sm font-medium text-stone-400">Free</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-stone-100">$0</span>
              {/* <span className="text-sm text-stone-400"></span> */}
            </div>
            <ul className="mt-6 space-y-2.5">
              {["Unlimited rule-based sorting", "1 workspace", "New tab board"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-stone-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {i}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-7 w-full rounded-full transition-colors font-medium">
              Get started
            </Button>
          </div>
          <div className="rounded-3xl bg-gradient-to-b from-stone-800 to-stone-950 p-7 text-white relative flex flex-col shadow-xl shadow-stone-900/20 border-t border-stone-700/50">
            <div className="absolute top-0 right-6 -translate-y-1/2">
              <Badge variant="spectral">Best Value</Badge>
            </div>
            <span className="text-sm font-medium text-stone-400">Pro</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight">$3</span>
              <span className="text-sm text-stone-400">/ month</span>
            </div>
            <ul className="mt-6 space-y-2.5 mb-7">
              {["Everything in Free", "AI classification + deadlines", "Priority notifications", "Custom rules"].map((i) => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] text-stone-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {i}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => setPage("billing")}
              className="mt-auto w-full rounded-full bg-[#121212] text-stone-100 hover:bg-white/5 transition-colors font-medium"
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto rounded-[32px] bg-stone-950 px-10 py-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Stop hunting through your inbox.
            </h2>
            <p className="mt-4 text-stone-400 text-[16px] max-w-lg mx-auto">
              Install Kaizen and let your next tab do the sorting for you. It takes exactly two clicks to start.
            </p>
            <Button size="pill" className="mt-8 gap-2 bg-[#121212] border border-white/10 text-stone-100 hover:bg-white hover:text-stone-900 transition-all font-medium shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Chrome className="h-4 w-4" />
              Add to Chrome — it's free
            </Button>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
          <Logo />
          <div className="flex flex-wrap justify-center items-center gap-6 text-[13px] text-stone-400 font-medium">
            <a href="#" className="hover:text-stone-100 transition-colors">Privacy</a>
            <a href="#" className="hover:text-stone-100 transition-colors">Terms</a>
            <a href="#" className="hover:text-stone-100 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <a href="#" className="hover:text-stone-100 transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="hover:text-stone-100 transition-colors"><Github className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="text-center md:text-left mt-8 text-xs text-stone-400">
          © 2026 Kaizen. Built for everyone.
        </div>
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
          <h1 className="text-2xl font-semibold tracking-tight text-stone-100">{title}</h1>
          {subtitle && <p className="mt-2 text-[13.5px] text-stone-400">{subtitle}</p>}
        </div>
        <div className="rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-sm">{children}</div>
      </div>
    </section>
  );
}

function SignIn() {
  return (
    <AuthCard title="Sign in to Kaizen" subtitle="Connect Gmail to start sorting your inbox.">
      <button className="w-full flex items-center justify-center gap-3 rounded-full border border-stone-300 py-3 text-sm font-medium text-stone-200 hover:bg-stone-950 transition-colors">
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
      <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-2 text-[11.5px] text-stone-400">
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
              <div className="text-[13px] font-medium text-stone-100">Ananya R.</div>
              <div className="text-[11.5px] text-stone-400">Final year, CSE</div>
            </div>
          </div>
          <nav className="space-y-1">
            {items.map((it) => (
              <div
                key={it.id}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] font-medium ${active === it.id ? "bg-white/5 text-stone-100" : "text-stone-400"
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
      <h1 className="text-xl font-semibold tracking-tight text-stone-100 mb-1">Billing</h1>
      <p className="text-[13.5px] text-stone-400 mb-7">Manage your plan and payment details.</p>

      <div className="rounded-2xl border border-white/10 p-5 flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-semibold text-stone-100">Free plan</span>
            <span className="text-[10.5px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
              Active
            </span>
          </div>
          <p className="text-[12.5px] text-stone-400 mt-1">Rule-based sorting · 1 workspace</p>
        </div>
        <button className="text-[13px] font-medium bg-stone-900 text-white rounded-full px-4 py-2 hover:bg-stone-800 transition-colors">
          Upgrade to Pro
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 p-5 mb-4">
        <span className="text-[13px] font-medium text-stone-100">Payment method</span>
        <div className="mt-3 flex items-center justify-between text-[13px] text-stone-400">
          <span>No card on file</span>
          <button className="text-emerald-700 font-medium">Add card</button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 p-5">
        <span className="text-[13px] font-medium text-stone-100">Invoices</span>
        <p className="mt-3 text-[13px] text-stone-400">No invoices yet.</p>
      </div>
    </SidebarShell>
  );
}

function Profile() {
  return (
    <SidebarShell active="profile">
      <h1 className="text-xl font-semibold tracking-tight text-stone-100 mb-1">Profile</h1>
      <p className="text-[13.5px] text-stone-400 mb-7">Your account and connected Gmail.</p>

      <div className="rounded-2xl border border-white/10 p-5 mb-4">
        <span className="text-[13px] font-medium text-stone-100">Account</span>
        <div className="mt-3 space-y-3">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-stone-400">Name</span>
            <span className="text-stone-100">Ananya R.</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-stone-400">Email</span>
            <span className="text-stone-100">ananya.r@college.edu</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-stone-400">Workspace</span>
            <span className="text-stone-100">Student Placement</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 p-5 mb-4">
        <span className="text-[13px] font-medium text-stone-100">Connected Gmail</span>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mail className="h-4 w-4 text-stone-400" />
            <span className="text-[13px] text-stone-300">ananya.r@gmail.com</span>
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
          <p className="text-[12.5px] text-stone-400 max-w-xs">
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
    <div className="min-h-screen bg-[#0a0a0a] font-sans relative">
      <Nav setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "signin" && <SignIn />}
      {page === "billing" && <Billing />}
      {page === "profile" && <Profile />}
    </div>
  );
}
