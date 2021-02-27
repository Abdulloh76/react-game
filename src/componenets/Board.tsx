import React, { useEffect } from 'react';
import generateBoardArray from '../utils/generateBoardArray';
import Cell from './Cell';
import './board.scss';

export default function Board() {
  const LSboard = JSON.parse(localStorage.getItem('boardArray') as string)
  const boardArray: number[][] = LSboard || generateBoardArray(9, 9, 10);
  
  const LStrack = JSON.parse(localStorage.getItem('trackingArray') as string)
  const trackingArray: number[][] = LStrack || Array.from(Array(9), () =>
    Array(9).fill(0)
  );

  useEffect( () => {
    localStorage.setItem('boardArray', JSON.stringify(boardArray))
    console.log("mount")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('trackingArray', JSON.stringify(trackingArray))
  });

  useEffect( () => () => {
    console.log("unmount")
  }, [] );

  return (
    <div className='board'>
      {boardArray.map((row: number[], i) => (
        <div key={i} className='board__row'>
          {row.map((el: number, j) => (
            <Cell
              data={el}
              key={row.length * i + j}
              trackingArray={trackingArray}
              x={i}
              y={j}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// useEffect -> didMount, didUpdate, willUnmount
