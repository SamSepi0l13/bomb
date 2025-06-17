import { useState, useEffect, useCallback } from 'react';
import { GameState, LetterState, KeyboardKey } from '../types/game';
import { api } from '../utils/api';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    word: '',
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    maxAttempts: 6,
  });

  const [wordLength, setWordLength] = useState(5);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string>('');
  const [notificationKey, setNotificationKey] = useState(0);
  const [palavraCorreta, setPalavraCorreta] = useState('');

  // Inicializar jogo
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    setLoading(true);
    try {
      const tamanho = await api.getTamanho();
      const palavra = await api.getPalavraAleatoria();
      
      setWordLength(tamanho);
      setPalavraCorreta(palavra);
      setGameState(prev => ({
        ...prev,
        word: palavra,
        guesses: [],
        currentGuess: '',
        gameStatus: 'playing',
      }));
    } catch (error) {
      console.error('Erro ao inicializar jogo:', error);
      showNotification('Erro ao carregar jogo. Usando modo offline.');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setNotificationKey(prev => prev + 1); // Force re-render para nova notificação
    // Limpar mais rapidamente
    setTimeout(() => setNotification(''), 1600);
  };

  // Obter estado das letras para um palpite
  const getLetterStates = useCallback((guess: string): LetterState[] => {
    const { word } = gameState;
    const result: LetterState[] = [];
    const wordArray = word.split('');
    const guessArray = guess.split('');

    // Primeira passada: marcar letras corretas
    const wordLetterCount: { [key: string]: number } = {};
    wordArray.forEach(letter => {
      wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
    });

    // Marcar corretas primeiro
    guessArray.forEach((letter, index) => {
      if (letter === wordArray[index]) {
        result[index] = { letter, status: 'correct' };
        wordLetterCount[letter]--;
      } else {
        result[index] = { letter, status: 'absent' };
      }
    });

    // Segunda passada: marcar presentes
    guessArray.forEach((letter, index) => {
      if (result[index].status === 'absent' && wordLetterCount[letter] > 0) {
        result[index] = { letter, status: 'present' };
        wordLetterCount[letter]--;
      }
    });

    return result;
  }, [gameState.word]);

  // Obter estado do teclado
  const getKeyboardStates = useCallback((): KeyboardKey[] => {
    const keyStates: { [key: string]: 'correct' | 'present' | 'absent' | 'unused' } = {};
    
    gameState.guesses.forEach(guess => {
      const letterStates = getLetterStates(guess);
      letterStates.forEach(({ letter, status }) => {
        if (status === 'correct') {
          keyStates[letter] = 'correct';
        } else if (status === 'present' && keyStates[letter] !== 'correct') {
          keyStates[letter] = 'present';
        } else if (status === 'absent' && !keyStates[letter]) {
          keyStates[letter] = 'absent';
        }
      });
    });

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.split('').map(letter => ({
      key: letter,
      status: keyStates[letter] || 'unused'
    }));
  }, [gameState.guesses, getLetterStates]);

  // Adicionar letra
  const addLetter = (letter: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length >= wordLength) return;

    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess + letter.toUpperCase()
    }));
  };

  // Remover letra
  const removeLetter = () => {
    if (gameState.gameStatus !== 'playing') return;
    
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1)
    }));
  };

  // Submeter palpite
  const submitGuess = async () => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length !== wordLength) {
      showNotification(`Palavra deve ter ${wordLength} letras!`);
      return;
    }

    // Verificar se a palavra existe e obter estados
    const resultado = await api.verificarPalavra(gameState.currentGuess);
    if (!resultado.existe) {
      showNotification('Palavra não encontrada!');
      return;
    }

    const newGuesses = [...gameState.guesses, gameState.currentGuess];
    const isCorrect = resultado.estados.every(estado => estado === 'correct');
    const isGameOver = newGuesses.length >= gameState.maxAttempts;

    let newStatus: 'playing' | 'won' | 'lost' = 'playing';
    if (isCorrect) {
      newStatus = 'won';
      showNotification('🎉 Parabéns! Você acertou!');
    } else if (isGameOver) {
      newStatus = 'lost';
      showNotification(`😔 A palavra era: ${palavraCorreta}`);
    }

    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      currentGuess: '',
      gameStatus: newStatus
    }));
  };

  // Reiniciar jogo
  const restartGame = () => {
    initializeGame();
  };

  return {
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
  };
};