import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-indigo-400/30 bg-slate-900/60 backdrop-blur-md text-white px-4 py-3 text-base shadow-md transition-all duration-300 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:border-indigo-400 focus-visible:bg-slate-900/80 focus-visible:shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:border-indigo-400/60 hover:bg-slate-900/70 hover:shadow-[0_0_15px_rgba(129,140,248,0.3)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
export { Input };
