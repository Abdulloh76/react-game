import React, { useState } from 'react';
import generateBoardArray from '../utils/generateBoardArray';

export const GlobalContext = React.createContext<GlobalState | null>(null);

export interface GlobalState {
  modalShow: boolean;
  setModalShow: (param: boolean) => void;
  remainingMines: number;
  setRemainingMines: (param: number) => void;
  toggler: boolean;
  changeToggler: (param: boolean) => void;
  timer: number;
  setTimer: (time?: number) => void;
  difficulty: number[];
  changeDifficulty: (param: string) => void;
  boardTheme: string;
  setTheme: (param: string) => void;
  startClick: boolean;
  triggerStartClickOption: (param: boolean) => void;
  gameStatus: string;
  changeGameStatus: (param: string) => void;
  trackingArray: number[][];
  changeTrackArr: (clear?: boolean) => void;
  board: { arr: number[][]; minesPositions: { x: number; y: number }[] };
  newBoard: () => void;
}

interface Props {
  children: JSX.Element[];
}

export default function GlobalProvider({ children }: Props) {
  const [modalShow, setModal] = useState(false);
  const remMines = JSON.parse(sessionStorage.getItem('mines') as string) || 10;
  const [remainingMines, setMinesNumber] = useState(remMines);
  const [toggler, setToggler] = useState(true); // true->mine, false->flag
  const passed = JSON.parse(sessionStorage.getItem('timer') as string) || 0;
  const [timer, setRunTimer] = useState(passed);
  sessionStorage.setItem('timer', JSON.stringify(timer));

  const [gameStatus, setGameStatus] = useState(
    JSON.parse(sessionStorage.getItem('gameStatus') as string) || 'waiting'
  );
  // waiting, playing, paused, won, lose
  sessionStorage.setItem('gameStatus', JSON.stringify(gameStatus));

  // game options
  const [difficulty, setDifficulty] = useState([9, 9, 10]);
  const [boardTheme, setBoardTheme] = useState('grey');
  const [startClick, setStartClick] = useState(false);

  const [trackingArray, setTrackArr] = useState(
    JSON.parse(sessionStorage.getItem('trackingArray') as string) ||
      Array.from(Array(difficulty[0]), () => Array(difficulty[1]).fill(0))
  );

  const changeTrackArr = (clear?: boolean) => {
    if (clear)
      setTrackArr(
        Array.from(Array(difficulty[0]), () => Array(difficulty[1]).fill(0))
      );
    else setTrackArr([...trackingArray]);
  };

  const [board, setBoard] = useState(generateBoardArray(difficulty));

  const newBoard = () => setBoard(generateBoardArray(difficulty));

  const setModalShow = (vis: boolean) => setModal(vis);
  const setRemainingMines = (mines: number) => {
    setMinesNumber(mines);
    sessionStorage.setItem('mines', JSON.stringify(mines));
  };
  const changeToggler = (toggle: boolean) => setToggler(toggle);
  const setTimer = (time?: number) => {
    if (time !== undefined) {
      setRunTimer(time);
      setTimeout(() => {
        setRunTimer(time);
        sessionStorage.setItem('timer', JSON.stringify(time));
      }, 1000);
    } else {
      setRunTimer(timer + 1);
      sessionStorage.setItem('timer', JSON.stringify(timer));
    }
  };
  const changeDifficulty = (diff: string) => {
    // 10,10,9; 16,16,40; 24,24,99
    switch (diff) {
      case 'easy':
        setDifficulty([9, 9, 10]);
        break;
      case 'intermediate':
        setDifficulty([16, 16, 40]);
        break;
      case 'advanced':
        setDifficulty([24, 24, 99]);
        break;
    }
  };
  const setTheme = (theme: string) => setBoardTheme(theme);
  const triggerStartClickOption = (trigger: boolean) => setStartClick(trigger);

  const changeGameStatus = (status: string) => setGameStatus(status);

  return (
    <GlobalContext.Provider
      value={{
        modalShow,
        setModalShow,
        remainingMines,
        setRemainingMines,
        toggler,
        changeToggler,
        timer,
        setTimer,
        difficulty,
        changeDifficulty,
        boardTheme,
        setTheme,
        startClick,
        triggerStartClickOption,
        gameStatus,
        changeGameStatus,
        trackingArray,
        changeTrackArr,
        board,
        newBoard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
