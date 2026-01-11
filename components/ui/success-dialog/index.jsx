'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SuccessDialog({ isOpen, onClose, className, ...props }) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div
        className={cn(
          'relative z-10 w-full max-w-md rounded-3xl border border-indigo-400/40 bg-slate-900/95 backdrop-blur-2xl shadow-2xl p-8 md:p-10',
          'animate-fade-in-up',
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl pointer-events-none" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800/50 transition-colors text-slate-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Success icon with animation */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full bg-indigo-400/20 blur-xl"
                style={{
                  animationName: 'pulseGlow',
                  animationDuration: '2s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              />
              {/* Check circle */}
              <CheckCircle2 className="relative w-20 h-20 text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            Registration Successful!
          </h2>

          {/* Message */}
          <p className="text-lg text-slate-200 font-electrolize">
            Meet you at the event
          </p>

          {/* Button */}
          <div className="pt-4">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl py-6 px-8 font-semibold text-lg hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(129,140,248,0.8)] transition-all duration-300"
            >
              Awesome!
            </Button>
          </div>
        </div>

        {/* CSS Animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulseGlow {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.2);
            }
          }
        `}} />
      </div>
    </div>
  );
}

export { SuccessDialog };

