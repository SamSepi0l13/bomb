import React, { useState } from 'react';
import { GameHeader } from './components/GameHeader';
import { GameGrid } from './components/GameGrid';
import { Keyboard } from './components/Keyboard';
import { HelpModal } from './components/HelpModal';
import { Notification } from './components/Notification';
import { useGame } from './hooks/useGame';

function App() {
  const {
    gameState,
    wordLength,
    loading,
    notification,
    notificationKey,
    palavraCorreta,
    getLetterStates,
    getKeyboardStates,
    addLetter,
    removeLetter,
    submitGuess,
    restartGame
  } = useGame();

  const [showHelp, setShowHelp] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-[#569cd6] rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-[#1e1e1e] font-bold text-2xl font-mono">V</span>
            </div>
          </div>
          <p className="text-[#569cd6] text-lg font-mono">Carregando PalaVrim...</p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-[#569cd6] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#569cd6] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#569cd6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] flex flex-col font-mono">
      <GameHeader
        onShowHelp={() => setShowHelp(true)}
        onRestart={restartGame}
      />
      
      {/* Vim-style status line */}
      <div className="bg-[#569cd6] text-[#1e1e1e] px-4 py-1 text-sm font-semibold">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span>NORMAL</span>
          <span className="hidden sm:inline">Tentativas: {gameState.guesses.length}/{gameState.maxAttempts}</span>
          <span className="sm:hidden">{gameState.guesses.length}/{gameState.maxAttempts}</span>
          <span className="hidden sm:inline">Palavra: {wordLength} letras</span>
          <span className="sm:hidden">{wordLength}L</span>
        </div>
      </div>
      
      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-4 sm:py-8">
        <div className="w-full space-y-4 sm:space-y-8">
          <GameGrid
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            wordLength={wordLength}
            maxAttempts={gameState.maxAttempts}
            getLetterStates={getLetterStates}
          />
          
          <Keyboard
            keyboardStates={getKeyboardStates()}
            onKeyPress={addLetter}
            onDelete={removeLetter}
            onEnter={submitGuess}
            disabled={gameState.gameStatus !== 'playing'}
          />
        </div>

        {gameState.gameStatus !== 'playing' && (
          <div className="mt-6 sm:mt-8 text-center space-y-4 px-4">
            <div className="p-4 sm:p-6 bg-[#2d2d2d] border border-[#464647] rounded-lg max-w-md mx-auto">
              {gameState.gameStatus === 'won' ? (
                <div className="space-y-3">
                  <div className="text-xl sm:text-2xl font-bold text-[#4ec9b0] font-mono">
                    :wq! SUCCESS
                  </div>
                  <p className="text-[#d4d4d4] text-sm sm:text-base">
                    Palavra descoberta em {gameState.guesses.length} tentativa{gameState.guesses.length !== 1 ? 's' : ''}!
                  </p>
                  <div className="text-xs sm:text-sm text-[#6a9955] font-mono">
                    " Excelente trabalho, usuário do Vim! "
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xl sm:text-2xl font-bold text-[#f44747] font-mono">
                    :q! GAME OVER
                  </div>
                  <p className="text-[#d4d4d4] text-sm sm:text-base">
                    A palavra era: <span className="font-bold text-[#dcdcaa]">{palavraCorreta}</span>
                  </p>
                  <div className="text-xs sm:text-sm text-[#6a9955] font-mono">
                    " Não desista, continue praticando! "
                  </div>
                </div>
              )}
              
              <button
                onClick={restartGame}
                className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-[#569cd6] text-[#1e1e1e] font-semibold rounded font-mono hover:bg-[#4fc1ff] transition-colors duration-200 border border-[#569cd6] hover:border-[#4fc1ff] text-sm sm:text-base"
              >
                :new - Novo Jogo
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Vim command line */}
      <div className="bg-[#1e1e1e] border-t border-[#464647] px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center space-x-2 text-xs sm:text-sm">
          <span className="text-[#569cd6]">:</span>
          <span className="text-[#d4d4d4] truncate">
            {gameState.gameStatus === 'playing' 
              ? `Digite uma palavra de ${wordLength} letras` 
              : gameState.gameStatus === 'won' 
                ? 'Parabéns! Pressione :new para jogar novamente'
                : 'Game Over! Pressione :new para tentar novamente'
            }
          </span>
          <span className="cursor-blink text-[#569cd6] flex-shrink-0">█</span>
        </div>
      </div>

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {notification && (
        <Notification
          key={notificationKey}
          message={notification}
          type={notification.includes('Erro') || notification.includes('pena') || notification.includes('OVER') ? 'error' : 
                notification.includes('SUCCESS') || notification.includes('🎉') ? 'success' : 'info'}
        />
      )}
    </div>
  );
}

export default App;