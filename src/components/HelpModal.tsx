import React from 'react';
import { X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#464647] rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#2d2d2d] border-b border-[#464647] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#569cd6] font-mono">:help</span>
            <h2 className="text-lg font-bold text-[#d4d4d4] font-mono">PalaVrim</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded bg-[#3e3e3e] text-[#dcdcaa] hover:bg-[#464647] hover:text-[#f44747] transition-colors border border-[#464647]"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 space-y-6 text-[#d4d4d4] font-mono">
          <div className="space-y-2">
            <div className="text-[#6a9955] text-sm">
              " Bem-vindo ao PalaVrim - O jogo de palavras para usuários do Vim! "
            </div>
            <p className="text-sm leading-relaxed">
              Descubra a palavra secreta em até 6 tentativas usando suas habilidades de edição!
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[#569cd6]">:syntax on</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#4ec9b0] rounded flex items-center justify-center text-[#1e1e1e] font-bold text-sm">
                  A
                </div>
                <span className="text-sm">Letra correta na posição certa</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#dcdcaa] rounded flex items-center justify-center text-[#1e1e1e] font-bold text-sm">
                  R
                </div>
                <span className="text-sm">Letra existe mas posição errada</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#3e3e3e] border border-[#464647] rounded flex items-center justify-center text-[#969696] font-bold text-sm">
                  T
                </div>
                <span className="text-sm">Letra não existe na palavra</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-[#569cd6]">:map &lt;commands&gt;</h3>
            <div className="bg-[#2d2d2d] border border-[#464647] rounded p-3 text-sm space-y-1">
              <div><span className="text-[#ce9178]">A-Z</span> → Inserir letra</div>
              <div><span className="text-[#ce9178]">Backspace</span> → Apagar letra</div>
              <div><span className="text-[#ce9178]">Enter</span> → Confirmar palavra</div>
              <div><span className="text-[#ce9178]">:new</span> → Novo jogo</div>
              <div><span className="text-[#ce9178]">:help</span> → Mostrar ajuda</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-[#569cd6]">:set tips</h3>
            <ul className="space-y-1 text-sm text-[#969696]">
              <li>• Use palavras reais em português</li>
              <li>• Observe as cores para descobrir padrões</li>
              <li>• Você tem 6 tentativas (como 6 linhas no buffer)</li>
              <li>• Pense como um verdadeiro vimmer!</li>
            </ul>
          </div>
          
          <div className="border-t border-[#464647] pt-4">
            <div className="text-[#6a9955] text-xs text-center">
              " Criado com ❤️ para a comunidade Vim "
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};