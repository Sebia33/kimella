'use client';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAD7A8" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      <text 
        x="10" 
        y="45" 
        fontFamily="Playfair Display, serif" 
        fontSize="44" 
        fontWeight="800" 
        fill="url(#goldGradient)"
        letterSpacing="-0.02em"
      >
        KIMELLA
      </text>
      <text 
        x="10" 
        y="52" 
        fontFamily="Inter, sans-serif" 
        fontSize="12" 
        fontWeight="500" 
        fill="white" 
        letterSpacing="0.1em"
        opacity="0.8"
      >
        INTERIOR
      </text>
    </svg>
  );
}

