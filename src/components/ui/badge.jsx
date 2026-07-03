import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-stone-900 text-white hover:bg-stone-900/80",
        secondary:
          "border-transparent bg-stone-100 text-stone-900 hover:bg-stone-100/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-stone-950",
        emerald: "border-emerald-100 bg-emerald-50 text-emerald-700 font-medium uppercase tracking-widest",
        spectral: "border border-white/20 bg-[#121212] text-stone-300 font-medium uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
