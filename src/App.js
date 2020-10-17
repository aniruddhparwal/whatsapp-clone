import React from 'react';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import './CSS/style.css';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
