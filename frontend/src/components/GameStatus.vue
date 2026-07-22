<script setup lang="ts">
import type { Player } from '../composables/useConnect4Game'

defineProps<{
  currentPlayer: Player
  winner: Player | null
  isDraw: boolean
}>()

const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-3 sm:gap-4">
    <p class="text-xl sm:text-2xl font-semibold">
      <template v-if="winner">
        <span :class="winner === 'red' ? 'text-red-500' : 'text-yellow-500'">
          {{ winner === 'red' ? 'Red' : 'Yellow' }}
        </span>
        wins!
      </template>
      <template v-else-if="isDraw"> It's a draw! </template>
      <template v-else>
        <span :class="currentPlayer === 'red' ? 'text-red-500' : 'text-yellow-500'">
          {{ currentPlayer === 'red' ? 'Red' : 'Yellow' }}
        </span>
        's turn
      </template>
    </p>
    <button
      type="button"
      class="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-600 transition-colors"
      @click="emit('reset')"
    >
      Reset game
    </button>
  </div>
</template>
