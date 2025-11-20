import React from 'react';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface HomeProps {
  onTriggerFireworks?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onTriggerFireworks }) => {
  const iconClass = "text-secondary hover:text-primary transition-colors duration-300 transform hover:scale-110";
  
  return (
    <div className="flex-grow flex flex-col items-center justify-center h-screen w-full animate-fade-in">
      <div className="flex flex-col items-center justify-center">
        {/* Name */}
        <h1 
          onMouseEnter={onTriggerFireworks}
          className="text-3xl md:text-4xl font-serif font-normal tracking-wide text-primary/90 select-none mb-6 cursor-pointer transition-all duration-500 hover:text-white hover:scale-105 hover:tracking-wider"
        >
          Liting Huang
        </h1>

        {/* Separator Line */}
        <div className="w-24 h-[1px] bg-secondary/30 mb-6"></div>

        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-8">
          <a href="https://www.linkedin.com/in/liting-huang-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} className={iconClass} strokeWidth={1.5} />
          </a>
          {/* X (Twitter) Custom SVG for accuracy or fallback to Twitter icon */}
          <a href="https://x.com/llliting" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
             <svg 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={iconClass}
             >
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </a>
          <a href="https://instagram.com/llitinghuang" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={20} className={iconClass} strokeWidth={1.5} />
          </a>
          <a href="https://github.com/llliting" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={20} className={iconClass} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
};