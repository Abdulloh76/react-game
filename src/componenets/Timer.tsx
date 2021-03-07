import React, { useContext } from 'react';
import { GlobalContext, GlobalState } from './GlobalOptions';

export default function Timer() {
  const { timer, setTimer, gameStatus } = useContext(
    GlobalContext
  ) as GlobalState;
  if (timer !== 0 && gameStatus === 'playing')
    setTimeout(() => {
      setTimer();
    }, 1000);
  return <div className='header__timer'>{timer}</div>;
}
