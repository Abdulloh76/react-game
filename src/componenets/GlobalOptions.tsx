import React, { useState } from 'react';

export const GlobalContext = React.createContext<GlobalState | null>(null)

export interface GlobalState {
  modalShow: boolean
  setModalShow: (param: boolean) => void
  remainingMines: number
  setRemainingMines: (param: number) => void
  toggler: boolean
  changeToggler: (param: boolean) => void
  timer: number
  startTimer: () => void
  difficulty: number[]
  changeDifficulty: (param: string) => void
  boardTheme: string
  setTheme: (param: string) => void
  startClick: boolean
  triggerStartClickOption: (param: boolean) => void
}

interface Props {
  children: JSX.Element[];
}

export default function GlobalProvider({ children }: Props) {
  const [modalShow, setModal] = useState(false)
  const remMines = JSON.parse(sessionStorage.getItem('mines') as string) || 40;
  const [remainingMines, setMinesNumber] = useState(remMines)
  const [toggler, setToggler] = useState(true) // true->mine, false->flag
  const passed = JSON.parse(sessionStorage.getItem('timer') as string) || 0;
  const [timer, setRunTimer] = useState(passed)

  // game options
  const [difficulty, setDifficulty] = useState([16,16,40])
  const [boardTheme, setBoardTheme] = useState('grey')
  const [startClick, setStartClick] = useState(false)

  const setModalShow = (vis: boolean) => setModal(vis)
  const setRemainingMines = (mines: number) => {
    setMinesNumber(mines)
    sessionStorage.setItem('mines', JSON.stringify(mines))
  }
  const changeToggler = (toggle: boolean) => setToggler(toggle)
  const startTimer = () => {
    setRunTimer(timer + 1)
    sessionStorage.setItem('timer', JSON.stringify(timer))
  }
  const changeDifficulty = (diff: string) => {
    // 10,10,9; 16,16,40; 24,24,99
    switch(diff) {
      case 'easy': setDifficulty([9,9,10]); break;
      case 'intermediate': setDifficulty([16,16,40]); break;
      case 'advanced': setDifficulty([24,24,99]); break;
    }
  }
  const setTheme = (theme: string) => setBoardTheme(theme)
  const triggerStartClickOption = (trigger: boolean) => setStartClick(trigger);

  return (
    <GlobalContext.Provider value={{
      modalShow,
      setModalShow,
      remainingMines,
      setRemainingMines,
      toggler,
      changeToggler,
      timer,
      startTimer,
      difficulty,
      changeDifficulty,
      boardTheme,
      setTheme,
      startClick,
      triggerStartClickOption
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
