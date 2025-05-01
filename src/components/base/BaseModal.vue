<template>
  <Teleport to="body">
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-10">
        <div class="modal-backdrop fixed inset-0 bg-black bg-opacity-75" @click="$emit('close')" />
      </div>
    </Transition>

    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 z-20 overflow-y-auto" 
        @click.self="$emit('close')"
        @keydown.esc="$emit('close')"
        ref="modalRef"
        tabindex="-1"
      >
        <div class="flex min-h-full items-center justify-center p-4">
          <div 
            class="modal-content relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
            role="dialog"
            aria-modal="true"
          >
            <!-- Cabeçalho do Modal -->
            <div class="modal-header border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <slot name="title"></slot>
              <button
                @click="$emit('close')"
                class="close text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Fechar modal"
              >
                <span class="sr-only">Fechar</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Conteúdo do Modal -->
            <div class="modal-body px-6 py-4">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'

const props = defineProps<{
  show: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

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
      modalRef.value?.focus()
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

// Add reduce motion check
const reduceMotion = computed(() => {
  return document.documentElement.classList.contains('reduce-motion')
})
</script>

<style scoped>
/* Estilos base do modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Remover apenas as transições quando reduce-motion está ativo */
:root.reduce-motion .modal-enter-active,
:root.reduce-motion .modal-leave-active {
  transition: none;
}

/* Remover a classe de opacidade 0 quando reduce-motion está ativo */
:root.reduce-motion .modal-enter-from,
:root.reduce-motion .modal-leave-to {
  opacity: 1;
}
</style>