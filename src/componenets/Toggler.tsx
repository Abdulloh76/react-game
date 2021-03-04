import React, { useContext } from 'react'
import { ReactComponent as Mine } from '../assets/mine.svg'
import { ReactComponent as RedFlag } from '../assets/redflag.svg'
import { GlobalContext, GlobalState } from './GlobalOptions'

export default function Toggler() {
  const { toggler, changeToggler } = useContext(GlobalContext) as GlobalState
  // true->mine, false->flag
  const component = () => toggler ? <Mine /> : <RedFlag />
  return (
    <div className="header__toggler" onClick={() => changeToggler(!toggler)}>
      {component()}
    </div>
  )
}