<script setup lang="ts">
import { mdiChevronLeft, mdiChevronRight, mdiDotsHorizontal } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(
  defineProps<{
    skip: number
    limit: number
    total: number
  }>(),
  {
    skip: 0,
    limit: 10,
    total: 0,
  },
)

const emit = defineEmits<{
  change: [skip: number]
}>()

const skip = ref(props.skip)
const limit = ref(props.limit)
const total = ref(props.total)
const currentPage = computed(() => skip.value / limit.value + 1)
const lastPage = computed(() => Math.floor(total.value / limit.value) + 1)

const buttonClass = computed(() => ['border-none'])

watch(skip, () => {
  emit('change', skip.value)
})
</script>

<template>
  <div id="pagination" class="flex gap-1 border-2 rounded-3xl w-fit p-1">
    <BaseButton
      :disabled="skip == 0"
      :icon="mdiChevronLeft"
      @click="skip -= limit"
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <div class="h-11 border-r-2 border-zinc-300"></div>
    <!-- FIRST PAGE -->
    <BaseButton
      v-if="skip != 0"
      label="1"
      @click="skip = 0"
      small
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <!-- DOTS -->
    <BaseIcon v-if="currentPage > 3" :icon="mdiDotsHorizontal" />
    <!-- -3 -->
    <BaseButton
      v-if="currentPage > lastPage - 1"
      :label="(currentPage - 3).toString()"
      @click="skip = 0"
      small
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <!-- -2 -->
    <BaseButton
      v-if="currentPage > lastPage - 2"
      :label="(currentPage - 2).toString()"
      @click="skip = 0"
      small
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <!-- -1 -->
    <BaseButton
      v-if="currentPage > 2"
      :label="(currentPage - 1).toString()"
      @click="skip = 0"
      small
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <!-- CURRENT PAGE -->
    <div
      class="border rounded h-11 w-11 font-medium text-center flex items-center content-center justify-center"
      :class="buttonClass"
    >
      {{ currentPage }}
    </div>
    <!-- +1 -->
    <BaseButton
      v-if="currentPage < lastPage - 1"
      :label="(currentPage + 1).toString()"
      @click="skip = 0"
      small
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <!-- +2 -->
    <BaseButton
      v-if="currentPage < 3"
      :label="(currentPage + 2).toString()"
      @click="skip = 0"
      small
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <!-- +3 -->
    <BaseButton
      v-if="currentPage < 2"
      :label="(currentPage + 3).toString()"
      @click="skip = 0"
      small
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <!-- DOTS -->
    <BaseIcon v-if="currentPage < lastPage - 2" :icon="mdiDotsHorizontal" />
    <!-- LAST PAGE -->
    <BaseButton
      v-if="skip + limit <= total"
      :label="(Math.floor(total / limit) + 1).toString()"
      @click="skip = Math.floor(total / limit) * limit"
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
    <div class="h-11 border-r-2 border-zinc-300"></div>
    <BaseButton
      :disabled="skip + limit > total"
      :icon="mdiChevronRight"
      @click="skip += limit"
      class="w-11"
      :button-class="buttonClass.join(' ')"
    />
  </div>
</template>
