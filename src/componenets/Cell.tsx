import React, { useState } from 'react';
import { ReactComponent as Mine } from '../assets/mine.svg'

interface Props {
  data: number;
  trackingArray: number[][];
  x: number;
  y:number;
}

export default function Cell({ data, trackingArray, x, y }:Props) {
  let [visible, setVisibility] = useState(Boolean(trackingArray[x][y]))
  
  const content = (value: number) => {
    if (value === -1) return <Mine />;
    else if(value === 0) return <p></p>
    return <p>{value}</p>;
  };

  const clickHandler = () => {
    setVisibility(true)
    trackingArray[x][y] = 1;
  }

  return (
    <div className={`board__cell ${visible?'cell-visited':''}`} onClick={clickHandler}>
      {content(data)}
    </div>
  );
}
