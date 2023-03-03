import { Square } from './Square'

export function BoardPainter({ board, updateBoard }) {
  return board.map((element, index) => (
    <Square key={index} index={index} updateBoard={updateBoard}>
      {element}
    </Square>
  ))
}
