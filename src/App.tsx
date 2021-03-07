import React from 'react';
import './App.css';
import './styles/header.scss';
import GlobalProvider from './componenets/GlobalOptions';
import MinesNumber from './componenets/RemainingMines';
import Toggler from './componenets/Toggler';
import NewGame from './componenets/NewGame';
import Settings from './componenets/Settings';
import Timer from './componenets/Timer';
import TopScores from './componenets/TopScores';
import RecordGame from './componenets/RecordGame';
import Board from './componenets/Board';
import './styles/modal.scss';

export default function App() {
  return (
    <GlobalProvider>
      <div className='header'>
        <MinesNumber />
        <Toggler />
        <NewGame />
        <Settings />
        <Timer />
        <TopScores />
        <RecordGame />
      </div>
      <Board />
    </GlobalProvider>
  );
}
