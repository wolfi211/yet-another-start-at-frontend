<script setup lang="ts">
import type { NavbarItem } from '@/types/base/navbar/NavbarItem'

defineProps<NavbarItem>()
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'a'"
    :to="to"
    class="px-5 group text-zinc-800 transition duration-300 justify-center content-center flex flex-col"
  >
    <BaseIcon v-if="icon" :icon="icon" />
    <span v-if="label">{{ label }}</span>
    <span
      class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-zinc-800"
    ></span>
  </component>
</template>
