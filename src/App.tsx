import React, { useState } from 'react';
import { GameHeader } from './components/GameHeader';
import { GameGrid } from './components/GameGrid';
import { Keyboard } from './components/Keyboard';
import { HelpModal } from './components/HelpModal';
import { Notification } from './components/Notification';
import { useGame } from './hooks/useGame';
import { Loader2 } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <img src="/assets/images/PalaMago.png" alt="PalaMago" className="w-16 h-16 animate-pulse" />
          </div>
          <p className="text-purple-300 text-lg">Carregando PalaMago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      <GameHeader
        onShowHelp={() => setShowHelp(true)}
        onRestart={restartGame}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full py-4">
        <div className="w-full space-y-6">
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
          <div className="mt-6 text-center space-y-4">
            <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-800/30">
              {gameState.gameStatus === 'won' ? (
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-green-400">🎉 Parabéns!</h3>
                  <p className="text-slate-300">
                    Você descobriu a palavra em {gameState.guesses.length} tentativa{gameState.guesses.length !== 1 ? 's' : ''}!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-red-400">😔 Que pena!</h3>
                  <p className="text-slate-300">
                    A palavra era: <span className="font-bold text-purple-300">{palavraCorreta}</span>
                  </p>
                </div>
              )}
              
              <button
                onClick={restartGame}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                Jogar Novamente
              </button>
            </div>
          </div>
        )}
      </main>

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      {notification && (
        <Notification
          key={notificationKey}
          message={notification}
          type={notification.includes('Erro') || notification.includes('pena') || notification.includes('😔') ? 'error' : 
                notification.includes('Parabéns') || notification.includes('🎉') ? 'success' : 'info'}
        />
      )}

      {/* Particles background effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-pink-500/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400/25 rounded-full animate-pulse delay-500" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-400/20 rounded-full animate-pulse delay-700" />
      </div>
    </div>
  );
}

export default App;