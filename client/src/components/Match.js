import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

function Match() {
    const [allState, setAllState] = useState(
        [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
    )
    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [count, setCount] = useState(0)
    const [isGameOn, setIsGameOn] = useState(true)
    const [whoWon, setWhoWon] = useState('')
    const location = useLocation()

    const startAgain = () => {
        setAllState([
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ])
        setCurrentPlayer(1)
        setCount(0)
        setIsGameOn(true)
        setWhoWon('')
    }

    const showIcon = (row, col) => {
        let temp = allState[row][col]
        switch (temp) {
            case 1:
                return 'X'
            case -1:
                return 'O'
            default: 
                return 
        }
    }

    const handleWinner = () => {
        let total
        for(let i=0; i<3; i++) {
            total = allState[i][0] + allState[i][1] + allState[i][2]
            if(total === 3) return 1
            else if(total === -3) return -1
        }
        for(let i=0; i<3; i++) {
            total = allState[0][i] + allState[1][i] + allState[2][i]
            if(total === 3) return 1
            else if(total === -3) return -1
        }
        total = allState[0][0] + allState[1][1] + allState[2][2]
        if(total === 3) return 1
        else if(total === -3) return -1

        total = allState[0][2] + allState[1][1] + allState[2][0]
        if(total === 3) return 1
        else if(total === -3) return -1

        return 0
    } 

    const handlePress = (row, col) => {
        let temp = allState[row][col]
        if(temp !== 0) return;

        let thisAllState = allState.slice()
        thisAllState[row][col] = currentPlayer
        setAllState(thisAllState)
        setCount(prevState => prevState + 1)

        let nextPlayer = currentPlayer === 1 ? -1 : 1
        setCurrentPlayer(nextPlayer)

        let winner = handleWinner()
        if(winner === 1) {
            if(location.state.computer === true) {
                setWhoWon('You Won')
            } else {
                setWhoWon('Player1 Won')
            }
            setIsGameOn(false)
        } else if(winner === -1) {
            if(location.state.computer === true) {
                setWhoWon('Computer Won')
            } else {
                setWhoWon('Player2 Won')
            }
            setIsGameOn(false)
        } else if(count === 8 && isGameOn === true) {
            alert("match is draw")
        }
    }

    useEffect(() => {
        if(location.state.computer === true && currentPlayer === -1 && count < 8) {
            handleJarvis()
        }
    }, [currentPlayer])

    const handleJarvis = () => {
        let arr = []
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                if(allState[i][j] === 0) {
                    arr.push([i,j])
                }
            }
        }
        let temp = Math.floor(Math.random() * arr.length)
        handlePress(arr[temp][0], arr[temp][1])
    }

    return (
        <div className="match">
            {
                whoWon !== '' && (
                    <div>
                        <h2 style={{marginBottom: '30px'}}>{whoWon}</h2>
                    </div>
                )
            }
            <div>
                <div className="tileContainer">
                    <button className="tile" style={{borderTop: 'none', borderLeft: 'none'}} onClick={() => handlePress(0,0)}>
                        {showIcon(0,0)}
                    </button>
                    <button className="tile" style={{borderTop: 'none'}}   onClick={() => handlePress(0,1)}>
                        {showIcon(0,1)}
                    </button>
                    <button className="tile" style={{borderTop: 'none', borderRight: 'none'}}  onClick={() => handlePress(0,2)}>
                        {showIcon(0,2)}
                    </button>
                </div>
                <div className="tileContainer">
                    <button className="tile" style={{borderLeft: 'none'}}  onClick={() => handlePress(1,0)}>
                        {showIcon(1,0)}
                    </button>
                    <button className="tile"  onClick={() => handlePress(1,1)}>
                        {showIcon(1,1)}
                    </button>
                    <button className="tile" style={{borderRight: 'none'}}  onClick={() => handlePress(1,2)}>
                        {showIcon(1,2)}
                    </button>
                </div>
                <div className="tileContainer">
                    <button className="tile" style={{borderLeft: 'none', borderBottom: 'none'}}  onClick={() => handlePress(2,0)}>
                        {showIcon(2,0)}
                    </button>
                    <button className="tile" style={{borderBottom: 'none'}} onClick={() => handlePress(2,1)}>
                        {showIcon(2,1)}
                    </button>
                    <button className="tile" style={{borderBottom: 'none', borderRight: 'none'}} onClick={() => handlePress(2,2)}>
                        {showIcon(2,2)}
                    </button>
                </div>
            </div>
            <div className='matchBottom'>
                {
                    location.state.computer === true && (
                        <p>You(x)</p>
                    )
                }
                {
                    location.state.computer === false && (
                        <p>Player1(x)</p>
                    )
                }
                <button onClick={() => startAgain()} className="startAgain">
                    Start Again
                </button>
                {
                    location.state.computer === true && (
                        <p>Computer(o)</p>
                    )
                }
                {
                    location.state.computer === false && (
                        <p>Player2(o)</p>
                    )
                }
            </div>
        </div>
    )
}

export default Match
