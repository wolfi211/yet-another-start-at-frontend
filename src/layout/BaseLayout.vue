<script setup lang="ts">
import BaseNavbar from '@/components/base/navbar/BaseNavbar.vue'
</script>

<template>
  <div class="w-full h-full bg-white dark:bg-zinc-700 m-0">
    <BaseNavbar />
    <slot />
  </div>
</template>
