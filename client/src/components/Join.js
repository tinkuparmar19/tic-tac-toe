import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { socket } from '../Context'

function Join() {
    const [code, setCode] = useState("")
    const [userName, setUserName] = useState("")

    const history = useHistory()
    

    const handleClick = () => {
        socket.emit("join-game", {userName, code})
        history.push('/ready')
    }

    return (
        <div className='joinContainer'>
            <h1>create or join game</h1>
            <input type="text" placeholder='user name' onChange={e => setUserName(e.target.value)}/>
            <input type="text" placeholder='code' onChange={e => setCode(e.target.value)}/>
            <button onClick={handleClick}>Join</button>
        </div>
    )
}

export default Join
