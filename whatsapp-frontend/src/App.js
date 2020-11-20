import React, { useEffect } from 'react';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import './CSS/style.css';
import Pusher from 'pusher-js'

function App() {

  useEffect(() => {
    var pusher = new Pusher('d45741b1df1b18ebfa8c', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      alert(JSON.stringify(data));
    });
  }, [])

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
