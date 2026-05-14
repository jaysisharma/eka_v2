import React from 'react';

export function EkaLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <circle cx="100" cy="100" r="80" stroke="#1A237E" strokeWidth="4" opacity="0.1" />
      <path 
        d="M40 100C40 66.8629 66.8629 40 100 40C133.137 40 160 66.8629 160 100C160 133.137 133.137 160 100 160C66.8629 160 40 133.137 40 100Z" 
        stroke="#1A237E" 
        strokeWidth="12" 
        strokeDasharray="200 100"
      />
      <circle cx="160" cy="100" r="18" fill="#FFB300" className="animate-pulse" />
    </svg>
  );
}
