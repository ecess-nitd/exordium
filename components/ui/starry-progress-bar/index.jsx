'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

function StarryProgressBar({ 
  progress = 0, 
  className, 
  showStars = true,
  animated = true,
  ...props 
}) {
  const [displayProgress, setDisplayProgress] = React.useState(0);

  React.useEffect(() => {
    if (animated) {
      // Smoothly animate to the target progress
      const timer = setInterval(() => {
        setDisplayProgress((prev) => {
          if (prev < progress) {
            const diff = progress - prev;
            return Math.min(prev + diff * 0.1, progress);
          }
          return prev;
        });
      }, 16); // ~60fps
      return () => clearInterval(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  return (
    <div
      className={cn(
        'relative w-full h-2 bg-slate-800/50 rounded-full overflow-hidden border border-indigo-400/20',
        className
      )}
      {...props}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-indigo-950/50 to-slate-900/50" />
      
      {/* Progress fill */}
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_20px_rgba(129,140,248,0.6)]"
        style={{
          width: `${displayProgress}%`,
        }}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            animationName: 'shimmer',
            animationDuration: '2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      </div>

      {/* Animated stars on progress bar */}
      {showStars && (
        <>
          {[...Array(5)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute top-1/2 rounded-full bg-white"
              style={{
                left: `${(i + 1) * 20}%`,
                width: '3px',
                height: '3px',
                transform: 'translateY(-50%)',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px rgba(129, 140, 248, 0.6)',
                opacity: displayProgress > (i + 1) * 20 ? 1 : 0.3,
                transition: 'opacity 0.3s ease',
                animationName: 'starPulse',
                animationDuration: '1.5s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Rotating star at progress position */}
      <div
        className="absolute top-1/2"
        style={{
          left: `${displayProgress}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Star
          className="w-4 h-4 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.9)] fill-yellow-300"
          style={{
            animationName: 'starRotate',
            animationDuration: '2s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
      </div>

      {/* Glowing particles */}
      <div
        className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-indigo-400/50 to-transparent blur-sm"
        style={{
          left: `${displayProgress}%`,
          transform: 'translateX(-100%)',
        }}
      />

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes starPulse {
          0%, 100% {
            opacity: 0.5;
            transform: translateY(-50%) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1.2);
          }
        }
        
        @keyframes starRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}} />
    </div>
  );
}

export { StarryProgressBar };

