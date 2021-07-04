import React from 'react'
import { Link, useHistory } from 'react-router-dom'

function Menu() {
    const history = useHistory()

    const handleClick = () => {
        history.push({pathname: "/match", state: {computer: true}})
    }

    const handleClickComputer = () => {
        history.push({pathname: "/match", state: {computer: false}})
    }

    return (
        <div className='menuContainer'>
            <div>
                <h1>Play</h1>
                <h1>With</h1>
            </div>
            <div className='menuButtonContainer'>
                <button onClick={handleClickComputer}>Player</button>
                <button onClick={handleClick}>Computer</button>
            </div>
        </div>
    )
}

export default Menu
