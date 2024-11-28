<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from './layout/BaseLayout.vue'
</script>

<template>
  <BaseLayout>
    <RouterView class="mt-3" />
  </BaseLayout>
</template>
