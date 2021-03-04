import React, { useContext } from 'react'
import { GlobalContext, GlobalState } from './GlobalOptions'

export default function RemainingMines(): JSX.Element {
  const { remainingMines } = useContext(GlobalContext) as GlobalState
  return (
    <div className="header__mines-number">
      {remainingMines}
    </div>
  )
}