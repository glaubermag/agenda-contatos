<template>
  <div class="px-4 py-6 sm:px-0">
    <div class="flex justify-end mb-4">
      <button
        @click="showForm = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Novo Contato
      </button>
    </div>

    <ContactList />

    <BaseModal :show="showForm" @close="showForm = false">
      <template #title>Adicionar Novo Contato</template>
      <template #content>
        <ContactForm @submit="handleFormSubmit" />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactList from '../components/ContactList.vue'
import ContactForm from '../components/contacts/ContactForm.vue' // Atualizado o caminho
import BaseModal from '../components/base/BaseModal.vue'

const showForm = ref(false)

const handleFormSubmit = () => {
  showForm.value = false
}
</script>