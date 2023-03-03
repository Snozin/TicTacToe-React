export const saveGameToStorage = ({ turn, board }) => {
  // Guardar partida
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const resetSavedGame = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
