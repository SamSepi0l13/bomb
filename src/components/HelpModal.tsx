import React from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-xl border border-purple-800/30 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-900 border-b border-purple-800/30 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Como Jogar</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-purple-800/30 text-purple-300 hover:bg-purple-700/40 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 text-slate-300">
          <p>
            Descubra a palavra secreta em até 6 tentativas!
          </p>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-purple-300">Como funciona:</h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <span>Letra correta no local certo</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <span>Letra correta no local errado</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded flex items-center justify-center text-white font-bold text-sm">
                  T
                </div>
                <span>Letra não está na palavra</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-purple-300">Dicas:</h3>
            <ul className="space-y-1 text-sm">
              <li>• Use palavras reais em português</li>
              <li>• Observe as cores para descobrir a palavra</li>
              <li>• Você tem 6 tentativas para acertar</li>
              <li>• Uma nova palavra está disponível todos os dias</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};