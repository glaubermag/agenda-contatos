<template>
  <BaseModal :show="show" @close="$emit('close')">
    <template #title>
      Confirmar Exclusão
    </template>
    
    <template #content>
      <div class="space-y-4">
        <p class="text-gray-700">
          Tem certeza que deseja excluir o contato <span class="font-semibold">{{ contact.name }}</span>?
        </p>
        <p class="text-sm text-gray-500">
          Esta ação não pode ser desfeita.
        </p>
        
        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="button"
            @click="$emit('confirm')"
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
import type { Contact } from '../../types/contact'
import BaseModal from '../base/BaseModal.vue'

defineProps<{
  show: boolean
  contact: Contact
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script> 