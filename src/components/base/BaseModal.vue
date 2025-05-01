<template>
  <Transition name="modal">
    <div 
      v-if="show" 
      class="fixed inset-0 z-50 overflow-y-auto" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
      @keydown.esc="$emit('close')"
    >
      <div class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Overlay -->
        <div 
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true" 
          @click="$emit('close')"
        ></div>

        <!-- Modal -->
        <div 
          ref="modalRef"
          class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          role="document"
          tabindex="-1"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 
                  id="modal-title"
                  class="text-lg font-medium leading-6 text-gray-900"
                  tabindex="0"
                >
                  <slot name="title"></slot>
                </h3>
                <div class="mt-2">
                  <slot name="content"></slot>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              @click="$emit('close')"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              aria-label="Fechar modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const modalRef = ref<HTMLElement | null>(null)
let previousActiveElement: HTMLElement | null = null

// Função para encontrar elementos focáveis dentro do modal
const getFocusableElements = () => {
  if (!modalRef.value) return []
  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  )
}

// Função para gerenciar o trap focus
const handleTabKey = (e: KeyboardEvent) => {
  if (!modalRef.value || e.key !== 'Tab') return

  const focusableElements = getFocusableElements()
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  // Shift + Tab
  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) {
      e.preventDefault()
      lastFocusable?.focus()
    }
  } 
  // Tab
  else {
    if (document.activeElement === lastFocusable) {
      e.preventDefault()
      firstFocusable?.focus()
    }
  }
}

// Observa mudanças na prop show
watch(() => props.show, (newValue) => {
  if (newValue) {
    previousActiveElement = document.activeElement as HTMLElement
    nextTick(() => {
      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    })
  } else {
    if (previousActiveElement) {
      previousActiveElement.focus()
    }
  }
})

onMounted(() => {
  if (modalRef.value) {
    modalRef.value.addEventListener('keydown', handleTabKey)
  }
})

onUnmounted(() => {
  if (modalRef.value) {
    modalRef.value.removeEventListener('keydown', handleTabKey)
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>