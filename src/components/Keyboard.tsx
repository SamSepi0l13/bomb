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
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = React.useState(true);

  // Detectar se é dispositivo touch
  React.useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobile = window.innerWidth <= 768;
      const hasPhysicalKeyboard = window.innerWidth > 1024;
      
      setIsTouchDevice(hasTouch && isMobile);
      // Mostrar teclado virtual apenas se não for desktop com teclado físico
      setShowVirtualKeyboard(!hasPhysicalKeyboard || hasTouch);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

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
    const isSpecial = key === 'ENTER' || key === 'DELETE';
    
    // Classes base responsivas
    const baseClass = "rounded font-semibold font-mono transition-all duration-200 transform active:scale-95 select-none cursor-pointer border flex items-center justify-center";
    
    // Tamanhos responsivos
    const sizeClasses = isSpecial 
      ? "px-2 py-3 min-w-[60px] text-xs sm:px-3 sm:py-4 sm:min-w-[80px] sm:text-sm lg:px-4 lg:py-4 lg:min-w-[90px] lg:text-base"
      : "px-2 py-3 min-w-[32px] w-8 h-12 text-sm sm:px-3 sm:py-4 sm:min-w-[40px] sm:w-10 sm:h-14 sm:text-base lg:px-4 lg:py-4 lg:min-w-[44px] lg:w-11 lg:h-16 lg:text-lg";
    
    const hoverClass = disabled ? '' : 'hover:scale-105';
    
    if (disabled) {
      return `${baseClass} ${sizeClasses} bg-[#2d2d2d] border-[#464647] text-[#969696] cursor-not-allowed`;
    }

    if (keyStatus === 'correct') {
      return `${baseClass} ${sizeClasses} ${hoverClass} bg-[#4ec9b0] border-[#4ec9b0] text-[#1e1e1e] shadow-lg shadow-[#4ec9b0]/20`;
    } else if (keyStatus === 'present') {
      return `${baseClass} ${sizeClasses} ${hoverClass} bg-[#dcdcaa] border-[#dcdcaa] text-[#1e1e1e] shadow-lg shadow-[#dcdcaa]/20`;
    } else if (keyStatus === 'absent') {
      return `${baseClass} ${sizeClasses} ${hoverClass} bg-[#3e3e3e] border-[#464647] text-[#969696] shadow-md`;
    } else {
      return `${baseClass} ${sizeClasses} ${hoverClass} bg-[#2d2d2d] border-[#464647] text-[#d4d4d4] hover:bg-[#3e3e3e] hover:border-[#569cd6] hover:text-[#569cd6] shadow-md hover:shadow-[#569cd6]/20`;
    }
  };

  const handleKeyClick = (key: string) => {
    if (disabled) return;
    
    // Feedback tátil em dispositivos móveis
    if (isTouchDevice && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
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
        event.preventDefault();
        onEnter();
      } else if (event.key === 'Backspace') {
        event.preventDefault();
        onDelete();
      } else if (/^[A-Z]$/.test(key)) {
        event.preventDefault();
        onKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress, onDelete, onEnter, disabled]);

  // Se não deve mostrar teclado virtual, apenas retorna indicação
  if (!showVirtualKeyboard) {
    return (
      <div className="w-full max-w-lg mx-auto p-4 text-center">
        <div className="text-[#6a9955] text-sm font-mono">
          " Use seu teclado físico para jogar "
        </div>
        <div className="mt-2 text-[#969696] text-xs font-mono">
          A-Z: inserir • Backspace: apagar • Enter: confirmar
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-2 sm:p-4 space-y-2 sm:space-y-3">
      {/* Vim-style keyboard header */}
      <div className="text-center text-[#6a9955] text-xs sm:text-sm font-mono mb-2 sm:mb-4">
        {isTouchDevice 
          ? '" Toque nas teclas para jogar "' 
          : '" Use o teclado físico ou clique nas teclas "'
        }
      </div>
      
      <div className="max-w-2xl mx-auto">
        {keyRows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`flex gap-1 sm:gap-2 justify-center mb-1 sm:mb-2 ${
              rowIndex === 1 ? 'px-4 sm:px-6' : rowIndex === 2 ? 'px-0' : ''
            }`}
          >
            {row.map((key) => {
              const keyStatus = getKeyState(key);
              return (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={getKeyClass(key, keyStatus)}
                  disabled={disabled}
                  aria-label={key === 'DELETE' ? 'Apagar' : key === 'ENTER' ? 'Confirmar' : key}
                >
                  {key === 'DELETE' ? (
                    <Delete size={isTouchDevice ? 14 : 16} />
                  ) : key === 'ENTER' ? (
                    <span className="text-xs sm:text-sm">⏎</span>
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Indicador de teclado físico disponível */}
      {!isTouchDevice && (
        <div className="text-center text-[#6a9955] text-xs font-mono mt-3">
          " Teclado físico detectado - use as teclas do seu computador "
        </div>
      )}
    </div>
  );
};