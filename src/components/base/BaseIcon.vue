<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon: string
    size?: number
    iconSize?: number
  }>(),
  {
    size: 6,
    iconSize: 24,
  },
)

const spanClass = computed<string>(
  () => `inline-flex justify-center items-center h-${props.size} w-${props.size}`,
)
</script>

<template>
  <span :class="spanClass">
    <svg :width="iconSize" :height="iconSize" class="inline-block">
      <path fill="currentColor" :d="icon" />
    </svg>
    <slot />
  </span>
</template>
