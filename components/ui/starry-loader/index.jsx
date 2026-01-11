'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

function StarryLoader({ className, size = 'default', ...props }) {
  const sizeClasses = {
    small: 'w-12 h-12',
    default: 'w-20 h-20',
    large: 'w-32 h-32',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Outer rotating ring of stars - orbiting effect */}
      <div 
        className="absolute inset-0"
        style={{
          animationName: 'orbitOuter',
          animationDuration: '8s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {[...Array(8)].map((_, i) => {
          const angle = (i * 360) / 8;
          const radius = size === 'small' ? 18 : size === 'large' ? 48 : 32;
          const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
          const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;
          
          return (
            <div
              key={`outer-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: '5px',
                height: '5px',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 1), 0 0 20px rgba(129, 140, 248, 0.8), 0 0 30px rgba(99, 102, 241, 0.4)',
                animationName: 'starPulse',
                animationDuration: '1.5s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.2}s`,
              }}
            />
          );
        })}
      </div>

      {/* Inner rotating ring of stars - orbiting effect (reverse) */}
      <div 
        className="absolute inset-0"
        style={{
          animationName: 'orbitInner',
          animationDuration: '6s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {[...Array(6)].map((_, i) => {
          const angle = (i * 360) / 6;
          const radius = size === 'small' ? 12 : size === 'large' ? 32 : 20;
          const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius * 100) / 100;
          const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius * 100) / 100;
          
          return (
            <div
              key={`inner-${i}`}
              className="absolute rounded-full bg-yellow-300"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: '4px',
                height: '4px',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 8px rgba(253, 224, 71, 1), 0 0 16px rgba(251, 191, 36, 0.8), 0 0 24px rgba(245, 158, 11, 0.4)',
                animationName: 'starPulse',
                animationDuration: '1.2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          );
        })}
      </div>

      {/* Center star with enhanced glow and pulse */}
      <div className="relative z-10">
        {/* Glow rings around center star */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.3) 0%, transparent 70%)',
            animationName: 'glowPulse',
            animationDuration: '2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
        <Star
          className={cn(
            'text-indigo-400 drop-shadow-[0_0_30px_rgba(129,140,248,1),0_0_60px_rgba(99,102,241,0.6)] fill-indigo-400',
            size === 'small' ? 'w-6 h-6' : size === 'large' ? 'w-16 h-16' : 'w-10 h-10'
          )}
          style={{
            animationName: 'starPulseOnly',
            animationDuration: '2s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      </div>

      {/* Rotating outer ring with glow */}
      <div
        className="absolute inset-0 border-2 border-indigo-400/40 rounded-full"
        style={{
          boxShadow: '0 0 20px rgba(129, 140, 248, 0.3), inset 0 0 20px rgba(99, 102, 241, 0.2)',
          animationName: 'rotate',
          animationDuration: '8s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      />

      {/* Rotating inner ring with glow */}
      <div
        className="absolute border border-purple-400/30 rounded-full"
        style={{
          width: size === 'small' ? '60%' : size === 'large' ? '60%' : '60%',
          height: size === 'small' ? '60%' : size === 'large' ? '60%' : '60%',
          top: '20%',
          left: '20%',
          boxShadow: '0 0 15px rgba(168, 85, 247, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.2)',
          animationName: 'rotateReverse',
          animationDuration: '6s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      />

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes starPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        
        @keyframes starPulseOnly {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
            filter: brightness(1);
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
            filter: brightness(1.3);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }
        
        @keyframes orbitOuter {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes orbitInner {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes rotateReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}} />
    </div>
  );
}

export { StarryLoader };

