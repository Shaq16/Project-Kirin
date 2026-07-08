import { X, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ComingSoonModal({ isOpen, onClose }) {
  const [now, setNow] = useState(Date.now());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("https://formspree.io/f/mwvddejg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    let frameId;
    const update = () => {
      setNow(Date.now());
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isOpen]);

  if (!isOpen) return null;

  // Use local system time for accurate natural movement
  const dateObj = new Date(now);
  const ms = dateObj.getMilliseconds();
  const s = dateObj.getSeconds();
  const m = dateObj.getMinutes();
  const h = dateObj.getHours();

  // Smooth continuous rotation logic
  const secondDeg = (s + ms / 1000) * 6;
  const minuteDeg = (m + s / 60) * 6;
  const hourDeg = ((h % 12) + m / 60) * 30;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stone-950/90 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-stone-400 hover:text-stone-100"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Clock & Text Container */}
      <div className="relative w-[450px] h-[450px] flex items-center justify-center mb-8">
        
        {/* Clock Tick Marks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 flex justify-center py-4"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div className="w-[2px] h-[24px] bg-white/80 rounded-full" />
          </div>
        ))}

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none text-center">
          <p className="text-[12px] font-medium tracking-[0.2em] text-stone-400 uppercase mb-3">
            Our new extension is
          </p>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-stone-100 mb-2 leading-[1.05]">
            COMING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
              SOON
            </span>
          </h2>
          <p className="text-[12px] font-medium tracking-[0.2em] text-stone-400 uppercase mt-4">
            Stay tuned!
          </p>
        </div>

        {/* Hands Wrapper */}
        <div className="absolute inset-0 z-0">
          {/* Hour Hand */}
          <div 
            className="absolute top-1/2 left-1/2 w-1.5 h-24 bg-white/20 rounded-full -translate-x-1/2 origin-bottom"
            style={{ transform: `translateX(-50%) translateY(-100%) rotate(${hourDeg}deg)` }}
          />
          
          {/* Minute Hand */}
          <div 
            className="absolute top-1/2 left-1/2 w-1 h-36 bg-white/40 rounded-full -translate-x-1/2 origin-bottom"
            style={{ transform: `translateX(-50%) translateY(-100%) rotate(${minuteDeg}deg)` }}
          />
          
          {/* Second Hand (Minimal, stretches across) */}
          <div 
            className="absolute top-1/2 left-0 w-full h-[2px] pointer-events-none"
            style={{ transform: `translateY(-50%) rotate(${secondDeg - 90}deg)` }}
          >
            <div className="w-1/2 h-full bg-transparent" />
            <div className="absolute top-0 left-1/4 w-3/4 h-full bg-white/60" />
          </div>

          {/* Center Pivot */}
          <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-[#0a0a0a] border-2 border-white/60 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Email Capture */}
      <div className="w-full max-w-md px-6 z-20">
        {status === "success" ? (
          <div className="flex items-center justify-center p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            You're on the list! Keep an eye on your inbox.
          </div>
        ) : (
          <div className="group relative rounded-full p-[1px] transition-all duration-500 focus-within:bg-gradient-to-r focus-within:from-blue-500 focus-within:via-purple-500 focus-within:to-orange-500 focus-within:shadow-[0_0_20px_rgba(139,92,246,0.25)] bg-white/10">
            <form
              onSubmit={handleSubscribe}
              className="flex items-center p-1 rounded-full bg-[#0a0a0a] w-full h-full"
            >
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for early access"
                  required
                  disabled={status === "loading"}
                  className="flex-1 rounded-l-full bg-transparent border-none text-stone-100 px-5 py-2.5 text-[14px] placeholder:text-stone-500 focus:outline-none focus:ring-0 disabled:opacity-50"
                  style={{ transition: 'background-color 5000s ease-in-out 0s', WebkitTextFillColor: '#f5f5f4' }}
                />
              <Button size="pillSm" className="shadow-none flex items-center gap-1.5 px-5" disabled={status === "loading"}>
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Notify me
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
        {status === "error" && (
          <p className="mt-3 text-xs text-center text-red-400">Something went wrong. Please try again.</p>
        )}
      </div>

    </div>
  );
}
