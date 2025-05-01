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
        <div 
          class="modal-backdrop fixed inset-0 bg-black bg-opacity-75" 
          @click="handleClose"
          aria-hidden="true"
        />
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
        @click.self="handleClose"
        @keydown.esc="handleClose"
        ref="modalRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="flex min-h-full items-center justify-center p-4">
          <div 
            class="modal-content relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
          >
            <!-- Cabeçalho do Modal -->
            <div class="modal-header border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 id="modal-title" class="text-lg font-medium text-gray-900">
                <slot name="title"></slot>
              </h3>
              <button
                @click="handleClose"
                class="close text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
                aria-label="Fechar modal"
              >
                <span class="sr-only">Fechar</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Conteúdo do Modal -->
            <div class="modal-body px-6 py-4 bg-white">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modalRef = ref<HTMLElement | null>(null)
let previousActiveElement: HTMLElement | null = null

const handleClose = () => {
  emit('close')
}

// Gerenciamento de foco
const getFocusableElements = () => {
  if (!modalRef.value) return []
  return Array.from(
    modalRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[]
}

const handleTab = (e: KeyboardEvent) => {
  if (!modalRef.value) return

  const focusable = getFocusableElements()
  if (focusable.length === 0) return

  const firstFocusable = focusable[0]
  const lastFocusable = focusable[focusable.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) {
      lastFocusable.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === lastFocusable) {
      firstFocusable.focus()
      e.preventDefault()
    }
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    handleTab(e)
  } else if (e.key === 'Escape') {
    handleClose()
  }
}

// Gerenciamento do ciclo de vida do modal
watch(() => props.show, async (newValue) => {
  if (newValue) {
    previousActiveElement = document.activeElement as HTMLElement
    await nextTick()
    const focusable = getFocusableElements()
    if (focusable.length > 0) {
      focusable[0].focus()
    }
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
    if (previousActiveElement) {
      previousActiveElement.focus()
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
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