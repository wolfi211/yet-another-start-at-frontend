<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'

defineProps({
  icon: {
    type: String,
    default: null,
  },
  size: {
    type: Number,
    default: null,
  },
})
</script>

<template>
  <BaseIcon
    :icon="icon"
    :size="size"
    :icon-size="size"
    class="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"
  />
</template>
