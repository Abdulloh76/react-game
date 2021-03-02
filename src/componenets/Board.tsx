import React, { useEffect, useState } from 'react';
import generateBoardArray from '../utils/generateBoardArray';
import Cell from './Cell';
import './board.scss';

export const BoardContext = React.createContext<
  [Number[][], (x: number, y: number) => void]
>([[[]], (x: number, y: number) => {}]);

export default function Board() {
  const LSboard = JSON.parse(localStorage.getItem('boardArray') as string);
  const boardArray: number[][] = LSboard || generateBoardArray(9, 9, 10);

  const [trackingArray, setTrackArr] = useState(
    JSON.parse(localStorage.getItem('trackingArray') as string) ||
      Array.from(Array(9), () => Array(9).fill(0))
  );

  const spreading = (x: number, y: number) => {
    if (
      x < 0 ||
      x > trackingArray.length - 1 ||
      y < 0 ||
      y > trackingArray[0].length - 1 ||
      trackingArray[x][y] === 1 ||
      boardArray[x][y] === -1
    )
      return;

    trackingArray[x][y] = 1;
    if (boardArray[x][y] === 0) {
      spreading(x + 1, y);
      spreading(x - 1, y);
      spreading(x, y + 1);
      spreading(x, y - 1);
    }
  };

  const cellClick = (x: number, y: number) => {
    spreading(x, y);
    setTrackArr([...trackingArray]);
  };

  useEffect(() => {
    localStorage.setItem('boardArray', JSON.stringify(boardArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.addEventListener('beforeunload', () => {
    // localStorage.setItem('trackingArray', JSON.stringify(trackingArray))
  });

  return (
    <BoardContext.Provider value={[trackingArray, cellClick]}>
      <div className='board'>
        {boardArray.map((row: number[], i) => (
          <div key={i} className='board__row'>
            {row.map((el: number, j) => (
              <Cell data={el} key={row.length * i + j} x={i} y={j} />
            ))}
          </div>
        ))}
      </div>
    </BoardContext.Provider>
  );
}

// useEffect -> didMount, didUpdate, willUnmount
