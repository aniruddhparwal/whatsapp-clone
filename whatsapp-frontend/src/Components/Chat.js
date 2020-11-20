import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Message, Mic, MoreVert, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons'
import React from 'react'
import { useState } from 'react'
import axios from './../axios'

function Chat({ messages }) {
    const [input, setInput] = useState(' ')

    const sendMessage = async (e) => {
        console.log("yes")
        e.preventDefault();

        await axios.post('/messages/new', {
            "message": input,
            "name": "Demo app",
            "timestamp": "demo",
            "recieved": true,
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last Seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">

                {messages.map((message) => (
                    <p className={`chat__message ${message.recieved && "chat__reciever"}`}>
                        <span className="chat__name">
                            {Message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}



                {/* // <p className=" chat__message">
                //     <span className="chat__name">
                //         ANi
                //     </span>
                //     mess
                //     <span className="chat__timestamp">
                //         {new Date().toUTCString()}
                //     </span>
                // </p> */}

            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input}
                        onChange={e => { setInput(e.target.value) }}
                        placeholder="Type a message"
                        type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
