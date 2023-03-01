import { useState } from 'react'
import './App.css'
import { Square } from './Square'

const TURNS = {
  X: 'x',
  O: 'o',
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    // Comprobar las combinaciones ganadoras para ver si hay ganador
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // si no hay ganador
    return null
  }

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

    // Comprobar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) setWinner(newWinner)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Choy un tres en raya</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className='text'>
            <h2>{winner === false ? 'Empate' : 'Ganador:'}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Reiniciar</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
