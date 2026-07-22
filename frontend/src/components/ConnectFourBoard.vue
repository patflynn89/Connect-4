<script setup lang="ts">
import type { Board } from '../composables/useConnect4Game'

defineProps<{
  board: Board
  disabled: boolean
}>()

const emit = defineEmits<{
  drop: [col: number]
}>()
</script>

<template>
  <div class="inline-grid grid-cols-7 gap-1 sm:gap-2 rounded-xl bg-blue-800 p-1 sm:p-2 shadow-lg">
    <button
      v-for="(_, col) in board[0]"
      :key="`col-${col}`"
      type="button"
      class="col-span-1 flex flex-col items-center gap-1 sm:gap-2 disabled:cursor-not-allowed"
      :disabled="disabled"
      @click="emit('drop', col)"
    >
      <span
        v-for="(row, rowIndex) in board.map((r) => r[col])"
        :key="`cell-${rowIndex}-${col}`"
        class="aspect-square w-8 sm:w-12 rounded-full transition-colors"
        :class="{
          'bg-white/90': row === null,
          'bg-red-500': row === 'red',
          'bg-yellow-400': row === 'yellow',
        }"
      />
    </button>
  </div>
</template>
