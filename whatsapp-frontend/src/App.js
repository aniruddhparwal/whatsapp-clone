import React, { useEffect, useState } from 'react';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import './CSS/style.css';
import Pusher from 'pusher-js'
import axios from './axios'

function App() {

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync').then((response) => {
      // console.log(response.data)
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('d45741b1df1b18ebfa8c', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe()
    }
  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
