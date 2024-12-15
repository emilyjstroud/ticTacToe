import { useState, useEffect } from "react";

// Minimax algorithm to find the best move for the AI
const minimax = (board, depth, isMaximizing, playerSymbol, aiSymbol) => {
  const winner = calculateWinner(board);
  if (winner === aiSymbol) return 10 - depth; // AI wins
  if (winner === playerSymbol) return depth - 10; // Player wins
  if (board.every((cell) => cell !== null)) return 0; // Draw

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = aiSymbol;
        best = Math.max(
          best,
          minimax(board, depth + 1, false, playerSymbol, aiSymbol)
        );
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = playerSymbol;
        best = Math.min(
          best,
          minimax(board, depth + 1, true, playerSymbol, aiSymbol)
        );
        board[i] = null;
      }
    }
    return best;
  }
};

// Function to calculate the winner
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 'X' or 'O'
    }
  }
  return null;
};

const AiPlayer = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Board state
  const [isXNext, setIsXNext] = useState(true); // Tracks player turn
  const [playerSymbol, setPlayerSymbol] = useState("X"); // Player symbol
  const aiSymbol = playerSymbol === "X" ? "O" : "X"; // AI symbol

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return; // Ignore clicks on filled cells or if game is over
    const newBoard = [...board];
    newBoard[index] = isXNext ? playerSymbol : aiSymbol;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // AI makes its move automatically after player move
  useEffect(() => {
    if (!isXNext && !calculateWinner(board)) {
      const bestMove = findBestMove(board, aiSymbol);
      handleClick(bestMove); // AI places its move
      setIsXNext(true); // Toggle turn back to player
    }
  }, [isXNext, board]);

  const findBestMove = (board, aiSymbol) => {
    let bestVal = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = aiSymbol;
        const moveVal = minimax(board, 0, false, playerSymbol, aiSymbol);
        board[i] = null;
        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true); // Reset turn to player
  };

  return (
    <div>
      <div>
        {/* <button onClick={resetGame}>Reset Game</button> */}
        <select
          value={playerSymbol}
          onChange={(e) => setPlayerSymbol(e.target.value)}
        >
          <option value="X">Play as X</option>
          <option value="O">Play as O</option>
        </select>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          marginTop: "20px",
        }}
      >
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <br></br>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default AiPlayer;
