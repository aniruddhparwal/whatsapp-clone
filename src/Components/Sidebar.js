import React from 'react'
import { Chat, DonutLarge, MoreVert } from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__left">
                    <Avatar />
                </div>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
