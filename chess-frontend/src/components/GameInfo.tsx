import React from 'react';

interface GameInfoProps {
  gameStatus: {
    text: string;
    className: string;
  };
  capturedPieces: {
    white: string[];
    black: string[];
  };
  moveHistory: string[];
  onUndoMove: () => void;
  onResetGame: () => void;
  canUndo: boolean;
}

const GameInfo: React.FC<GameInfoProps> = ({
  gameStatus,
  capturedPieces,
  moveHistory,
  onUndoMove,
  onResetGame,
  canUndo
}) => {
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

  return (
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
          onClick={onUndoMove}
          disabled={!canUndo}
        >
          Desfazer Movimento
        </button>
        <button 
          className="btn btn-primary" 
          onClick={onResetGame}
        >
          Novo Jogo
        </button>
      </div>
    </div>
  );
};

export default GameInfo;
