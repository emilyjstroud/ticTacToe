import { useState } from "react";

const ControlPanel = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [logs, setLogs] = useState([]);
  const [playerSymbol, setPlayerSymbol] = useState("X");

  const handleClick = (index) => {
    if (board[index]) return;
    const newBoard = [...board];
    const player = isXNext ? playerSymbol : playerSymbol === "X" ? "O" : "X";
    newBoard[index] = player;
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setLogs([...logs, `${player} moved to cell ${index + 1}`]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setLogs([]);
    setIsXNext(true);
  };

  return (
    <div>
      <div>
        <button onClick={resetGame}>Reset Game</button>
        <select
          value={playerSymbol}
          onChange={(e) => setPlayerSymbol(e.target.value)}
        >
          <option value="X">Play as X</option>
          <option value="O">Play as O</option>
        </select>
      </div>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
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
    </div>
  );
};

export default ControlPanel;
