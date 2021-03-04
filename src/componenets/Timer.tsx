import React, { useContext } from 'react';
import { GlobalContext, GlobalState } from './GlobalOptions';

export default function Timer() {
  const { timer, startTimer } = useContext(GlobalContext) as GlobalState
  if (timer !== 0) setTimeout(() => {
    startTimer()
  }, 1000);
  return <div className='header__timer'>{timer}</div>;
}
