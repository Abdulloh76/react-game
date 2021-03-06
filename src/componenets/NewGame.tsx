import React, { useContext } from 'react'
import { ReactComponent as PlayingIcon } from '../assets/playing.svg'
import { ReactComponent as WonIcon } from '../assets/won.svg'
import { ReactComponent as LoseIcon } from '../assets/lose.svg'
import { GlobalContext, GlobalState } from './GlobalOptions'

export default function NewGame() {
  const { gameStatus } = useContext(GlobalContext) as GlobalState

  const chooseIcon = () => {
    switch (gameStatus) {
      case 'won': return <WonIcon />
      case 'lose': return <LoseIcon />
      case 'waiting': case 'paused': case 'playing': return <PlayingIcon />
    }
  }

  return (
    <div className="header__new-game">
      {chooseIcon()}
    </div>
  )
}