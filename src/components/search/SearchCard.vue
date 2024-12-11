<script setup lang="ts">
import { mdiGenderFemale, mdiGenderMale } from '@mdi/js'
import type { User } from '@/types/User'
import BaseIcon from '../base/BaseIcon.vue'

defineProps<{
  user: User
}>()
</script>

<template>
  <div
    class="min-h-12 min-w-12 border border-zinc-400 rounded-lg p-2 flex flex-col items-center content-center"
  >
    <div class="flex justify-between w-full">
      <div>{{ `Age: ${user.age}` }}</div>
      <div>
        <BaseIcon
          :icon="user.gender === 'male' ? mdiGenderMale : mdiGenderFemale"
          class="text-zinc-700"
        />
      </div>
    </div>
    <img :src="user.image" />
    <div class="font-medium">
      {{ `${user.firstName} ${user.lastName}` }}
    </div>
    <div class="text-xs text-zinc-500">
      {{ `${user.phone}` }}
    </div>
  </div>
</template>
