import React, { useContext, useEffect } from 'react';
import Cell from './Cell';
import '../styles/board.scss';
import { GlobalContext, GlobalState } from './GlobalOptions';

export interface BoardContextType {
  cellClick: (x: number, y: number) => void;
  minesPositions: { x: number; y: number }[];
}

export const BoardContext = React.createContext<BoardContextType | null>(null);

export default function Board() {
  const { changeGameStatus, trackingArray, changeTrackArr, board } = useContext(
    GlobalContext
  ) as GlobalState;

  const boardArray: number[][] =
    JSON.parse(sessionStorage.getItem('boardArray') as string) || board.arr;
  const minesPositions =
    JSON.parse(sessionStorage.getItem('minesPositions') as string) ||
    board.minesPositions;

  useEffect(() => {
    sessionStorage.setItem('boardArray', JSON.stringify(boardArray));
  }, [boardArray]);

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
    minesPositions.forEach((el: { x: number; y: number }, ind: number) => {
      setTimeout(() => {
        trackingArray[el.x][el.y] = 1;
        changeTrackArr();
      }, ind * 300);
    });
    changeGameStatus('lose');
    setTimeout(() => {
      alert('you lose!');
      sessionStorage.setItem('trackingArray', JSON.stringify(trackingArray));
    }, ((minesPositions.length * (minesPositions.length * 300 + 300)) / 2 + 1) / 4);
  };

  const cellClick = (x: number, y: number) => {
    if (boardArray[x][y] === -1) mineClicked();
    spreading(x, y);
    changeTrackArr();
  };

  useEffect(() => {
    sessionStorage.setItem('boardArray', JSON.stringify(boardArray));
    sessionStorage.setItem('minesPositions', JSON.stringify(minesPositions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BoardContext.Provider value={{ cellClick, minesPositions }}>
      <div className='board'>
        {boardArray.map((row: number[], i: number) => (
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
