<template>
  <div class="px-4 py-6 sm:px-0">
    <!-- Botão para adicionar novo contato -->
    <div class="flex justify-end mb-4">
      <button
        @click="showForm = true"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        aria-label="Adicionar novo contato"
      >
        Novo Contato
      </button>
    </div>

    <!-- Lista de contatos -->
    <ContactList />

    <!-- Modal para novo contato -->
    <BaseModal 
      :show="showForm" 
      @close="handleCloseModal"
    >
      <template #title>Adicionar Novo Contato</template>
      <template #content>
        <ContactForm 
          :show="showForm"
          @close="handleCloseModal"
          @save="handleFormSubmit" 
        />
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactList from '../components/ContactList.vue'
import ContactForm from '../components/contacts/ContactForm.vue'
import BaseModal from '../components/base/BaseModal.vue'
import { useContactsStore } from '../stores/contacts'
import type { Contact } from '../types/contact'

const store = useContactsStore()
const showForm = ref(false)

const handleCloseModal = () => {
  showForm.value = false
}

const handleFormSubmit = async (contact: Omit<Contact, 'id'>) => {
  try {
    await store.createContact(contact)
    showForm.value = false
  } catch (error) {
    console.error('Erro ao criar contato:', error)
  }
}
</script>