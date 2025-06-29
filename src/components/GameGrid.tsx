import React from 'react';
import { LetterState } from '../types/game';

interface GameGridProps {
  guesses: string[];
  currentGuess: string;
  wordLength: number;
  maxAttempts: number;
  getLetterStates: (guess: string) => LetterState[];
}

export const GameGrid: React.FC<GameGridProps> = ({
  guesses,
  currentGuess,
  wordLength,
  maxAttempts,
  getLetterStates
}) => {
  const getRowData = (rowIndex: number) => {
    if (rowIndex < guesses.length) {
      // Linha com palpite confirmado
      return getLetterStates(guesses[rowIndex]);
    } else if (rowIndex === guesses.length) {
      // Linha atual
      const currentLetters = currentGuess.split('').map(letter => ({
        letter,
        status: 'empty' as const
      }));
      
      // Preencher células vazias
      while (currentLetters.length < wordLength) {
        currentLetters.push({ letter: '', status: 'empty' });
      }
      
      return currentLetters;
    } else {
      // Linhas vazias
      return Array(wordLength).fill(0).map(() => ({
        letter: '',
        status: 'empty' as const
      }));
    }
  };

  const getCellClass = (status: string, isCurrentRow: boolean, hasLetter: boolean) => {
    const baseClass = "border-2 rounded flex items-center justify-center font-bold font-mono transition-all duration-300 transform";
    
    // Tamanhos responsivos para as células
    const sizeClass = "w-12 h-12 text-lg sm:w-14 sm:h-14 sm:text-xl lg:w-16 lg:h-16 lg:text-2xl";
    
    if (status === 'correct') {
      return `${baseClass} ${sizeClass} bg-[#4ec9b0] border-[#4ec9b0] text-[#1e1e1e] shadow-lg shadow-[#4ec9b0]/25 animate-flip`;
    } else if (status === 'present') {
      return `${baseClass} ${sizeClass} bg-[#dcdcaa] border-[#dcdcaa] text-[#1e1e1e] shadow-lg shadow-[#dcdcaa]/25 animate-flip`;
    } else if (status === 'absent') {
      return `${baseClass} ${sizeClass} bg-[#3e3e3e] border-[#464647] text-[#969696] shadow-lg animate-flip`;
    } else if (isCurrentRow && hasLetter) {
      return `${baseClass} ${sizeClass} bg-[#2d2d2d] border-[#569cd6] text-[#d4d4d4] shadow-md scale-105`;
    } else if (isCurrentRow) {
      return `${baseClass} ${sizeClass} bg-[#2d2d2d] border-[#464647] text-[#d4d4d4] hover:border-[#569cd6] hover:bg-[#3e3e3e]`;
    } else {
      return `${baseClass} ${sizeClass} bg-[#1e1e1e] border-[#464647] text-[#969696]`;
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-6">
      {/* Line numbers - Vim style */}
      <div className="flex items-center justify-center mb-2">
        <span className="text-[#6a9955] text-xs sm:text-sm font-mono">
          " {maxAttempts} tentativas disponíveis "
        </span>
      </div>
      
      <div className="max-w-fit mx-auto">
        {Array(maxAttempts).fill(0).map((_, rowIndex) => {
          const rowData = getRowData(rowIndex);
          const isCurrentRow = rowIndex === guesses.length;
          
          return (
            <div key={rowIndex} className="flex gap-2 sm:gap-3 justify-center items-center mb-2 sm:mb-3">
              {/* Vim-style line number */}
              <div className="w-4 sm:w-6 text-right text-[#6a9955] text-xs sm:text-sm font-mono flex-shrink-0">
                {rowIndex + 1}
              </div>
              
              <div className="flex gap-1 sm:gap-2">
                {rowData.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={getCellClass(cell.status, isCurrentRow, !!cell.letter)}
                    style={{
                      animationDelay: rowIndex < guesses.length ? `${cellIndex * 100}ms` : '0ms'
                    }}
                  >
                    {cell.letter}
                  </div>
                ))}
              </div>
              
              {/* Current line indicator */}
              {isCurrentRow && (
                <div className="text-[#569cd6] text-xs sm:text-sm font-mono ml-1 sm:ml-2 flex-shrink-0">
                  ←
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};