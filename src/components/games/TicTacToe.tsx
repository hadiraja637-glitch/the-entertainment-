import React, { useState } from 'react';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, User, Bot } from 'lucide-react';

type Player = 'X' | 'O';
type Board = (Player | null)[];

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [vsBot, setVsBot] = useState<boolean>(true);
  const [score, setScore] = useState({ X: 0, O: 0, ties: 0 });

  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (currentBoard: Board) => {
    for (const combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a] as Player, line: combo };
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'draw' as const, line: null };
    }
    return null;
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner) return;

    sound.playPop();
    const newBoard = [...board];
    newBoard[idx] = turn;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameOver(result.winner, result.line);
      return;
    }

    const nextTurn = turn === 'X' ? 'O' : 'X';
    setTurn(nextTurn);

    // Bot move if vsBot and next is O
    if (vsBot && nextTurn === 'O') {
      setTimeout(() => {
        makeBotMove(newBoard);
      }, 400);
    }
  };

  const makeBotMove = (currentBoard: Board) => {
    // Check if bot can win or block
    const available = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx): idx is number => idx !== null);

    if (available.length === 0) return;

    // Pick winning move or block move or random
    let chosen = available[0];

    // Simple AI: win check
    for (const idx of available) {
      const testBoard = [...currentBoard];
      testBoard[idx] = 'O';
      if (checkWinner(testBoard)?.winner === 'O') {
        chosen = idx;
        break;
      }
    }

    // Block check
    if (chosen === available[0]) {
      for (const idx of available) {
        const testBoard = [...currentBoard];
        testBoard[idx] = 'X';
        if (checkWinner(testBoard)?.winner === 'X') {
          chosen = idx;
          break;
        }
      }
    }

    // Prefer center if available
    if (currentBoard[4] === null && Math.random() > 0.3) {
      chosen = 4;
    } else if (Math.random() > 0.4) {
      // Pick random available
      chosen = available[Math.floor(Math.random() * available.length)];
    }

    sound.playBlip(320);
    const updatedBoard = [...currentBoard];
    updatedBoard[chosen] = 'O';
    setBoard(updatedBoard);

    const result = checkWinner(updatedBoard);
    if (result) {
      handleGameOver(result.winner, result.line);
    } else {
      setTurn('X');
    }
  };

  const handleGameOver = (resWinner: Player | 'draw', line: number[] | null) => {
    setWinner(resWinner);
    setWinningLine(line);

    if (resWinner === 'draw') {
      sound.playBlip(300);
      setScore(s => ({ ...s, ties: s.ties + 1 }));
    } else {
      sound.playSuccess();
      setScore(s => ({ ...s, [resWinner]: s[resWinner] + 1 }));
      if (resWinner === 'X' || !vsBot) {
        confetti({ particleCount: 50, spread: 60 });
      }
    }
  };

  const resetGame = () => {
    sound.playBlip();
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="bg-[#121829] border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">❌</span>
          <h3 className="font-bold text-lg text-slate-100">Tic-Tac-Toe</h3>
        </div>

        {/* Mode switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setVsBot(!vsBot);
              resetGame();
            }}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              vsBot
                ? 'bg-purple-900/30 border-purple-500/40 text-purple-300'
                : 'bg-indigo-900/30 border-indigo-500/40 text-indigo-300'
            }`}
          >
            {vsBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            <span>{vsBot ? 'vs Bot' : '2 Players'}</span>
          </button>
          <button
            onClick={resetGame}
            title="Reset Board"
            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Turn or Winner announcement */}
      <div className="mb-4 text-sm font-semibold">
        {winner === 'draw' ? (
          <span className="text-amber-300">It's a Draw! 🤝</span>
        ) : winner ? (
          <span className="text-emerald-400">Player {winner} Wins! 🎉</span>
        ) : (
          <span className="text-slate-300">
            Current turn: <span className={turn === 'X' ? 'text-pink-400 font-bold' : 'text-cyan-400 font-bold'}>{turn}</span>
          </span>
        )}
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto my-2">
        {board.map((cell, idx) => {
          const isWinCell = winningLine?.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              disabled={!!cell || !!winner}
              className={`w-20 h-20 sm:w-22 sm:h-22 rounded-xl text-3xl font-black flex items-center justify-center transition-all cursor-pointer border ${
                isWinCell
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 animate-pulse'
                  : cell
                  ? 'bg-slate-900/80 border-slate-700'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800 hover:border-slate-600'
              } ${cell === 'X' ? 'text-pink-400' : 'text-cyan-400'}`}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Score */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-center gap-6 text-xs text-slate-400 font-mono">
        <span>X Wins: <strong className="text-pink-400">{score.X}</strong></span>
        <span>O Wins: <strong className="text-cyan-400">{score.O}</strong></span>
        <span>Draws: <strong className="text-amber-300">{score.ties}</strong></span>
      </div>
    </div>
  );
};
