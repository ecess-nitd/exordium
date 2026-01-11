'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

function StarryNightBackground({ className, children, ...props }) {
  const [stars, setStars] = React.useState([]);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    // Generate random stars only on client
    const generateStars = () => {
      const starCount = 200;
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 3,
          duration: 2 + Math.random() * 3, // Store duration in star object
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div
      className={cn(
        'relative size-full overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950',
        className
      )}
      {...props}
    >
      {/* Base night sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950" />
      
      {/* Stars layer - only render on client to avoid hydration mismatch */}
      {isMounted && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
                animationName: 'twinkle',
                animationDuration: `${star.duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${star.twinkleDelay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle nebula effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Add CSS animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}} />

      {children}
    </div>
  );
}

export { StarryNightBackground };

