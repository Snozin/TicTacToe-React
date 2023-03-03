import { useState } from 'react'
import { TURNS } from './constants'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { BoardPainter } from './components/BoardPainter'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { saveGameToStorage, resetSavedGame } from './logic/saveGame'
import confetti from 'canvas-confetti'
import './App.css'

function App() {
  const [board, setBoard] = useState(() => {
    const savedBoard = window.localStorage.getItem('board')
    return savedBoard ? JSON.parse(savedBoard) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const savedTurn = window.localStorage.getItem('turn')
    return savedTurn ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    //Impedir actualizar la posición del tablero si ya tiene algo previamente
    if (board[index] || winner) return

    // Actualizar los movimientos de los jugadores en el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Actualizar los turnos de cada jugador para mostrarlos en la UI
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    saveGameToStorage({ board: newBoard, turn: newTurn })
    // Comprobar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      return setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetSavedGame()
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        <BoardPainter board={board} updateBoard={updateBoard} />
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <button onClick={resetGame}>Replay</button>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
