import React, { FC, useState } from "react";
import "./Table.css";

type Board = Array<Array<string>>;
type Position = { row: number; col: number } | null;

const pieces: Record<string, string> = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙",
};

const initialBoard: Board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const Table: FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState<Position>(null);

  const handleClick = (rowIndex: number, colIndex: number) => {
    const piece = board[rowIndex][colIndex];
    
    if (selectedPiece) {
      const [selectedRow, selectedCol] = [selectedPiece.row, selectedPiece.col];

      if (board[selectedRow][selectedCol] && (selectedRow !== rowIndex || selectedCol !== colIndex)) {
        const updatedBoard = [...board];
        updatedBoard[rowIndex][colIndex] = board[selectedRow][selectedCol];
        updatedBoard[selectedRow][selectedCol] = "";

        setBoard(updatedBoard);
        setSelectedPiece(null);
      }
    } else {
      if (piece) {
        setSelectedPiece({ row: rowIndex, col: colIndex });
      }
    }
  };

  return (
    <table className="chess-board">
      <tbody>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((piece, colIndex) => (
              <td
                key={colIndex}
                className={`chess-square ${((rowIndex + colIndex) % 2 === 0) ? 'white' : 'black'} ${(selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex) ? 'selected' : ''}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {pieces[piece]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
