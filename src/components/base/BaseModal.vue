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
      <div 
        v-if="show"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="handleClose"
      />
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
        class="fixed inset-0 z-10 overflow-y-auto"
        @keydown.esc="handleClose"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="modalTitleId"
      >
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div 
            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6"
            ref="modalContent"
            @click.stop
          >
            <!-- Cabeçalho do Modal -->
            <div class="modal-header border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 :id="modalTitleId" class="text-lg font-medium text-gray-900">
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

const modalContent = ref<HTMLElement | null>(null)
const modalTitleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`
const previousActiveElement = ref<HTMLElement | null>(null)

const handleClose = () => {
  emit('close')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Tab') {
    const focusableElements = modalContent.value?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    if (focusableElements && focusableElements.length > 0) {
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  } else if (e.key === 'Escape' && props.show) {
    handleClose()
  }
}

const focusFirstInput = () => {
  const firstInput = modalContent.value?.querySelector(
    'input, button, [tabindex]:not([tabindex="-1"])'
  )
  if (firstInput) {
    (firstInput as HTMLElement).focus()
  } else {
    // Fallback para o botão de fechar se nenhum outro elemento for encontrado
    const closeButton = modalContent.value?.querySelector('.close')
    if (closeButton) {
      (closeButton as HTMLElement).focus()
    }
  }
}

watch(() => props.show, (newValue) => {
  if (newValue) {
    previousActiveElement.value = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeydown)
    nextTick(() => {
      focusFirstInput()
    })
  } else {
    document.removeEventListener('keydown', handleKeydown)
    if (previousActiveElement.value) {
      previousActiveElement.value.focus()
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

<style scoped>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5) !important; /* Cor padrão para todos os modais */
}

/* Mantenha o mesmo z-index para consistência */
.modal-container {
  z-index: 9999;
}
</style>