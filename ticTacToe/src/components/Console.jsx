import { useState } from "react";

const Console = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [logs, setLogs] = useState([]); // Logs state

  const handleClick = (index) => {
    if (board[index]) return;
    const newBoard = [...board];
    const player = isXNext ? "X" : "O";
    newBoard[index] = player;
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setLogs([...logs, `${player} moved to cell ${index + 1}`]); // Log move
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
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
      </div>
      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
          width: "200px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        <h3>Console Logs:</h3>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default Console;
