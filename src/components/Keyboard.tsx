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
    const baseClass = "px-2 py-3 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 select-none cursor-pointer";
    const isSpecial = key === 'ENTER' || key === 'DELETE';
    const widthClass = isSpecial ? 'px-4 min-w-[65px]' : 'min-w-[40px]';
    
    if (disabled) {
      return `${baseClass} ${widthClass} bg-slate-700/50 text-slate-500 cursor-not-allowed hover:scale-100`;
    }

    if (keyStatus === 'correct') {
      return `${baseClass} ${widthClass} bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40`;
    } else if (keyStatus === 'present') {
      return `${baseClass} ${widthClass} bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40`;
    } else if (keyStatus === 'absent') {
      return `${baseClass} ${widthClass} bg-gradient-to-br from-gray-600 to-gray-700 text-gray-300 shadow-lg shadow-gray-500/25`;
    } else {
      return `${baseClass} ${widthClass} bg-gradient-to-br from-slate-700 to-slate-800 text-slate-200 hover:from-slate-600 hover:to-slate-700 shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40 border border-slate-600/50`;
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
    <div className="w-full max-w-lg mx-auto p-4 space-y-2">
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