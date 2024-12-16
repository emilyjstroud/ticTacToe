import { useState } from "react";

const TicTacToeBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // Board state
  const [isXNext, setIsXNext] = useState(true); // Tracks player turn

  const handleClick = (index) => {
    if (board[index]) return; // Ignore clicks on filled cells
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 100px)",
        gap: "5px",
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
          }}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default TicTacToeBoard;
