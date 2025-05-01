<template>
  <div class="form-group">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-hidden="true">*</span>
      <span v-if="required" class="sr-only">campo obrigatório</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :required="required"
        :placeholder="placeholder"
        :aria-required="required"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="w-full px-4 py-2 border rounded-lg transition-colors duration-200"
        :class="{
          'border-red-500 focus:ring-red-500 focus:border-red-500': error,
          'border-gray-300 focus:ring-blue-500 focus:border-blue-500': !error,
          'pl-10': icon
        }"
      />
      <slot name="icon"></slot>
      
      <!-- Ícone de erro -->
      <div v-if="error" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg 
          class="h-5 w-5 text-red-500" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fill-rule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
            clip-rule="evenodd" 
          />
        </svg>
      </div>
    </div>
    
    <!-- Mensagem de erro com melhor visibilidade e acessibilidade -->
    <div 
      v-if="error" 
      :id="`${id}-error`"
      class="mt-2 flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-md"
      role="alert"
      aria-live="polite"
    >
      <svg 
        class="h-4 w-4 flex-shrink-0" 
        fill="currentColor" 
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path 
          fill-rule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
          clip-rule="evenodd" 
        />
      </svg>
      <span class="text-sm font-medium">{{ error }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  icon: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>