import React from 'react';
import { HelpCircle, RotateCcw } from 'lucide-react';

interface GameHeaderProps {
  onShowHelp: () => void;
  onRestart: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ onShowHelp, onRestart }) => {
  return (
    <header className="w-full border-b border-[#464647] bg-[#2d2d2d]">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#569cd6] rounded-lg flex items-center justify-center">
            <span className="text-[#1e1e1e] font-bold text-lg font-mono">V</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#569cd6] font-mono">
              PalaVrim
            </h1>
            <span className="text-xs text-[#6a9955] font-mono">
              " Vim-powered word game "
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onRestart}
            className="p-3 rounded bg-[#3e3e3e] text-[#dcdcaa] hover:bg-[#464647] hover:text-[#569cd6] transition-all duration-200 border border-[#464647] hover:border-[#569cd6] font-mono"
            title=":restart - Reiniciar jogo"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={onShowHelp}
            className="p-3 rounded bg-[#3e3e3e] text-[#dcdcaa] hover:bg-[#464647] hover:text-[#569cd6] transition-all duration-200 border border-[#464647] hover:border-[#569cd6] font-mono"
            title=":help - Como jogar"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};