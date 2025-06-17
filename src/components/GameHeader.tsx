import React from 'react';
import { HelpCircle, RotateCcw } from 'lucide-react';

interface GameHeaderProps {
  onShowHelp: () => void;
  onRestart: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ onShowHelp, onRestart }) => {
  return (
    <header className="w-full border-b border-purple-800/30 bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="">
            <img src="/assets/images/PalaMago.png" alt="PalaMago" className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            PalaMago
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onRestart}
            className="p-3 rounded-lg bg-purple-800/30 text-purple-300 hover:bg-purple-700/40 hover:text-purple-200 transition-all duration-200 hover:scale-105"
            title="Reiniciar jogo"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={onShowHelp}
            className="p-3 rounded-lg bg-purple-800/30 text-purple-300 hover:bg-purple-700/40 hover:text-purple-200 transition-all duration-200 hover:scale-105"
            title="Como jogar"
          >
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};