import React, { useEffect, useState } from 'react'
import { socket } from '../Context';

function ReadyToPlay() {
    const [allState, setAllState] = useState(
        [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ]
    )
    const [currentPlayer, setCurrentPlayer] = useState('')
    const [count, setCount] = useState(0)
    const [isGameOn, setIsGameOn] = useState(true)
    const [players, setPlayers] = useState([])
    const [renderBoard, setRenderBoard] = useState(false)
    const [buttonState, setButtonState] = useState(false)
    const [symbol, setSymbol] = useState('')
    const [whoWon, setWhoWon] = useState('')
    const [control, setControl] = useState(false)

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

    // const useMadeMove = ({row, col}) => {
    //     console.log('current p ', currentPlayer)
    //     let thisAllState = allState.slice()
    //     thisAllState[row][col] = currentPlayer
    //     setAllState(thisAllState)
    //     setCount(prevState => prevState + 1)
    //     let nextPlayer = currentPlayer === 1 ? -1 : 1
    //     setCurrentPlayer(nextPlayer)
    //     let winner = handleWinner()
    //     if(winner === 1) {
    //         setWhoWon(`${players[0].username}(X) Won`)
    //         setIsGameOn(false)
    //     } else if(winner === -1) {
    //         setWhoWon(`${players[0].username}(X) Won`)
    //         setIsGameOn(false)
    //     } else if(count === 8 && isGameOn === true) {
    //         setWhoWon('Match is draw')
    //     }
    // }

    // socket.once('made-move', useMadeMove)
    socket.once('made-move', ({row, col}) => {
        console.log('current p ', currentPlayer)
        let thisAllState = allState.slice()
        thisAllState[row][col] = currentPlayer
        setAllState(thisAllState)
        setCount(prevState => prevState + 1)
        let nextPlayer = currentPlayer === 1 ? -1 : 1
        setCurrentPlayer(nextPlayer)
        let winner = handleWinner()
        if(winner === 1) {
            setWhoWon(`${players[0].username}(X) Won`)
            setIsGameOn(false)
        } else if(winner === -1) {
            setWhoWon(`${players[0].username}(X) Won`)
            setIsGameOn(false)
        } else if(count === 8 && isGameOn === true) {
            setWhoWon('Match is draw')
        }
    })

    const handlePress = (row, col) => {
        if(currentPlayer === symbol) {
            socket.emit('make-move', ({row, col}))
        }
    }

    useEffect(() => {

        socket.on('joined', (message) => {
            console.log(message);
        });

        socket.on('message', (message) => {
            console.log(message);
        });

        setRenderBoard(false)

        const userRoomUsers = ({users}) => {
            if(users.length > 2) {
                alert('more then two users, please make new room')
            }
            if(users.length === 2) {
                setPlayers(users)
                setRenderBoard(true)
                setCurrentPlayer(1)
                if(users[0].id === socket.id) {
                    setSymbol(1)
                }
                if(users[1].id === socket.id) {
                    setSymbol(-1)
                }
            }
        }

        socket.on('roomUsers', userRoomUsers)

        return () => {
            socket.off('roomUsers', userRoomUsers)
        }
    }, [])

    console.log('allstate', allState)
    console.log('sybmol', symbol)
    console.log('current', currentPlayer)


    return (
        <>
            {renderBoard && (
                <div className="match">
                    {
                        whoWon !== '' && (
                            <div>
                                <h2 style={{marginBottom: '30px'}}>{whoWon}</h2>
                            </div>
                        )
                    }
                    <div className="tileContainer">
                        <button className="tile" disabled={buttonState} style={{borderTop: 'none', borderLeft: 'none'}} onClick={() => handlePress(0,0)}>
                            {showIcon(0,0)}
                        </button>
                        <button className="tile" disabled={buttonState} style={{borderTop: 'none'}}   onClick={() => handlePress(0,1)}>
                            {showIcon(0,1)}
                        </button>
                        <button className="tile" disabled={buttonState} style={{borderTop: 'none', borderRight: 'none'}}  onClick={() => handlePress(0,2)}>
                            {showIcon(0,2)}
                        </button>
                    </div>
                    <div className="tileContainer">
                        <button className="tile" disabled={buttonState} style={{borderLeft: 'none'}}  onClick={() => handlePress(1,0)}>
                            {showIcon(1,0)}
                        </button>
                        <button className="tile" disabled={buttonState}  onClick={() => handlePress(1,1)}>
                            {showIcon(1,1)}
                        </button>
                        <button className="tile" disabled={buttonState} style={{borderRight: 'none'}}  onClick={() => handlePress(1,2)}>
                            {showIcon(1,2)}
                        </button>
                    </div>
                    <div className="tileContainer">
                        <button className="tile" disabled={buttonState} style={{borderLeft: 'none', borderBottom: 'none'}}  onClick={() => handlePress(2,0)}>
                            {showIcon(2,0)}
                        </button>
                        <button className="tile" disabled={buttonState} style={{borderBottom: 'none'}} onClick={() => handlePress(2,1)}>
                            {showIcon(2,1)}
                        </button>
                        <button className="tile" disabled={buttonState} style={{borderBottom: 'none', borderRight: 'none'}} onClick={() => handlePress(2,2)}>
                            {showIcon(2,2)}
                        </button>
                    </div>
                    <div className='matchBottom'>
                        <p>{players[0].username}(X)</p>
                        <button onClick={() => startAgain()} className="startAgain">
                            Start Again
                        </button>
                        <p>{players[1].username}(O)</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default ReadyToPlay
