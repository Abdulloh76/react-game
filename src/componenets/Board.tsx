import React, { useContext, useEffect, useState } from 'react';
import generateBoardArray from '../utils/generateBoardArray';
import Cell from './Cell';
import '../styles/board.scss';
import { GlobalContext, GlobalState } from './GlobalOptions';

export interface BoardContextType {
  trackingArray: number[][];
  cellClick: (x: number, y: number) => void;
  minesPositions: { x: number, y: number }[];
}

export const BoardContext = React.createContext<BoardContextType | null>(null);

export default function Board() {
  const { difficulty, changeGameStatus } = useContext(GlobalContext) as GlobalState

  let { arr, minesPositions } = generateBoardArray(difficulty)
  
  const boardArray: number[][] = JSON.parse(sessionStorage.getItem('boardArray') as string) || arr;
  minesPositions = JSON.parse(sessionStorage.getItem('minesPositions') as string) || minesPositions

  const [trackingArray, setTrackArr] = useState(
    JSON.parse(sessionStorage.getItem('trackingArray') as string) ||
      Array.from(Array(difficulty[0]), () => Array(difficulty[1]).fill(0))
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

  const mineClicked = () => {
    minesPositions.forEach((el, ind) => {
      setTimeout(() => {
        trackingArray[el.x][el.y] = 1
        setTrackArr([...trackingArray])
      }, ind * 300);
    })
    changeGameStatus('lose');
    setTimeout(() => {
      sessionStorage.setItem('trackingArray', JSON.stringify(trackingArray))
    }, minesPositions.length * (minesPositions.length * 300 + 300) / 2 + 1);
  }

  const cellClick = (x: number, y: number) => {
    if (boardArray[x][y] === -1) mineClicked()
    spreading(x, y);
    setTrackArr([...trackingArray]);
  };

  useEffect(() => {
    sessionStorage.setItem('boardArray', JSON.stringify(boardArray));
    sessionStorage.setItem('minesPositions', JSON.stringify(minesPositions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.addEventListener('beforeunload', () => {
    // sessionStorage.setItem('trackingArray', JSON.stringify(trackingArray))
  });

  return (
    <BoardContext.Provider value={{trackingArray, cellClick, minesPositions}}>
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
