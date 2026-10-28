import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base font-bold',
    lg: 'text-2xl font-black'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} id="dakar-logo-container">
      {/* Official Dakar JOJ Swirl Icon matching Image 1 */}
      <svg
        className={`${iconSizes[size]} shrink-0`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="dakar-joj-swirl-icon"
      >
        <circle cx="50" cy="50" r="48" fill="white" className="drop-shadow-sm" />
        
        {/* Ribbon 1: Senegalese Green */}
        <path
          d="M 50 14 C 62 14 74 20 81 30 L 68 40 C 64 34 57 30 50 30 C 40 30 32 37 30 47 L 16 41 C 20 25 34 14 50 14 Z"
          fill="#00853F"
        />
        
        {/* Ribbon 2: Senegalese Gold / Yellow */}
        <path
          d="M 81 30 C 88 40 90 53 86 65 L 72 58 C 74 50 72 43 68 38 L 81 30 Z"
          fill="#FDEF42"
        />
        
        {/* Ribbon 3: Warm Gold */}
        <path
          d="M 86 65 C 82 78 72 87 60 90 L 54 75 C 61 73 67 67 70 60 L 86 65 Z"
          fill="#E5A91E"
        />

        {/* Ribbon 4: Senegalese Red */}
        <path
          d="M 60 90 C 48 94 34 90 24 81 L 34 69 C 40 75 48 77 56 75 L 60 90 Z"
          fill="#E31B23"
        />

        {/* Ribbon 5: Senegalese Red & Green Interlock */}
        <path
          d="M 24 81 C 14 72 10 59 13 46 L 27 52 C 25 60 28 68 33 73 L 24 81 Z"
          fill="#C4151D"
        />
        <path
          d="M 13 46 C 16 33 25 24 37 19 L 42 33 C 35 36 29 42 27 50 L 13 46 Z"
          fill="#009A49"
        />

        {/* Center hole for geometric Teranga Olympic dynamic swirl */}
        <circle cx="50" cy="50" r="16" fill="white" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none" id="dakar-logo-text-block">
          <span className={`tracking-tight text-neutral-900 ${textSizes[size]}`}>
            DAKAR JOJ
          </span>
          <span className={`tracking-wider text-emerald-700 font-semibold ${size === 'lg' ? 'text-lg' : 'text-xs'}`}>
            CONNECT
          </span>
        </div>
      )}
    </div>
  );
};
