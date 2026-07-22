import { describe, expect, it } from 'vitest'
import { checkWinner, createEmptyBoard, dropDisc, isBoardFull, ROWS, COLS } from './useConnect4Game'
import type { Board } from './useConnect4Game'

function boardFromRows(rows: string[]): Board {
  // 'r' = red, 'y' = yellow, '.' = empty. Rows given top-to-bottom.
  return rows.map((row) =>
    row.split('').map((c) => (c === 'r' ? 'red' : c === 'y' ? 'yellow' : null)),
  )
}

describe('dropDisc', () => {
  it('drops into the lowest empty row of a column', () => {
    let board = createEmptyBoard()
    const first = dropDisc(board, 3, 'red')
    expect(first?.row).toBe(ROWS - 1)

    board = first!.board
    const second = dropDisc(board, 3, 'yellow')
    expect(second?.row).toBe(ROWS - 2)
  })

  it('returns null when the column is full', () => {
    let board = createEmptyBoard()
    for (let i = 0; i < ROWS; i++) {
      const result = dropDisc(board, 0, i % 2 === 0 ? 'red' : 'yellow')
      board = result!.board
    }
    expect(dropDisc(board, 0, 'red')).toBeNull()
  })

  it('does not mutate the original board', () => {
    const board = createEmptyBoard()
    dropDisc(board, 2, 'red')
    expect(board[ROWS - 1][2]).toBeNull()
  })
})

describe('checkWinner', () => {
  it('detects a horizontal win', () => {
    const board = boardFromRows([
      '.......',
      '.......',
      '.......',
      '.......',
      '.......',
      '.rrrr..',
    ])
    expect(checkWinner(board)).toBe('red')
  })

  it('detects a vertical win', () => {
    const board = boardFromRows([
      '.......',
      '.......',
      'y......',
      'y......',
      'y......',
      'y......',
    ])
    expect(checkWinner(board)).toBe('yellow')
  })

  it('detects a diagonal down-right win', () => {
    const board = boardFromRows([
      '.......',
      '.r.....',
      '..r....',
      '...r...',
      '....r..',
      '.......',
    ])
    expect(checkWinner(board)).toBe('red')
  })

  it('detects a diagonal down-left win', () => {
    const board = boardFromRows([
      '.......',
      '....y..',
      '...y...',
      '..y....',
      '.y.....',
      '.......',
    ])
    expect(checkWinner(board)).toBe('yellow')
  })

  it('does not report a win for only 3 in a row', () => {
    const board = boardFromRows([
      '.......',
      '.......',
      '.......',
      '.......',
      '.......',
      '.rrr...',
    ])
    expect(checkWinner(board)).toBeNull()
  })

  it('returns null on an empty board', () => {
    expect(checkWinner(createEmptyBoard())).toBeNull()
  })
})

describe('isBoardFull', () => {
  it('is false for an empty board', () => {
    expect(isBoardFull(createEmptyBoard())).toBe(false)
  })

  it('is true when every cell is filled', () => {
    const full = boardFromRows(Array(6).fill('r'.repeat(COLS)))
    expect(isBoardFull(full)).toBe(true)
  })
})
