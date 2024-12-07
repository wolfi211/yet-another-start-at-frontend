<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    disabled?: boolean
    icon?: string
    iconSize?: number
    label?: string
    roundedFull?: boolean
    buttonClass?: string
    small?: boolean
  }>(),
  {
    disabled: false,
    iconSize: 16,
  },
)

const labelClass = computed(() => (props.small && props.icon ? 'px-1' : 'px-2'))

const componentClass = computed(() => {
  const base: string[] = [
    'inline-flex',
    'cursor-pointer',
    'justify-center',
    'items-center',
    'whitespace-nowrap',
    'focus:outline-none',
    'transition-colors',
    'focus:ring',
    'duration-150',
    'border',
    props.roundedFull ? 'rounded-full' : 'rounded',
  ]

  if (props.buttonClass) {
    base.push(props.buttonClass)
  }

  if (!props.label && props.icon) {
    base.push('p-1')
  } else if (props.small) {
    base.push('text-sm', props.roundedFull ? 'px-3 py-1' : 'p-1')
  } else {
    base.push('py-2', props.roundedFull ? 'px-6' : 'px-3')
  }

  if (props.disabled) {
    base.push('cursor-not-allowed')
  }

  return base
})
</script>

<template>
  <button :disabled="disabled" :class="componentClass">
    <BaseIcon v-if="icon" :path="icon" :size="iconSize" />
    <span v-if="label" :class="labelClass">{{ label }}</span>
  </button>
</template>
