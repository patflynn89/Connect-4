<script setup lang="ts">
import ConnectFourBoard from './components/ConnectFourBoard.vue'
import GameStatus from './components/GameStatus.vue'
import { useConnect4Game } from './composables/useConnect4Game'

const { board, currentPlayer, winner, isDraw, isGameOver, dropDisc, reset } = useConnect4Game()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 sm:gap-8 p-4">
    <h1 class="text-3xl sm:text-4xl font-bold">Connect 4</h1>
    <GameStatus
      :current-player="currentPlayer"
      :winner="winner"
      :is-draw="isDraw"
      @reset="reset"
    />
    <ConnectFourBoard :board="board" :disabled="isGameOver" @drop="dropDisc" />
  </div>
</template>
