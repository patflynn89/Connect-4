import { computed, reactive, ref } from 'vue'

export const ROWS = 6
export const COLS = 7

export type Player = 'red' | 'yellow'
export type Cell = Player | null
export type Board = Cell[][]

export function createEmptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(null))
}

export function dropDisc(
  board: Board,
  col: number,
  player: Player,
): { board: Board; row: number } | null {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) {
      const nextBoard = board.map((r) => r.slice())
      nextBoard[row][col] = player
      return { board: nextBoard, row }
    }
  }
  return null
}

const DIRECTIONS: Array<[number, number]> = [
  [0, 1], // horizontal
  [1, 0], // vertical
  [1, 1], // diagonal down-right
  [1, -1], // diagonal down-left
]

export function checkWinner(board: Board): Player | null {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const player = board[row][col]
      if (!player) continue

      for (const [dRow, dCol] of DIRECTIONS) {
        let count = 1
        for (let step = 1; step < 4; step++) {
          const r = row + dRow * step
          const c = col + dCol * step
          if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player) {
            break
          }
          count++
        }
        if (count >= 4) return player
      }
    }
  }
  return null
}

export function isBoardFull(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== null))
}

export function useConnect4Game() {
  const board = reactive<Board>(createEmptyBoard())
  const currentPlayer = ref<Player>('red')
  const winner = ref<Player | null>(null)

  const isDraw = computed(() => !winner.value && isBoardFull(board))
  const isGameOver = computed(() => winner.value !== null || isDraw.value)

  function dropDiscAt(col: number) {
    if (isGameOver.value) return

    const result = dropDisc(board, col, currentPlayer.value)
    if (!result) return // column full

    board[result.row] = result.board[result.row]

    winner.value = checkWinner(board)
    if (!winner.value) {
      currentPlayer.value = currentPlayer.value === 'red' ? 'yellow' : 'red'
    }
  }

  function reset() {
    const empty = createEmptyBoard()
    empty.forEach((row, i) => {
      board[i] = row
    })
    currentPlayer.value = 'red'
    winner.value = null
  }

  return {
    board,
    currentPlayer,
    winner,
    isDraw,
    isGameOver,
    dropDisc: dropDiscAt,
    reset,
  }
}
