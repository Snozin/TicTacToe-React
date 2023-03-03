import { Square } from './Square'

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Draw' : 'Winner:'

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Replay</button>
        </footer>
      </div>
    </section>
  )
}
