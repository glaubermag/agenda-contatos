<template>
  <BaseModal :show="show" @close="$emit('close')">
    <template #title>
      Confirmar Exclusão
    </template>
    
    <template #content>
      <div class="space-y-4">
        <p class="text-gray-700">
          Tem certeza que deseja excluir o contato <strong>{{ contact.name }}</strong>?
        </p>
        <p class="text-gray-500 text-sm">
          Esta ação não pode ser desfeita.
        </p>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            ref="cancelButton"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="handleConfirm"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Excluir
          </button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Contact } from '../../types/contact'
import BaseModal from '../base/BaseModal.vue'

const props = defineProps<{
  show: boolean
  contact: Contact
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm', id: number): void
}>()

const cancelButton = ref<HTMLButtonElement | null>(null)

// Foca no botão cancelar quando o modal é aberto
watch(() => props.show, (newVal) => {
  if (newVal) {
    // Aguarda a renderização do DOM
    setTimeout(() => {
      if (cancelButton.value) {
        cancelButton.value.focus()
      }
    }, 50)
  }
})

const handleConfirm = () => {
  emit('confirm', props.contact.id)
}
</script>