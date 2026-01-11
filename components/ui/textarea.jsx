import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[90px] w-full rounded-xl border border-indigo-400/30 bg-slate-900/60 backdrop-blur-md text-white px-4 py-3 text-base shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400 focus-visible:bg-slate-900/80 focus-visible:shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:border-indigo-400/60 hover:bg-slate-900/70 hover:shadow-[0_0_15px_rgba(129,140,248,0.3)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
