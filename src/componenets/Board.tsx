import React from 'react';
import generateBoardArray from '../utils/generateBoardArray';
import Cell from './Cell';
import './board.scss'

export default function Board() {
  const array: number[][] = generateBoardArray(9, 9, 10);
  return (
    <div className="board">
      {
         array.map((row: number[], ind) => (
           <div key={ind} className="board__row">
              {
                row.map((el:number, index) => <Cell data={el} key={row.length * ind + index} />)
              }
           </div>
         ))
        }
    </div>
  );
}
