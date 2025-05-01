<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-md font-medium transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 border hover:bg-gray-50',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base'
    ]"
    :aria-disabled="disabled"
    v-bind="$attrs"
  >
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>