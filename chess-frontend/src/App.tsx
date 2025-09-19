import React, { useState, useCallback, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import './App.css';

interface CapturedPieces {
  white: string[];
  black: string[];
}

function App() {
  const [game, setGame] = useState(new Chess());
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [capturedPieces, setCapturedPieces] = useState<CapturedPieces>({
    white: [],
    black: []
  });
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const gameRef = useRef(game);

  // Atualiza a referência do jogo sempre que o estado muda
  gameRef.current = game;

  const pieceSymbols: { [key: string]: string } = {
    'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
  };

  const onDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    const gameCopy = new Chess(gameRef.current.fen());
    
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Sempre promove para rainha por simplicidade
      });

      if (move) {
        // Atualiza peças capturadas
        if (move.captured) {
          const capturedSymbol = pieceSymbols[move.captured] || move.captured;
          setCapturedPieces(prev => ({
            ...prev,
            [move.color === 'w' ? 'white' : 'black']: [
              ...prev[move.color === 'w' ? 'white' : 'black'],
              capturedSymbol
            ]
          }));
        }

        // Atualiza histórico de movimentos
        setMoveHistory(prev => [...prev, move.san]);

        setGame(gameCopy);
        setGamePosition(gameCopy.fen());
        return true;
      }
    } catch (error) {
      console.log('Movimento inválido:', error);
    }
    
    return false;
  }, []);

  const resetGame = useCallback(() => {
    // Criar uma nova instância do jogo
    const newGame = new Chess();
    
    // Atualizar todos os estados em uma sequência clara
    setGame(newGame);
    setGamePosition(newGame.fen());
    setCapturedPieces({ white: [], black: [] });
    setMoveHistory([]);
    
    // Garantir que a referência também seja atualizada
    gameRef.current = newGame;
    
    console.log("Jogo reiniciado"); // Para debug
  }, []);

  const undoMove = useCallback(() => {
    const gameCopy = new Chess();
    const history = game.history();
    
    if (history.length > 0) {
      // Reconstrói o jogo sem o último movimento
      for (let i = 0; i < history.length - 1; i++) {
        gameCopy.move(history[i]);
      }
      
      // Reconstrói as peças capturadas
      const newCaptured: CapturedPieces = { white: [], black: [] };
      const moves = gameCopy.history({ verbose: true });
      
      moves.forEach(move => {
        if (move.captured) {
          const capturedSymbol = pieceSymbols[move.captured] || move.captured;
          newCaptured[move.color === 'w' ? 'white' : 'black'].push(capturedSymbol);
        }
      });

      setGame(gameCopy);
      setGamePosition(gameCopy.fen());
      setCapturedPieces(newCaptured);
      setMoveHistory(gameCopy.history());
    }
  }, [game, pieceSymbols]);

  const getGameStatus = () => {
    if (game.isCheckmate()) {
      return {
        text: `Xeque-mate! ${game.turn() === 'w' ? 'Pretas' : 'Brancas'} vencem!`,
        className: 'checkmate'
      };
    }
    
    if (game.isDraw()) {
      return {
        text: 'Empate!',
        className: 'checkmate'
      };
    }
    
    if (game.isCheck()) {
      return {
        text: `Xeque! Vez das ${game.turn() === 'w' ? 'Brancas' : 'Pretas'}`,
        className: 'check'
      };
    }
    
    return {
      text: `Vez das ${game.turn() === 'w' ? 'Brancas' : 'Pretas'}`,
      className: game.turn() === 'w' ? 'white-turn' : 'black-turn'
    };
  };

  const formatMoveHistory = () => {
    const moves = [];
    for (let i = 0; i < moveHistory.length; i += 2) {
      const moveNumber = Math.floor(i / 2) + 1;
      const whiteMove = moveHistory[i];
      const blackMove = moveHistory[i + 1] || '';
      moves.push(`${moveNumber}. ${whiteMove} ${blackMove}`);
    }
    return moves.join('\n');
  };

  const gameStatus = getGameStatus();

  return (
    <div className="app">
      <h1>Jogo de Xadrez</h1>
      
      <div className="chess-container">
        <div className="chessboard-wrapper">
          <Chessboard
            position={gamePosition}
            onPieceDrop={onDrop}
            boardOrientation="white"
            customBoardStyle={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
            customDarkSquareStyle={{ backgroundColor: '#b58863' }}
            customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
          />
        </div>

        <div className="game-info">
          <div className={`game-status ${gameStatus.className}`}>
            {gameStatus.text}
          </div>

          <div className="captured-pieces">
            <h3>Peças Capturadas pelas Brancas</h3>
            <div className="captured-list">
              {capturedPieces.white.map((piece, index) => (
                <span key={index} className="captured-piece">{piece}</span>
              ))}
            </div>
          </div>

          <div className="captured-pieces">
            <h3>Peças Capturadas pelas Pretas</h3>
            <div className="captured-list">
              {capturedPieces.black.map((piece, index) => (
                <span key={index} className="captured-piece">{piece}</span>
              ))}
            </div>
          </div>

          <div className="move-history">
            <h3>Histórico de Movimentos</h3>
            <div className="move-list">
              <pre>{formatMoveHistory()}</pre>
            </div>
          </div>

          <div className="controls">
            <button 
              className="btn btn-secondary" 
              onClick={(e) => {
                e.preventDefault();
                undoMove();
              }}
              disabled={moveHistory.length === 0}
              type="button"
            >
              Desfazer Movimento
            </button>
            <button 
              className="btn btn-primary" 
              onClick={(e) => {
                e.preventDefault();
                resetGame();
              }}
              type="button"
            >
              Novo Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
