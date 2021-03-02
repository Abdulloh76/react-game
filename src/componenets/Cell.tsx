import React, { useContext } from 'react';
import { ReactComponent as Mine } from '../assets/mine.svg'
import { BoardContext } from './Board';

interface Props {
  data: number;
  x: number;
  y:number;
}

export default function Cell({ data, x, y }:Props) {
  const [trackingArray, cellClick] = useContext(BoardContext)

  const content = (value: number) => {
    if (value === -1) return <Mine />;
    else if(value === 0) return <p></p>
    return <p>{value}</p>;
  };

  const clickHandler = () => {
    if (data === -1) console.log('you clicked the mine');
    cellClick(x, y)
    trackingArray[x][y]=1;
    localStorage.setItem('trackingArray', JSON.stringify(trackingArray))
  }

  return (
    <div className={`board__cell ${Boolean(trackingArray[x][y])?'cell-visited':''}`} onClick={clickHandler}>
      {content(data)}
    </div>
  );
}
