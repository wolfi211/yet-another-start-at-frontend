<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import BaseNavbar from '@/components/base/navbar/BaseNavbar.vue'
import { mdiAccountCircle, mdiMenu } from '@mdi/js'
</script>

<template>
  <div class="w-full h-full bg-white dark:bg-zinc-700 m-0">
    <BaseNavbar>
      <template #right>
        <BaseButton :icon="mdiAccountCircle" class="text-zinc-700" color="lightDark" />
        <BaseButton :icon="mdiMenu" class="text-zinc-700" />
      </template>
    </BaseNavbar>
    <slot />
  </div>
</template>
