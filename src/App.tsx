import React from 'react';
import './App.css';
import GlobalProvider from './componenets/GlobalOptions'
import MinesNumber from './componenets/RemainingMines'
import Toggler from './componenets/Toggler'
import NewGame from './componenets/NewGame'
import Settings from './componenets/Settings'
import Timer from './componenets/Timer'
import Board from './componenets/Board'
import './styles/header.scss'
import TopScores from './componenets/TopScores';

export default function App() {

  return (
    <GlobalProvider>
      <div className="header">
        <MinesNumber />
        <Toggler />
        <NewGame />
        <Settings />
        <Timer isStarted={true} />
        <TopScores />
      </div>
      <Board />
    </GlobalProvider>
  );
}
