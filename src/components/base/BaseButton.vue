<template>
  <button
    :type="props.type"
    :class="[
      'rounded-md font-medium',
      props.size === 'small' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base',
      props.variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
      props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
    :disabled="props.disabled"
  >
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  size: 'medium'
})
</script>
