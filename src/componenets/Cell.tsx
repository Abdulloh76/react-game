import React, { useContext, useState } from 'react';
import { ReactComponent as Mine } from '../assets/mine.svg';
import { ReactComponent as RedFlag } from '../assets/redflag.svg';
import checkForWon from '../utils/checkForWon';
import { BoardContext, BoardContextType } from './Board';
import { GlobalContext, GlobalState } from './GlobalOptions';

interface Props {
  data: number;
  x: number;
  y: number;
}

export default function Cell({ data, x, y }: Props) {
  const {trackingArray, cellClick, minesPositions} = useContext(BoardContext) as BoardContextType
  const { toggler, remainingMines, setRemainingMines, timer, startTimer } = useContext(GlobalContext) as GlobalState;

  const [flag, setFlag] = useState(Boolean(trackingArray[x][y] === -1));

  const content = (value: number) => {
    if (value === -1) return <Mine />;
    else if (value === 0) return <p></p>;
    return <p>{value}</p>;
  };

  const putFlag = () => (flag ? <RedFlag /> : null);

  const changeFlagStatus = () => {
    setFlag(!flag);
    trackingArray[x][y] = flag ? 0 : -1;
    if (trackingArray[x][y] === 0) setRemainingMines(remainingMines + 1)
    else if (trackingArray[x][y] === -1) setRemainingMines(remainingMines - 1)
    sessionStorage.setItem('trackingArray', JSON.stringify(trackingArray));
    if (remainingMines < 2) {
      console.log('game won', checkForWon(trackingArray, minesPositions))
    }
  }

  const clickHandler = () => {
    if (timer === 0) startTimer()

    if (!toggler) {
      changeFlagStatus()
    } else {
      cellClick(x, y);
      trackingArray[x][y] = 1;
      sessionStorage.setItem('trackingArray', JSON.stringify(trackingArray));
    }
  };

  return (
    <div
      className={`board__cell ${
        Boolean(trackingArray[x][y] === 1) ? 'cell-visited' : ''
      }`}
      onClick={clickHandler}
      onContextMenu={(e) => {
        e.preventDefault()
        changeFlagStatus()
        if (timer === 0) startTimer()
      }}
    >
      {content(data)}
      {putFlag()}
    </div>
  );
}
