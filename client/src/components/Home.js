import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className="homeContainer">
            <div>
                <h1>Tic Tac Toe</h1>
            </div>
            <div className='homeButtonContainer'>
                <Link to="/join">Join Match</Link>
                <Link to="/menu">Start New Match</Link>
            </div>
        </div>
    )
}

export default Home
