import React from 'react';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import './CSS/style.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
