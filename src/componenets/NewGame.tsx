import React, { useContext } from 'react'
import { ReactComponent as PlayingIcon } from '../assets/playing.svg'
import { ReactComponent as WonIcon } from '../assets/won.svg'
import { ReactComponent as LoseIcon } from '../assets/lose.svg'
import { GlobalContext, GlobalState } from './GlobalOptions'

export default function NewGame() {
  const { gameStatus, changeGameStatus, setTimer, changeDifficulty, changeTrackArr, newBoard } = useContext(GlobalContext) as GlobalState

  const clickHandler = () => {
    sessionStorage.clear()
    changeGameStatus('waiting')
    setTimer(0)
    changeDifficulty('easy')
    changeTrackArr(true)
    newBoard();
    // sessionStorage.setItem('trackingArray', )
  }

  const chooseIcon = () => {
    switch (gameStatus) {
      case 'won': return <WonIcon />
      case 'lose': return <LoseIcon />
      case 'waiting': case 'paused': case 'playing': return <PlayingIcon />
    }
  }

  return (
    <div className="header__new-game" onClick={clickHandler}>
      {chooseIcon()}
    </div>
  )
}