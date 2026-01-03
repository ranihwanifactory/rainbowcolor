
import React from 'react';
import { Color } from '../types';

interface TubeProps {
  colors: Color[];
  capacity: number;
  isSelected: boolean;
  onClick: () => void;
  isWon: boolean;
}

const Tube: React.FC<TubeProps> = ({ colors, capacity, isSelected, onClick, isWon }) => {
  // We need to fill the tube from bottom to top
  const emptySpaces = capacity - colors.length;
  const reversedColors = [...colors].reverse();

  return (
    <div 
      onClick={onClick}
      className={`
        relative w-16 h-48 sm:w-20 sm:h-60 rounded-b-3xl border-4 cursor-pointer transition-all duration-300
        ${isSelected ? 'border-yellow-400 -translate-y-4 shadow-2xl scale-105' : 'border-white shadow-lg'}
        ${isWon ? 'opacity-90' : 'hover:scale-105'}
        bg-white/20 backdrop-blur-sm flex flex-col-reverse overflow-hidden
      `}
      style={{
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px'
      }}
    >
      {/* Liquid segments */}
      {colors.map((color, idx) => (
        <div 
          key={idx} 
          className="w-full liquid-pour"
          style={{ 
            height: `${100 / capacity}%`, 
            backgroundColor: color,
            borderTop: idx === colors.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.3)'
          }}
        />
      ))}

      {/* Gloss effect */}
      <div className="absolute top-0 left-2 w-2 h-full bg-white/10 rounded-full pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-4 h-4 bg-white/20 rounded-full pointer-events-none"></div>
    </div>
  );
};

export default Tube;
