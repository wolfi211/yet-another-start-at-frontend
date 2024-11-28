<script setup lang="ts">
import { navbarItems } from '@/navbarItems'
import NavbarItem from './NavbarItem.vue'
</script>

<template>
  <nav
    class="sticky min-h-12 w-[95%] mx-auto px-5 py-2 top-3 rounded-xl bg-neutral-50/10 backdrop-blur flex justify-between shadow-xl content-center items-center"
  >
    <div class="min-h-10 min-w-10 rounded-xl shadow-lg">
      <slot name="left" />
    </div>
    <div class="min-h-10 min-w-10 rounded-xl shadow-lg p-2 flex">
      <NavbarItem v-for="item in navbarItems" :label="item.label" :to="item.to" :key="item.label" />
    </div>
    <div class="min-h-10 min-w-10 rounded-xl shadow-lg">
      <slot name="right" />
    </div>
  </nav>
</template>
