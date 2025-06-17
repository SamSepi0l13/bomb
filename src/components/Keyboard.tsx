import React from 'react';
import { Delete } from 'lucide-react';
import { KeyboardKey } from '../types/game';

interface KeyboardProps {
  keyboardStates: KeyboardKey[];
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  keyboardStates,
  onKeyPress,
  onDelete,
  onEnter,
  disabled = false
}) => {
  const keyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ];

  const getKeyState = (key: string) => {
    const keyState = keyboardStates.find(k => k.key === key);
    return keyState?.status || 'unused';
  };

  const getKeyClass = (key: string, keyStatus: string) => {
    const baseClass = "px-3 py-3 rounded font-semibold text-sm font-mono transition-all duration-200 transform hover:scale-105 active:scale-95 select-none cursor-pointer border";
    const isSpecial = key === 'ENTER' || key === 'DELETE';
    const widthClass = isSpecial ? 'px-4 min-w-[70px]' : 'min-w-[42px]';
    
    if (disabled) {
      return `${baseClass} ${widthClass} bg-[#2d2d2d] border-[#464647] text-[#969696] cursor-not-allowed hover:scale-100`;
    }

    if (keyStatus === 'correct') {
      return `${baseClass} ${widthClass} bg-[#4ec9b0] border-[#4ec9b0] text-[#1e1e1e] shadow-lg`;
    } else if (keyStatus === 'present') {
      return `${baseClass} ${widthClass} bg-[#dcdcaa] border-[#dcdcaa] text-[#1e1e1e] shadow-lg`;
    } else if (keyStatus === 'absent') {
      return `${baseClass} ${widthClass} bg-[#3e3e3e] border-[#464647] text-[#969696] shadow-md`;
    } else {
      return `${baseClass} ${widthClass} bg-[#2d2d2d] border-[#464647] text-[#d4d4d4] hover:bg-[#3e3e3e] hover:border-[#569cd6] hover:text-[#569cd6] shadow-md`;
    }
  };

  const handleKeyClick = (key: string) => {
    if (disabled) return;
    
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'DELETE') {
      onDelete();
    } else {
      onKeyPress(key);
    }
  };

  // Keyboard event listener
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;
      
      const key = event.key.toUpperCase();
      
      if (event.key === 'Enter') {
        onEnter();
      } else if (event.key === 'Backspace') {
        onDelete();
      } else if (/^[A-Z]$/.test(key)) {
        onKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress, onDelete, onEnter, disabled]);

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-3">
      {/* Vim-style keyboard header */}
      <div className="text-center text-[#6a9955] text-sm font-mono mb-4">
        " Use o teclado físico ou clique nas teclas "
      </div>
      
      {keyRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {row.map((key) => {
            const keyStatus = getKeyState(key);
            return (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className={getKeyClass(key, keyStatus)}
                disabled={disabled}
              >
                {key === 'DELETE' ? (
                  <Delete size={16} />
                ) : key === 'ENTER' ? (
                  '⏎'
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};